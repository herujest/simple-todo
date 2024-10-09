import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  InteractionManager,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {navigateBack} from '.';
import Icon from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import SwipeableTask from '../Component/Organisms/Card/SwipeableTask';
import EmptyView from '../Component/Organisms/EmptyView';
import {useTheme} from '../Context/ThemeContext';
import {getActivityDetails, updateActivity} from '../Utils/api/activityApi';
import {deleteTask, updateTaskCompletion} from '../Utils/api/taskApi';
import {GoalDTO} from './ActivityGoal';
import Popups, {EditActivityPopup} from '../Component/Molecules/Popups';

type DetailActivityDTO = {
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_device: string;
  asset_icon_name: string;
  tasks: GoalDTO[];
};

const ActivityDetail = props => {
  const {route} = props;
  const {width, colors} = useTheme();
  const activityPopup = useRef<any>();

  const [detailActivity, setDetailActivity] = useState<DetailActivityDTO>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchActivity = async (activityId: number) => {
    try {
      const data = await getActivityDetails(activityId);
      setDetailActivity(data.data);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      fetchActivity(route.params?.id);
    });
  }, [route.params?.id]);

  const toggleRadio = item => {
    updateTaskCompletion(item.id, !item.is_completed)
      .then(response => {
        if (response.success) {
          fetchActivity(route.params?.id);
        }
      })
      .catch(error => {
        console.error('Failed to update task:', error.message);
      });
  };

  const _deleteTask = item => {
    deleteTask(item.id)
      .then(response => {
        if (response.success) {
          fetchActivity(route.params?.id);
        }
      })
      .catch(error => {
        console.error('Failed to update task:', error.message);
      });
  };

  function onRefresh() {
    setIsRefreshing(true);
    fetchActivity(route.params?.id);
  }

  function editActivity() {
    const initialValue = {
      title: detailActivity?.title,
      desc: detailActivity?.description,
      asset_icon_name: detailActivity?.asset_icon_name,
    };

    const modifyGoals = updatedActivity => {
      activityPopup.current._closeModal();
      setTimeout(() => {
        updateActivity(route?.params?.id, updatedActivity)
          .then(res => {
            onRefresh();
          })
          .catch(err => {
            console.log('error', err);
          });
      }, 350);
    };

    activityPopup.current._showModal({
      children: (
        <EditActivityPopup onSave={modifyGoals} initialValues={initialValue} />
      ),
    });
  }

  return (
    <Container style={{paddingHorizontal: width * 0.04}}>
      <FlatList
        data={detailActivity?.tasks}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <View style={[styles.header, styles.row]}>
              <Pressable
                onPress={() => navigateBack()}
                style={[
                  styles.btnClose,
                  {
                    padding: width * 0.02,
                    marginVertical: width * 0.03,
                    borderRadius: width * 0.03,
                    backgroundColor: colors.background5,
                  },
                ]}>
                <Icon name="close" size={width * 0.05} />
              </Pressable>
              <View style={styles.row}>
                <Pressable
                  onPress={editActivity}
                  style={[
                    styles.btnClose,
                    {
                      marginRight: width * 0.03,
                      padding: width * 0.02,
                      marginVertical: width * 0.03,
                      borderRadius: width * 0.03,
                      backgroundColor: colors.background5,
                    },
                  ]}>
                  <Icon name="edit" size={width * 0.05} />
                </Pressable>
                <Pressable
                  onPress={() => navigateBack()}
                  style={[
                    styles.btnClose,
                    {
                      padding: width * 0.02,
                      marginVertical: width * 0.03,
                      borderRadius: width * 0.03,
                      backgroundColor: colors.color8,
                    },
                  ]}>
                  <Icon name="trash-bin" size={width * 0.05} color={'white'} />
                </Pressable>
              </View>
            </View>
            <View style={styles.content}>
              <Text variant="headline1" style={styles.title}>
                {detailActivity?.title}
              </Text>
              {detailActivity?.description ? (
                <View
                  style={[
                    styles.description,
                    {
                      backgroundColor: colors.background5,
                      borderColor: colors.color1,
                    },
                  ]}>
                  <Text
                    variant="bodyText3"
                    style={{color: colors.basic3, marginTop: 8}}>
                    {detailActivity?.description}
                  </Text>
                </View>
              ) : null}
            </View>
          </>
        }
        renderItem={({item, index}: {item: GoalDTO; index: number}) => {
          return (
            <SwipeableTask
              item={item}
              index={index}
              toggleRadio={toggleRadio}
              onDelete={_deleteTask}
            />
          );
        }}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/yoga.png')}
            description={`You have no specific goals for this activity`}
          />
        }
      />
      <Popups ref={activityPopup} />
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 15,
  },
  btnClose: {
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {textAlign: 'center', marginBottom: 20},
  description: {
    borderRadius: 15,
    padding: 10,
  },
  content: {marginBottom: 20},
});

export default ActivityDetail;
