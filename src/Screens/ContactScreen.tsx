import React from 'react';
import {Linking, Pressable, StyleSheet, View} from 'react-native';
import Text from '../Component/Atoms/Text';
import Container from '../Component/Molecules/Container';
import Content from '../Component/Molecules/Content';
import HeaderTitle from '../Component/Organisms/Header/HeaderTitle';
import {useTheme} from '../Context/ThemeContext';

const RenderLink = ({link}: {link: string}) => {
  const {colors} = useTheme();
  function openLink() {
    Linking.openURL(link);
  }
  return (
    <Pressable onPress={openLink}>
      <Text style={{color: colors.color1}}>{link}</Text>
    </Pressable>
  );
};

const ContactScreen = () => {
  const {width} = useTheme();

  return (
    <Container>
      <HeaderTitle title="Contact" />
      <Content>
        <View
          style={[styles.contactSection, {paddingHorizontal: width * 0.05}]}>
          <Text variant="headline2" style={styles.heading}>
            Get in Touch
          </Text>

          <Text style={styles.contactText}>
            If you have any questions, feedback, or inquiries about this
            project, feel free to reach out.
          </Text>

          <View style={styles.contactDetail}>
            <Text variant="headline3" style={styles.label}>
              Email:
            </Text>
            <Text style={styles.value}>heruu.js@protonmail.com</Text>
          </View>

          <View style={styles.contactDetail}>
            <Text variant="headline3" style={styles.label}>
              Phone:
            </Text>
            <Text style={styles.value}>+62 8953 2207 2106</Text>
          </View>

          <View style={styles.contactDetail}>
            <Text variant="headline3" style={styles.label}>
              Github:
            </Text>

            <RenderLink link="https://github.com/herujest" />
          </View>

          <View style={styles.contactDetail}>
            <Text variant="headline3" style={styles.label}>
              LinkedIn:
            </Text>
            <RenderLink link="https://www.linkedin.com/in/heru-js" />
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  contactSection: {
    marginTop: 20,
  },
  heading: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactDetail: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ContactScreen;
