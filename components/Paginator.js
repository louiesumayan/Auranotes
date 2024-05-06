import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Paginator = ({ data, scrollX }) => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FDF0D1',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 64,
          paddingLeft: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>
      <View style={{ margin: 5 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('loginscreen')}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2F2E41',
    marginHorizontal: 8,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#643848',
    padding: 10,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Paginator;
