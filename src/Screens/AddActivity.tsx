import React from 'react';
import Container from '../Component/Molecules/Container';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import Content from '../Component/Molecules/Content';
import Text from '../Component/Atoms/Text';

const AddActivity = () => {
  return (
    <Container>
      <HeaderTitle title="Add Activity" />
      <Content>
        <Text>New</Text>
      </Content>
    </Container>
  );
};

export default AddActivity;
