import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';
import {navigateBack} from '../../../Screens';
import Icon from '../../Atoms/Icon';
import Text from '../../Atoms/Text';
import HeaderWrapper from './HeaderWrapper';

const HeaderTitle = ({title, ...props}: {title: string}) => {
  const {width, colors} = useTheme();
  return (
    <HeaderWrapper>
      <Pressable style={styles.rowCenter} onPress={() => navigateBack()}>
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

const styles = StyleSheet.create({
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
});

export default HeaderTitle;
