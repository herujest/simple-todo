import {FlatList, Pressable, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Component/Molecules/Container';
import Text from '../Component/Atoms/Text';
import Content from '../Component/Molecules/Content';
import HeaderBrand from '../Component/Organisms/Header/HeaderBrand';
import {useTheme} from '../Context/ThemeContext';
import EmptyView from '../Component/Organisms/EmptyView';
import Icon from '../Component/Atoms/Icon';
import ActivityItem from '../Component/Organisms/Card/ActivityItem';
import {getActivities} from '../Utils/api/activityApi';

const RenderItem = ({item, index}) => {
  return <ActivityItem key={`home-item_${index}`} item={item} />;
};

const HomeScreen = () => {
  const {colors, width} = useTheme();
  const [activities, setActivities] = useState<any[]>([]);
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

  useEffect(() => {
    console.log('activities', activities);
  }, [activities]);

  return (
    <Container>
      <HeaderBrand />
      <FlatList
        data={activities}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        style={{padding: width * 0.04}}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/success.png')}
            description={`Task is empty, let's create one`}
          />
        }
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text variant="headline2">To-do list</Text>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon name="plus-circle" color={colors.color1} />
              <Text style={{color: colors.color1, marginLeft: width * 0.03}}>
                Add Task
              </Text>
            </Pressable>
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

export default HomeScreen;
