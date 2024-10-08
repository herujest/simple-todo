import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {navigate} from '.';
import Button from '../Component/Atoms/Buttons';
import Icon from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Popups from '../Component/Molecules/Popups';
import ActivityItem from '../Component/Organisms/Card/ActivityItem';
import EmptyView from '../Component/Organisms/EmptyView';
import HeaderBrand from '../Component/Organisms/Header/HeaderBrand';
import {useTheme} from '../Context/ThemeContext';
import {getActivities} from '../Utils/api/activityApi';

const RenderItem = ({item, index}) => {
  return <ActivityItem key={`home-item_${index}`} item={item} />;
};

const HomeScreen = () => {
  const {colors, width} = useTheme();
  const [activities, setActivities] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const popupTask = useRef<any>();

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    console.log('activities', activities);
  }, [activities]);

  return (
    <Container>
      <HeaderBrand />
      <FlatList
        data={activities}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        style={{padding: width * 0.04}}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/success.png')}
            description={`Task is empty, let's create one`}
          />
        }
        ListHeaderComponent={
          <View style={styles.addTaskBtn}>
            <Text variant="headline2">To-do list</Text>
            <Pressable onPress={openPopupTask} style={styles.addTaskBtn}>
              <Icon name="plus-circle" color={colors.color1} />
              <Text style={{color: colors.color1, marginLeft: width * 0.03}}>
                Add Task
              </Text>
            </Pressable>
          </View>
        }
        renderItem={RenderItem}
      />
      <Popups ref={popupTask} />
    </Container>
  );

  function onRefresh() {
    setIsRefreshing(true);
    fetchActivities();
  }

  function openPopupTask() {
    popupTask.current._showModal({
      children: (
        <View>
          <Text variant="headline2">Choose task category</Text>
          <Button
            type="secondary"
            title="Activity"
            onPress={() => {
              popupTask.current?._closeModal();
              setTimeout(() => {
                navigate('AddActivity');
              }, 350);
            }}
          />
          <Button type="secondary" title="Single Task" />
        </View>
      ),
    });
  }
};

const styles = StyleSheet.create({
  addTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
