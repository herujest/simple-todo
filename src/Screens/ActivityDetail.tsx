import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {navigateBack} from '.';
import Icon from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import SwipeableTask from '../Component/Organisms/Card/SwipeableTask';
import EmptyView from '../Component/Organisms/EmptyView';
import {useTheme} from '../Context/ThemeContext';
import {getActivityDetails} from '../Utils/api/activityApi';
import {deleteTask, updateTaskCompletion} from '../Utils/api/taskApi';
import {GoalDTO} from './ActivityGoal';

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

  const [detailActivity, setDetailActivity] = useState<DetailActivityDTO>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchActivity = async (activityId: number) => {
    try {
      const data = await getActivityDetails(activityId);
      console.log('data', data);

      setDetailActivity(data.data);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivity(route.params?.id);
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

  return (
    <Container style={{paddingHorizontal: width * 0.04}}>
      <View style={styles.header}>
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
      </View>
      <FlatList
        data={detailActivity?.tasks}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
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
    </Container>
  );
};

const styles = StyleSheet.create({
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
