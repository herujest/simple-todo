import React, {memo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import {GoalDTO} from '../../../Screens/ActivityGoal';
import Icon from '../../Atoms/Icon';
import Text from '../../Atoms/Text';
import {navigate} from '../../../Screens';

export type ActivitiesDTO = {
  activities: {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    user_device: string;
    asset_icon_name: string;
  };
  tasks: GoalDTO[];
};

const ActivityItem = ({item}: {item: ActivitiesDTO}) => {
  const {colors, width} = useTheme();
  const {title, description, asset_icon_name} = item.activities;
  console.log('taskks', item.tasks);
  const completedCount = item.tasks.filter(
    task => task.is_completed === true,
  ).length;

  function openDetail() {
    navigate('ActivityDetail', {id: item.activities?.id});
  }

  return (
    <Pressable onPress={openDetail} style={styles.tiles}>
      <View style={{flex: 1}}>
        <Icon
          name={asset_icon_name ? asset_icon_name : 'todo-done'}
          size={width * 0.1}
          color={colors.color1}
        />
      </View>
      <View
        style={{
          flex: 8,
          paddingHorizontal: width * 0.05,
        }}>
        <Text variant="headline3">{title}</Text>
        <Text variant="bodyText3" numberOfLines={1}>
          {description || '--'}
        </Text>
      </View>
      <View>
        <Text>{`${completedCount}/${item.tasks.length}`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tiles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 4,
    shadowColor: '#171717',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginVertical: 8,
  },
});

export default memo(ActivityItem);
