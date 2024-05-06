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
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setError('Invalid / Incorrect credentials.');
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/images/Image_7.png')} />
        </View>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
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
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={styles.checkboxContainer}
        >
          <View style={styles.checkboxWrapper}>
            <View style={styles.checkbox}>
              {/* Your checkbox logic goes here */}
            </View>
            <Text style={styles.checkboxText}>Stay logged in?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.push('welcome')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100).duration(1000).springify()}
        >
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text
              style={{
                color: '#FDF0D1',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: 24,
              }}
            >
              Login
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
          <TouchableOpacity onPress={() => navigation.push('signupscreen')}>
            <Text>
              Don’t have an account yet?{' '}
              <Text style={{ color: 'red' }}>Register here</Text>
            </Text>
          </TouchableOpacity>
        </Text>
        <View style={styles.authText}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../assets/images/Gmail.png')} />
          <Image source={require('../assets/images/Facebook.png')} />
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
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
