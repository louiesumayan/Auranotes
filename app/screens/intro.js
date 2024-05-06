import React, { useState } from 'react';
import colors from '../misc/colors';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundIconBtn from '../components2/RoundIconBtn';

const Intro = ({ onFinish }) => {
  const [name, setName] = useState('');
  const [userDummy, setUserDummy] = useState('');

  const handleChangeText = (text) => {
    setName(text);
    setUserDummy(text);
  };
  const handleSubmit = async () => {
    const userData = { name: name };
    await AsyncStorage.setItem('userDummy', JSON.stringify(userData));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.InputTitle}> Enter your name to continue</Text>
        <TextInput
          value={userDummy}
          onChangeText={handleChangeText}
          placeholder="Enter Name"
          style={styles.TextInput}
        />
        {userDummy.trim().length >= 1 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    color: colors.PRIMARY,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  InputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
});

export default Intro;
