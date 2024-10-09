import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Button from '../Component/Atoms/Buttons';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import {useTheme} from '../Context/ThemeContext';
import {fetchOrCreateUser} from '../Utils/api/userApi';
import {showToast} from '../Utils/helpers';

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
          <Text variant="headline1" style={styles.textCenter}>
            Welcome to To-Do Mate
          </Text>
          <Text variant="bodyText2" style={styles.textCenter}>
            Stay organized and boost your productivity with features like:
          </Text>
          <Text variant="bodyText1">
            ✔ Easy task creation{'\n'}✔ Deadline reminders{'\n'}✔ Priority
            settings{'\n'}✔ Dark mode for night owls
          </Text>
        </View>
      </Content>
      <Button type="primary" title="Get Started" onPress={getStarted} />
      <Text variant="bodyText3" style={styles.textCenter}>
        Your tasks will be saved automatically!
      </Text>
    </Container>
  );

  async function getStarted() {
    try {
      const user = await fetchOrCreateUser();
      if (user) {
        navigation.replace('Tabs');
      }
    } catch (err: any) {
      console.error('Error in getStarted:', err.message);
      showToast('error', 'error.message', 'Error in gettingstarted');
    }
  }
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default WelcomePage;
