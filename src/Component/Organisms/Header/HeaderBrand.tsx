import React from 'react';
import {Image, View} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import HeaderWrapper from './HeaderWrapper';
import Text from '../../Atoms/Text';

const HeaderBrand = () => {
  const {width} = useTheme();
  return (
    <HeaderWrapper>
      <View style={{flexDirection: 'row'}}>
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

export default HeaderBrand;
