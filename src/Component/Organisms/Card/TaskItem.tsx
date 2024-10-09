import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import {GoalDTO} from '../../../Screens/ActivityGoal';
import Icon from '../../Atoms/Icon';
import Text from '../../Atoms/Text';

const TaskItem = ({
  item,
  onToggleRadio,
}: {
  item: GoalDTO;
  onToggleRadio?: () => void;
}) => {
  const {colors, width} = useTheme();

  return (
    <View style={styles.tiles}>
      <View
        style={{
          paddingRight: width * 0.05,
        }}>
        <Text
          variant="headline3"
          style={
            item.is_completed ? {textDecorationLine: 'line-through'} : undefined
          }>
          {item?.title}
        </Text>
        <Text
          variant="bodyText3"
          numberOfLines={1}
          style={
            item.is_completed ? {textDecorationLine: 'line-through'} : undefined
          }>
          {item?.description || '--'}
        </Text>
      </View>
      <Pressable onPress={onToggleRadio}>
        <Icon
          name={item.is_completed ? 'radio-checked' : 'radio-unchecked'}
          color={colors.color1}
          size={width * 0.07}
        />
      </Pressable>
    </View>
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

export default TaskItem;
