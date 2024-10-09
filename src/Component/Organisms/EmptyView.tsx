import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from '../../Context/ThemeContext';
import Text from '../Atoms/Text';

const EmptyView = ({description, imageSource}) => {
  const {width} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          padding: width * 0.04,
        },
      ]}>
      <Image
        source={imageSource}
        style={{
          width: width * 0.8,
          height: width * 0.8,
        }}
      />
      <Text style={{marginTop: width * 0.1, textAlign: 'center'}}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(EmptyView);
