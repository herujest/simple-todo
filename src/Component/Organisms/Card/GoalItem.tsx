import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import {GoalDTO} from '../../../Screens/ActivityGoal';
import Icon, {IconName} from '../../Atoms/Icon';
import Text from '../../Atoms/Text';

const GoalItem = ({
  item,
  editMode,
  defaultIco,
  onPressEdit,
}: {
  item: GoalDTO;
  editMode?: boolean;
  defaultIco?: IconName;
  onPressEdit?: () => void;
}) => {
  const {colors, width} = useTheme();

  return (
    <View style={styles.tiles}>
      <View style={{flex: 1}}>
        <Icon
          name={defaultIco ? defaultIco : 'todo-done'}
          size={width * 0.1}
          color={colors.color1}
        />
      </View>
      <View
        style={{
          flex: 8,
          paddingHorizontal: width * 0.05,
        }}>
        <Text variant="headline3">{item?.title}</Text>
        <Text variant="bodyText3" numberOfLines={1}>
          {item?.description || '--'}
        </Text>
      </View>
      {editMode ? (
        <Pressable onPress={onPressEdit}>
          <Icon name="edit" color={colors.color1} size={width * 0.07} />
        </Pressable>
      ) : null}
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

export default GoalItem;
