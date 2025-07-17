import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '65033654123-34u4en8t1h4mgitf0dq0o04vhdcgh6lf.apps.googleusercontent.com',
    androidClientId: '65033654123-gdkak2cv8dkrg5df6skv31v84pbntk3v.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(() => {
            alert('구글 로그인 성공!');
            navigation.replace('Map');
          })
          .catch((error) => {
            console.log('로그인 실패:', error);
            alert('로그인 실패: ' + error.message);
          });
      }
    }
  }, [response]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>GeoMemo</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="email@eamil.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>또는</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => promptAsync()}
      >
        <Text style={styles.socialText}>
          <Text style={{ fontWeight: 'bold' }}>Gmail</Text> 계정으로 계속하기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>
          <Text style={{ fontWeight: 'bold' }}>Naver</Text> 계정으로 계속하기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>
          <Text style={{ fontWeight: 'bold' }}>Kakao Talk</Text> 계정으로 계속하기
        </Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        계정이 없으신가요?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Signup')}
        >
          가입하기
        </Text>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: -90,
    marginBottom: 40,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  or: {
    marginHorizontal: 8,
    color: '#666',
  },
  socialButton: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  socialText: {
    color: '#333',
  },
  bottomText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  linkText: {
    color: '#3366ff',
    fontWeight: 'bold',
  },
});