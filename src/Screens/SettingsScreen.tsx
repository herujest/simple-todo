import React from 'react';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import {useTheme} from '../Context/ThemeContext';

const SettingsScreen = () => {
  const {width, colors} = useTheme();
  return (
    <Container>
      <HeaderTitle title="Settings" />
      <Content style={{padding: width * 0.05}}>
        <Text style={{color: colors.basic4}} variant="headline3">
          Settings
        </Text>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
