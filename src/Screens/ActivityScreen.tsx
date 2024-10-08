import React from 'react';
import {FlatList, View} from 'react-native';
import Button from '../Component/Atoms/Buttons';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import ActivityItem from '../Component/Organisms/Card/ActivityItem';
import EmptyView from '../Component/Organisms/EmptyView';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import {useTheme} from '../Context/ThemeContext';

const RenderItem = ({item, index}: {item: any; index: number}) => {
  return <ActivityItem key={`home-item_${index}`} item={item} expanded />;
};

const ActivityScreen = () => {
  const {width, colors} = useTheme();
  return (
    <Container>
      <HeaderTitle title="Activities" />
      <FlatList
        data={[]}
        style={{padding: width * 0.04}}
        ListEmptyComponent={
          <EmptyView
            imageSource={require('../Assets/Images/calm.png')}
            description={`No recent activity here`}
          />
        }
        ListHeaderComponent={
          <View>
            <Button title="Start Activity Now!" type="primary" />
            <Text style={{color: colors.basic4}} variant="headline3">
              Today's summary
            </Text>
          </View>
        }
        renderItem={RenderItem}
      />
    </Container>
  );
};

export default ActivityScreen;
