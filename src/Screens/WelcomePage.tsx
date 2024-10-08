import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import {useTheme} from '../Context/ThemeContext';
import Button from '../Component/Atoms/Buttons';
import {fetchOrCreateUser} from '../Utils/api/userApi';

const WelcomePage = props => {
  const {width} = useTheme();
  const {navigation} = props;

  return (
    <Container style={{padding: width * 0.03}}>
      <Content>
        <View style={styles.body}>
          <Image
            source={require('../Assets/Images/app-icon.png')}
            style={{
              width: width * 0.8,
              height: width * 0.8,
            }}
          />
          <Text variant="headline1" style={{textAlign: 'center'}}>
            Welcome to To-Do Mate
          </Text>
          <Text variant="bodyText2" style={{textAlign: 'center'}}>
            Stay organized and boost your productivity with features like:
          </Text>
          <Text variant="bodyText1">
            ✔ Easy task creation{'\n'}✔ Deadline reminders{'\n'}✔ Priority
            settings{'\n'}✔ Dark mode for night owls
          </Text>
        </View>
      </Content>
      <Button type="primary" title="Get Started" onPress={getStarted} />
      <Text variant="bodyText3" style={{textAlign: 'center'}}>
        Your tasks will be saved automatically!
      </Text>
    </Container>
  );

  async function getStarted() {
    try {
      const user = await fetchOrCreateUser();
      console.log('user', user);

      if (user) {
        navigation.replace('Tabs'); // Navigate to the Tabs screen
      }
    } catch (err) {
      console.error('Error in getStarted:', err.message);
      // Handle the error (e.g., show an alert or message to the user)
    }
  }
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomePage;
