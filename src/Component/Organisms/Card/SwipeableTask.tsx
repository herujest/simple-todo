import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {GoalDTO} from '../../../Screens/ActivityGoal';
import Icon from '../../Atoms/Icon';
import TaskItem from './TaskItem';

interface ISwipeable {
  item: GoalDTO;
  index: number;
  toggleRadio: (item: GoalDTO) => void;
  onDelete: (item: GoalDTO) => void;
}

function RightAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  deleteAction: () => void,
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 51}],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity onPress={deleteAction} style={styles.deleteButton}>
        <Icon name="close" color="white" />
      </TouchableOpacity>
    </Reanimated.View>
  );
}

const SwipeableTask = ({item, index, toggleRadio, onDelete}: ISwipeable) => {
  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(prog, drag) =>
        RightAction(prog, drag, () => onDelete(item))
      }>
      <TaskItem
        key={`single-activity-task-item_${index}`}
        item={item}
        onToggleRadio={() => toggleRadio(item)}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 70,
  },
  rightAction: {width: 50, height: 50, backgroundColor: 'purple'},
});

export default memo(SwipeableTask);
