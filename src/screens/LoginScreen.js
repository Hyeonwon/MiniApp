import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

      {/* 소셜 로그인 버튼 */}
      <TouchableOpacity style={styles.socialButton}>
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

      {/* 하단 가입하기 */}
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
