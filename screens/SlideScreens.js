import React from 'react';
import { View, StyleSheet } from 'react-native';
import Onboarding from '../components/Onboarding';

const SlideScreens = () => {
  return (
    <View style={styles.container}>
      <Onboarding />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SlideScreens;
