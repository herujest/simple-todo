import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {navigateBack} from '.';
import Button from '../Component/Atoms/Buttons';
import Icon from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import ActivityItem from '../Component/Organisms/Card/ActivityItem';
import EmptyView from '../Component/Organisms/EmptyView';
import {useTheme} from '../Context/ThemeContext';

type GoalDTO = {
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
};

const RenderItem = ({item, index}: {item: any; index: number}) => {
  return <ActivityItem key={`goal-item_${index}`} item={item} editMode />;
};

const ActivityGoal = props => {
  const {route} = props;
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
            <View style={[styles.addTaskBtn, {marginTop: width * 0.03}]}>
              <Text variant="headline3" style={{color: colors.basic4}}>
                Your goals
              </Text>
              <Pressable onPress={addGoal} style={styles.addTaskBtn}>
                <Icon name="plus-circle" color={colors.color1} />
                <Text style={{color: colors.color1, marginLeft: width * 0.03}}>
                  Add Goal
                </Text>
              </Pressable>
            </View>
          </View>
        }
        data={tempGoals}
        renderItem={RenderItem}
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
    </Container>
  );

  function onSave() {}

  function addGoal() {}
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
