import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 150,
        }}
      >
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          source={require('../assets/images/Image_1.png')}
          style={[styles.inputWrapper, { marginTop: 170 }]}
        />
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <TouchableOpacity
            onPress={() => navigation.push('slidescreens')}
            style={styles.button}
          >
            <Text
              style={{
                color: '#FDF0D1',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: 24,
              }}
            >
              Let's Start
            </Text>
            <AntDesign name="right" size={24} color="#FDF0D1" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0D1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 390,
    backgroundColor: '#643848',
    padding: 20,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default WelcomeScreen;
