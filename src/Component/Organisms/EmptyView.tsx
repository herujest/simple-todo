import React, {memo} from 'react';
import {Image, View} from 'react-native';
import Text from '../Atoms/Text';
import {useTheme} from '../../Context/ThemeContext';

const EmptyView = ({description, imageSource}) => {
  const {width} = useTheme();
  return (
    <View
      style={{
        padding: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={imageSource}
        style={{
          width: width * 0.8,
          height: width * 0.8,
        }}
      />
      <Text style={{marginTop: width * 0.1}}>{description}</Text>
    </View>
  );
};

export default memo(EmptyView);
