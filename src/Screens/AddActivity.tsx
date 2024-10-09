import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {navigate, navigateBack} from '.';
import Icon, {IconName} from '../Component/Atoms/Icon';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import {useTheme} from '../Context/ThemeContext';
import StackedLabelInput from '../Component/Molecules/InputField';
import Button from '../Component/Atoms/Buttons';

export type ActivityDTO = {
  id: number;
  title: string;
  description: string;
  placeholder?: string;
  iconName: IconName;
};
export const ActivityTemplates: ActivityDTO[] = [
  {
    id: 1,
    title: 'Regular',
    description: 'Track my todo list on any regular activity',
    placeholder: 'any task for life',
    iconName: 'todo-done',
  },
  {
    id: 2,
    title: 'Working',
    description: 'Track my todo list while working',
    placeholder: 'e.g writing, coding, reporting, etc',
    iconName: 'work-case',
  },
  {
    id: 3,
    title: 'Experiment',
    description: 'Track my todo list while experimenting',
    placeholder: 'e.g researching, trial and error, observating, etc',
    iconName: 'experiment',
  },
  {
    id: 4,
    title: 'Learning',
    description: 'Track my todo list while learning',
    placeholder: 'e.g speaking, listening, writing, talking, etc',
    iconName: 'education-learning',
  },
  {
    id: 5,
    title: 'Travel',
    description: 'Track my todo list while traveling',
    placeholder: 'e.g budgeting, planning, writing, grooming, etc',
    iconName: 'travel-luggage',
  },
  {
    id: 6,
    title: 'Cleaning',
    description: 'Track my todo list while cleaning',
    placeholder: 'e.g moping, cleaning, washing, drying, etc',
    iconName: 'clean',
  },
  {
    id: 7,
    title: 'Exercise',
    description: 'Track my todo list while exercising',
    placeholder: 'e.g running, walking, dietting, fasting, workout, etc',
    iconName: 'exercise-health-fitness',
  },
];

const AddActivity = () => {
  const {width, colors} = useTheme();
  const [activeType, setActiveType] = useState<ActivityDTO>(
    ActivityTemplates[0],
  );
  const [activityName, setActivityName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <Container style={{paddingHorizontal: width * 0.04}}>
      <View style={styles.header}>
        <Text variant="headline3" style={{color: colors.color1}}>
          1 / 2
        </Text>
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
        <View style={[styles.inputs, {borderBottomColor: colors.basic2}]}>
          <StackedLabelInput
            label="Activity Name*"
            onChangeText={setActivityName}
            value={activityName}
            placeholder={'Type name of the activity'}
          />
          <StackedLabelInput
            label="Description"
            onChangeText={setDescription}
            value={description}
            placeholder={'Detail activity info'}
            multiline
            numberOfLines={4}
          />
        </View>
      </Content>
      <Button
        type="primary"
        title="Next"
        onPress={nextPage}
        disabled={!activityName}
      />
    </Container>
  );

  function nextPage() {
    navigate('ActivityGoal', {
      title: activityName,
      description: description,
      activeType,
    });
  }
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  btnClose: {
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  inputs: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});

export default AddActivity;
