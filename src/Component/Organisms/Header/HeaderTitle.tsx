import {Pressable, View} from 'react-native';
import React from 'react';
import HeaderWrapper from './HeaderWrapper';
import Icon from '../../Atoms/Icon';
import Text from '../../Atoms/Text';
import {useTheme} from '../../../Context/ThemeContext';
import {navigateBack} from '../../../Screens';

const HeaderTitle = ({title, ...props}: {title: string}) => {
  const {width, colors} = useTheme();
  return (
    <HeaderWrapper>
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigateBack()}>
        <Icon
          name="arrow-left2"
          style={{marginRight: width * 0.03}}
          color={colors.color1}
        />
        <Text variant="headline3" style={{color: colors.basic4}}>
          {title}
        </Text>
      </Pressable>
    </HeaderWrapper>
  );
};

export default HeaderTitle;
