import LottieView from 'lottie-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Button from '../Component/Atoms/Buttons';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import {useTheme} from '../Context/ThemeContext';
import {fetchOrCreateUser} from '../Utils/api/userApi';
import {showToast} from '../Utils/helpers';

const AnimatedText = ({text}: {text: string}) => {
  const {width} = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = 20;

    opacity.value = withTiming(1, {duration: 1000});
    translateY.value = withSpring(0, {damping: 10, stiffness: 80});
  }, [text]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
    marginTop: 20,
  }));

  return (
    <Animated.View style={[styles.rowItem, animatedStyle]}>
      <LottieView
        source={require('../Assets/Lotties/checked-blue.lottie')}
        resizeMode="cover"
        style={{
          width: width * 0.06,
          height: width * 0.06,
        }}
        autoPlay
        speed={0.33}
        onAnimationFinish={() => {
          opacity.value = 0;
          translateY.value = 20;
        }}
      />
      <Text variant="headline2" style={[styles.text]}>
        {text}
      </Text>
    </Animated.View>
  );
};

const WelcomePage = props => {
  const {width} = useTheme();
  const {navigation} = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const dataListItem = useMemo(() => {
    return [
      'Easy task creation',
      'Deadline reminders',
      'Priority settings',
      'Dark mode for night owls',
    ];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex < dataListItem.length - 1 ? prevIndex + 1 : 0,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container style={{padding: width * 0.03}}>
      <Content>
        <View style={styles.body}>
          <LottieView
            source={require('../Assets/Lotties/todo-start.lottie')}
            resizeMode="cover"
            style={{
              width: width * 0.9,
              height: width * 0.9,
            }}
            autoPlay
            loop
          />
          <Text variant="headline1" style={styles.textCenter}>
            Welcome to To-Do Mate
          </Text>
          <Text variant="bodyText2" style={styles.textCenter}>
            Stay organized and boost your productivity with features like:
          </Text>
          <View style={styles.container}>
            <AnimatedText text={dataListItem[currentIndex]} />
          </View>
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
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginLeft: 10,
    color: '#333',
  },
});

export default WelcomePage;
