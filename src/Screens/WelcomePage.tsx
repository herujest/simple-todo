import {View} from 'react-native';
import React from 'react';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';

const WelcomePage = () => {
  return (
    <Container>
      <Content>
        <View>
          <Text variant="headline1">To-Do Mate</Text>
          <Text variant="bodyText1">
            Welcome to To-Do Mate, your personal task manager!
          </Text>
          <Text variant="bodyText2">
            Stay organized and boost your productivity with features like:
          </Text>
          <Text variant="bodyText1">
            ✔ Easy task creation{'\n'}✔ Deadline reminders{'\n'}✔ Priority
            settings{'\n'}✔ Dark mode for night owls
          </Text>
          <Text variant="buttonText1">Get Started</Text>
          <Text variant="bodyText3">
            Your tasks will be saved automatically!
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default WelcomePage;
