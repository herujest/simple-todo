import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {navigateBack} from '.';
import Icon, {IconName} from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import {useTheme} from '../Context/ThemeContext';

type ActivityDTO = {
  id: number;
  title: string;
  description: string;
  iconName: IconName;
};
const ActivityTemplates: ActivityDTO[] = [
  {
    id: 1,
    title: 'Regular',
    description: 'Track my todo list on any regular activity',
    iconName: 'todo-done',
  },
  {
    id: 2,
    title: 'Working',
    description: 'Track my todo list while working',
    iconName: 'work-case',
  },
  {
    id: 3,
    title: 'Experiment',
    description: 'Track my todo list while experimenting',
    iconName: 'experiment',
  },
  {
    id: 4,
    title: 'Learning',
    description: 'Track my todo list while learning',
    iconName: 'education-learning',
  },
  {
    id: 5,
    title: 'Travel',
    description: 'Track my todo list while traveling',
    iconName: 'travel-luggage',
  },
  {
    id: 6,
    title: 'Cleaning',
    description: 'Track my todo list while cleaning',
    iconName: 'clean',
  },
  {
    id: 7,
    title: 'Exercise',
    description: 'Track my todo list while exercising',
    iconName: 'exercise-health-fitness',
  },
];

const AddActivity = () => {
  const {width, colors} = useTheme();
  const [activeType, setActiveType] = useState<ActivityDTO>(
    ActivityTemplates[0],
  );

  return (
    <Container style={{paddingHorizontal: width * 0.04}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigateBack()}
          style={[
            styles.btnClose,
            {
              padding: width * 0.02,
              marginVertical: width * 0.03,
              borderRadius: width * 0.03,
              backgroundColor: colors.background5,
            },
          ]}>
          <Icon name="close" size={width * 0.05} />
        </Pressable>
      </View>
      <Content>
        <Text variant="headline1" style={styles.title}>
          Add Activity
        </Text>
        <Text variant="headline3" style={{color: colors.basic4}}>
          Choose the type of activity
        </Text>
        <View style={[styles.wrapper, {borderBottomColor: colors.basic2}]}>
          {ActivityTemplates.map((item: ActivityDTO, index: number) => {
            const isActive = item.id === activeType.id;
            function _setActive() {
              setActiveType(item);
            }

            return (
              <Pressable
                key={`template-act_${index}`}
                style={[styles.center]}
                onPress={_setActive}>
                <View
                  style={[
                    styles.icon,
                    isActive ? styles.active : undefined,
                    {backgroundColor: colors.background5},
                  ]}>
                  <Icon
                    name={item.iconName}
                    color={colors.color2}
                    size={width * 0.06}
                  />
                </View>
                <Text
                  variant="bodyText3Bold"
                  style={{color: isActive ? colors.basic4 : colors.basic3}}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'flex-end',
  },
  btnClose: {
    alignSelf: 'baseline',
  },
  title: {textAlign: 'center', marginBottom: 20},
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginBottom: 10,
    width: '20%',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 5,
    padding: 15,
  },
  active: {
    borderWidth: 3,
    borderColor: '#A1A3F6',
  },
});

export default AddActivity;
