import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <Text>회원가입</Text>
      <TextInput placeholder="이메일" value={email} onChangeText={setEmail} />
      <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="다음" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
