import React from 'react';
import Container from '../Component/Molecules/Container';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import Content from '../Component/Molecules/Content';
import Text from '../Component/Atoms/Text';

const AddSingleTask = () => {
  return (
    <Container>
      <HeaderTitle title="Add Single Task" />
      <Content>
        <Text>New Single Task</Text>
      </Content>
    </Container>
  );
};

export default AddSingleTask;
