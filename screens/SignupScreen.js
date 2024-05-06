import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async () => {
    return email && password
      ? (async () => {
          try {
            await createUserWithEmailAndPassword(
              auth,
              email,
              password,
              userName
            );
          } catch (error) {}
        })()
      : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Image_5.png')}
            style={{ marginBottom: 50, marginTop: 70 }}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={[styles.inputWrapper, { marginBottom: 20 }]}
        >
          <Text style={styles.txtPlaceholder}>Name</Text>
          <TextInput
            style={{
              padding: 5,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#ADADAD',
            }}
            placeholder="Enter Your Name"
            placeholderTextColor={'gray'}
            value={userName}
            onChangeText={(value) => setUserName(value)}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={[styles.inputWrapper, { marginBottom: 20 }]}
        >
          <Text style={styles.txtPlaceholder}>Email</Text>
          <TextInput
            style={{
              padding: 5,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#ADADAD',
            }}
            placeholder="Enter Your Email"
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={[styles.inputWrapper, { marginBottom: 20 }]}
        >
          <Text style={styles.txtPlaceholder}>Password</Text>
          <TextInput
            style={{
              padding: 5,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#ADADAD',
            }}
            placeholder="Enter Your Password"
            placeholderTextColor={'gray'}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={[styles.inputWrapper, { marginBottom: 20 }]}
        >
          <Text style={styles.txtPlaceholder}>Confirm Password</Text>
          <TextInput
            style={{
              padding: 5,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#ADADAD',
            }}
            placeholder="Enter Your Password"
            placeholderTextColor={'gray'}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100).duration(1000).springify()}
        >
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: 27,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Text
          style={{
            textAlign: 'center',
            margin: 20,
            fontSize: 12,
          }}
        >
          <TouchableOpacity onPress={() => navigation.push('loginscreen')}>
            <Text>
              Already a member? <Text style={{ color: 'blue' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDF0D1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
  },
  txtPlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputWrapper: {
    paddingBottom: 10,
  },
  button: {
    width: 390,
    backgroundColor: '#643848',
    padding: 10,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#EEEEEE',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    marginRight: 10,
    color: '#ADADAD',
  },
  forgotPassword: {
    fontSize: 16,
    color: '#707070',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ADADAD',
  },
  orText: {
    marginHorizontal: 10,
    color: '#ADADAD',
    fontSize: 16,
  },
  authText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default SignUp;
