import React from 'react';
import { View, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text>메인 화면</Text>
      <Button title="지도 보기" onPress={() => navigation.navigate('Map')} />
    </View>
  );
}
