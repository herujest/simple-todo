import {View, Text} from 'react-native';
import React from 'react';

const ActivityItem = ({
  item,
  expanded,
  editMode,
}: {
  item: any;
  expanded?: boolean;
  editMode?: boolean;
}) => {
  console.log('item', item);

  return (
    <View>
      <Text>ActivityItem</Text>
    </View>
  );
};

export default ActivityItem;
