import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <View style={[styles.container, { width }]}>
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: 'contain' }]}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF0D1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    height: 450,
    marginTop: 45,
  },
  info: {
    flex: 0.3,
    marginTop: 150,
  },
  title: {
    fontWeight: '900',
    fontSize: 28,
    color: '#252525',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    paddingHorizontal: 64,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default OnboardingItem;
