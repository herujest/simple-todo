import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {navigate} from '.';
import Button from '../Component/Atoms/Buttons';
import Icon from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Popups, {InputGoalPopup} from '../Component/Molecules/Popups';
import SwipeableTask from '../Component/Organisms/Card/SwipeableTask';
import EmptyView from '../Component/Organisms/EmptyView';
import HeaderBrand from '../Component/Organisms/Header/HeaderBrand';
import {useTheme} from '../Context/ThemeContext';
import {
  createTask,
  deleteTask,
  getStandaloneTasksByDeviceId,
  updateTaskCompletion,
} from '../Utils/api/taskApi';

const HomeScreen = () => {
  const {colors, width} = useTheme();
  const [listTasks, setListTasks] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const popupTask = useRef<any>();

  const fetchSingleTask = async () => {
    try {
      const data = await getStandaloneTasksByDeviceId();
      setListTasks(data);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSingleTask();
  }, []);

  const toggleRadio = item => {
    updateTaskCompletion(item.id, !item.is_completed)
      .then(response => {
        if (response.success) {
          fetchSingleTask();
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
          fetchSingleTask();
        }
      })
      .catch(error => {
        console.error('Failed to update task:', error.message);
      });
  };

  return (
    <Container>
      <HeaderBrand />
      <FlatList
        data={listTasks}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        style={{padding: width * 0.04}}
        contentContainerStyle={{paddingBottom: width * 0.05}}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/success.png')}
            description={`Task is empty, let's create one`}
          />
        }
        ListHeaderComponent={
          <View style={[styles.addTaskBtn, {marginBottom: width * 0.05}]}>
            <Text variant="headline2">To-do list</Text>
            <Pressable onPress={openPopupTask} style={styles.addTaskBtn}>
              <Icon name="plus-circle" color={colors.color1} />
              <Text style={{color: colors.color1, marginLeft: width * 0.03}}>
                Add Task
              </Text>
            </Pressable>
          </View>
        }
        renderItem={({item, index}) => (
          <SwipeableTask
            item={item}
            index={index}
            toggleRadio={toggleRadio}
            onDelete={_deleteTask}
          />
        )}
      />
      <Popups ref={popupTask} />
    </Container>
  );

  function onRefresh() {
    setIsRefreshing(true);
    fetchSingleTask();
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
              }, 450);
            }}
          />
          <Button type="secondary" title="Single Task" onPress={addNewGoal} />
        </View>
      ),
    });
  }

  async function onSubmit(payload) {
    try {
      const response = await createTask(payload);

      if (response.success) {
        onRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addNewGoal() {
    const submitNewTask = item => {
      popupTask.current._closeModal();
      setTimeout(() => {
        console.log('iatem', item);
        onSubmit(item);
      }, 500);
    };
    popupTask.current._showModal({
      children: <InputGoalPopup onSave={submitNewTask} />,
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
