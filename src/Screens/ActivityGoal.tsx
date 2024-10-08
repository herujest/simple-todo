import React, {useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {navigateAndReset, navigateBack} from '.';
import Button from '../Component/Atoms/Buttons';
import Icon, {IconName} from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Popups, {InputGoalPopup} from '../Component/Molecules/Popups';
import GoalItem from '../Component/Organisms/Card/GoalItem';
import EmptyView from '../Component/Organisms/EmptyView';
import {useTheme} from '../Context/ThemeContext';
import {uuidv4} from '../Utils/helpers';
import {createActivityWithTasks} from '../Utils/api/activityApi';

export type GoalDTO = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
};

const RenderItem = ({
  item,
  index,
  defaultIco,
  onPressEdit,
}: {
  item: GoalDTO;
  index: number;
  defaultIco: IconName;
  onPressEdit?: () => void;
}) => {
  return (
    <GoalItem
      key={`goal-item_${index}`}
      item={item}
      editMode
      defaultIco={defaultIco}
      onPressEdit={onPressEdit}
    />
  );
};

const ActivityGoal = props => {
  const {route} = props;
  const addGoalPopup = useRef<any>();
  const {width, colors} = useTheme();
  const [tempGoals, setTempGoals] = useState<GoalDTO[]>([]);

  return (
    <Container style={{paddingHorizontal: width * 0.04}}>
      <View style={styles.header}>
        <Text variant="headline3" style={{color: colors.color1}}>
          2 / 2
        </Text>
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
        ListHeaderComponent={
          <View>
            <Text variant="headline1" style={styles.title}>
              Add Goal
            </Text>
            <View
              style={[
                styles.info,
                {
                  backgroundColor: colors.background5,
                  borderColor: colors.color1,
                },
              ]}>
              <Text variant="bodyText3Bold">{route.params.title}</Text>
              {route.params.description ? (
                <Text
                  variant="bodyText3"
                  style={{color: colors.basic3, marginTop: 8}}>
                  {route.params.description}
                </Text>
              ) : null}
            </View>
            <View style={[styles.addTaskBtn, {marginVertical: width * 0.03}]}>
              <Text variant="headline3" style={{color: colors.basic4}}>
                Your goals
              </Text>
              <Pressable onPress={addNewGoal} style={styles.addTaskBtn}>
                <Icon name="plus-circle" color={colors.color1} />
                <Text style={{color: colors.color1, marginLeft: width * 0.03}}>
                  Add Goal
                </Text>
              </Pressable>
            </View>
          </View>
        }
        data={tempGoals}
        renderItem={({item, index}: {item: GoalDTO; index: number}) => {
          return (
            <RenderItem
              item={item}
              index={index}
              defaultIco={route?.params?.activeType?.iconName}
              onPressEdit={() =>
                editGoal(
                  {
                    title: item.title,
                    desc: item.description,
                    dueDate: item.due_date,
                    isComplete: item.is_completed,
                  },
                  item.id,
                )
              }
            />
          );
        }}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/yoga.png')}
            description={`Add any goals ${route.params.activeType?.placeholder}`}
          />
        }
      />
      <Button
        type="primary"
        title="Save"
        onPress={onSave}
        disabled={!tempGoals.length}
      />
      <Popups ref={addGoalPopup} />
    </Container>
  );

  async function onSave() {
    try {
      const response = await createActivityWithTasks({
        activity: {
          title: route.params.title,
          description: route.params.description || '',
        },
        tasks: tempGoals.map(i => ({
          title: i.title,
          description: i.description,
          due_date: i.due_date,
          is_completed: i.is_completed,
        })),
      });

      console.log('response', response);
      if (response.success) {
        navigateAndReset([{name: 'Tabs'}]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function addNewGoal() {
    const modifyGoals = item => {
      addGoalPopup.current._closeModal();
      setTimeout(() => {
        setTempGoals(prev => [...prev, {...item, id: uuidv4()}]);
      }, 350);
    };
    addGoalPopup.current._showModal({
      children: <InputGoalPopup onSave={modifyGoals} />,
    });
  }

  function editGoal(initialValue: any, goalId: string) {
    const modifyGoals = updatedGoal => {
      addGoalPopup.current._closeModal();
      setTimeout(() => {
        setTempGoals(prevGoals =>
          prevGoals.map(goal =>
            goal.id === goalId ? {...goal, ...updatedGoal} : goal,
          ),
        );
      }, 350);
    };

    const deleteGoal = () => {
      addGoalPopup.current._closeModal();
      setTimeout(() => {
        setTempGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
      }, 350);
    };

    addGoalPopup.current._showModal({
      children: (
        <InputGoalPopup
          onSave={modifyGoals}
          initialValues={initialValue}
          onDelete={deleteGoal}
        />
      ),
    });
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignSelf: 'flex-end',
  },
  btnClose: {
    alignSelf: 'baseline',
  },
  title: {textAlign: 'center', marginBottom: 20},
  info: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
  },
  addTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ActivityGoal;
