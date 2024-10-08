import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {navigate} from '.';
import Button from '../Component/Atoms/Buttons';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import ActivityItem, {
  ActivitiesDTO,
} from '../Component/Organisms/Card/ActivityItem';
import EmptyView from '../Component/Organisms/EmptyView';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import {useTheme} from '../Context/ThemeContext';
import {getActivities} from '../Utils/api/activityApi';

const RenderItem = ({item, index}: {item: any; index: number}) => {
  return <ActivityItem key={`home-item_${index}`} item={item} expanded />;
};

const ActivityScreen = () => {
  const {width, colors} = useTheme();
  const [activities, setActivities] = useState<ActivitiesDTO[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Container>
      <HeaderTitle title="Activities" />
      <FlatList
        data={activities}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        style={{padding: width * 0.04}}
        ListEmptyComponent={
          <>
            <EmptyView
              imageSource={require('../Assets/Images/calm.png')}
              description={`No recent activity here`}
            />
          </>
        }
        ListHeaderComponent={
          <View>
            <Button
              title="Start New Activity Now!"
              type="primary"
              onPress={() => navigate('AddActivity')}
            />
            <Text style={{color: colors.basic4}} variant="headline3">
              Today's summary
            </Text>
          </View>
        }
        renderItem={RenderItem}
      />
    </Container>
  );

  function onRefresh() {
    setIsRefreshing(true);
    fetchActivities();
  }
};

export default ActivityScreen;
