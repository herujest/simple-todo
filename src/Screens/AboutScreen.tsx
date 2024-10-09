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

const AboutScreen = () => {
  const {width} = useTheme();

  return (
    <Container>
      <HeaderTitle title="About" />
      <Content
        contentContainerStyle={[styles.container, {padding: width * 0.04}]}>
        <Text variant="headline1" style={styles.title}>
          About This Project
        </Text>

        <View style={styles.section}>
          <Text variant="headline2" style={styles.subheading}>
            Project Purpose
          </Text>
          <Text style={styles.text}>
            This project was created solely for assessment purposes and is not
            intended for public use or commercial distribution. It serves as a
            demonstration of my technical skills and does not represent a
            finished or production-ready product.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="headline2" style={styles.subheading}>
            Terms and Conditions
          </Text>
          <Text style={styles.text}>
            1. The content provided in this project is for demonstration
            purposes only.{'\n'}
            2. No user data or personal information is collected or stored.
            {'\n'}
            3. The project may include third-party tools and services, which are
            subject to their respective licenses.{'\n'}
            4. Any use or reproduction of the content, design, or code outside
            of the assessment context is prohibited.{'\n'}
            5. This project does not offer any warranties or guarantees of
            functionality or accuracy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="headline2" style={styles.subheading}>
            Design System / UI
          </Text>
          <Text style={styles.text}>
            The design system and UI inspiration for this project were created
            by:
          </Text>
          <Text style={styles.text}>- Tooploox Team</Text>
          <Text style={styles.text}>- Weronika Kołodziej-Teszbir</Text>
          <Text style={styles.text}>
            OneLook - Wellness App:{'\n'}
            <RenderLink
              link={
                'https://www.figma.com/community/file/1192403827893885122/onelook-wellness-app'
              }
            />
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="headline2" style={styles.subheading}>
            Icons and Vectors
          </Text>
          <Text style={styles.text}>
            The icons and vectors used in this project are sourced from:
          </Text>
          <Text style={styles.text}>
            - IcoMoon Free:{' '}
            <RenderLink link={'https://icomoon.io/app/#/select/library'} />
          </Text>
          <Text style={styles.text}>
            - LineIcons:{' '}
            <RenderLink link={'http://designmodo.com/linecons-free/'} />
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="headline2" style={styles.subheading}>
            Database and Backend Services
          </Text>
          <Text style={styles.text}>
            The database and backend services are powered by Supabase:{'\n'}
            <RenderLink link={'https://supabase.com'} />
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.text}>© 2024 - Project by heruu.js</Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  subheading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default AboutScreen;
