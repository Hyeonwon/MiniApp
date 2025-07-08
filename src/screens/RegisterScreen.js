import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <Text>추가 정보 등록</Text>
      <TextInput placeholder="이름" value={name} onChangeText={setName} />
      <TextInput placeholder="나이" value={age} onChangeText={setAge} keyboardType="numeric" />
      <Button title="등록 완료 → 홈" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
