import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const VerificationScreen = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <LinearGradient
      colors={['#FDF0D1', '#3C1322']}
      style={styles.backgoundGradient}
    >
      <Animated.Image
        entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
        source={require('../assets/images/Image_6.png')}
        style={{
          marginBottom: 150,
          marginTop: 150,
        }}
      />
      <Animated.View
        entering={FadeInDown.delay(100).duration(1000).springify()}
      >
        <Text
          style={{
            color: '#FDF0D1',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: 30,
            marginBottom: 15,
          }}
        >
          Let's Get Started!
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.button, { width: 350 }]}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 900,
              textAlign: 'center',
              fontSize: 24,
            }}
          >
            LOGOUT
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgoundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 390,
    backgroundColor: '#E0D3B4',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default VerificationScreen;
