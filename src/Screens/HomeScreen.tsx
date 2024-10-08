import {View} from 'react-native';
import React from 'react';
import Container from '../Component/Molecules/Container';
import Text from '../Component/Atoms/Text';
import Content from '../Component/Molecules/Content';
import HeaderBrand from '../Component/Organisms/Header/HeaderBrand';

const HomeScreen = () => {
  return (
    <Container>
      <HeaderBrand />
      <Content>
        <View>
          <Text>asd</Text>
        </View>
      </Content>
    </Container>
  );
};

export default HomeScreen;
