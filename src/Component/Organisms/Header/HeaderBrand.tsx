import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import Text from '../../Atoms/Text';
import HeaderWrapper from './HeaderWrapper';

const HeaderBrand = () => {
  const {width} = useTheme();
  return (
    <HeaderWrapper>
      <View style={styles.row}>
        <Image
          source={require('../../../Assets/Images/app-icon.png')}
          style={{
            width: width * 0.14,
            height: width * 0.14,
          }}
        />
      </View>
      <Text variant="headline1">Hi There!</Text>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
});

export default HeaderBrand;
