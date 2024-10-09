import React from 'react';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import {useTheme} from '../Context/ThemeContext';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import Icon, {IconName} from '../Component/Atoms/Icon';
import {navigate, RootStackParamList} from '.';

type SettingMenuDTO = {
  id: string;
  name: string;
  route: keyof RootStackParamList | null;
  link: string;
  icon: IconName;
};
const menu: SettingMenuDTO[] = [
  {
    id: 'menu1',
    name: 'Info',
    route: 'AboutScreen',
    link: '',
    icon: 'info-square',
  },
  {
    id: 'menu2',
    name: 'Contact',
    route: 'ContactScreen',
    link: '',
    icon: 'handphone',
  },
  {id: 'menu3', name: 'Other', route: null, link: '', icon: 'info-square'},
];

const RenderItem = ({item, index}: {item: SettingMenuDTO; index: number}) => {
  const {width, colors} = useTheme();
  function onPress() {
    if (item.route) {
      navigate(item.route);
    } else {
      Linking.openURL(item.link);
    }
  }
  return (
    <Pressable
      onPress={onPress}
      key={`settings_menu-${index}`}
      style={[
        styles.item,
        styles.row,
        {
          paddingVertical: width * 0.03,
          paddingHorizontal: width * 0.05,
          borderBottomColor: colors.basic2,
          marginBottom: width * 0.03,
        },
      ]}>
      <View style={{flex: 1}}>
        <Icon name={item.icon} size={20} color={colors.basic6} />
      </View>
      <View style={{flex: 8}}>
        <Text variant="headline3" style={{color: colors.basic4}}>
          {item.name}
        </Text>
      </View>
      {item.link ? (
        <View style={{flex: 1}}>
          <Icon name="redirect" />
        </View>
      ) : null}
    </Pressable>
  );
};

const SettingsScreen = () => {
  const {width, colors} = useTheme();
  return (
    <Container>
      <HeaderTitle title="Settings" />
      <Content style={{padding: width * 0.05}}>
        <View style={styles.center}>
          <Image
            source={require('../Assets/Images/app-icon.png')}
            style={{
              width: width * 0.8,
              height: width * 0.8,
            }}
          />
        </View>

        {menu.map((i, idx) => {
          return <RenderItem key={`menu${idx}_${i.id}`} item={i} index={idx} />;
        })}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  item: {
    borderBottomWidth: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
