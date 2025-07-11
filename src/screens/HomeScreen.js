import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5665, // 서울시청
          longitude: 126.9780,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 37.5665, longitude: 126.9780 }} />
      </MapView>

      {/* 기분 문구 */}
      <View style={styles.moodBox}>
        <Text style={styles.moodText}>“이번 주 기분: 😊 57% ” + "자세히 보기"</Text>
      </View>

      {/* 버튼 그룹 */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.circleButton}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <Feather name="edit-3" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* 장소 추천 안내 */}
      <View style={styles.placeBox}>
        <Feather name="navigation" size={20} color="black" />
        <Text style={styles.placeText}> 오늘의 장소 추천!!!</Text>
      </View>

      {/* 하단 감정 분석 영역 */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomHeader}>
          <Text style={styles.analysisText}>공유된 메모를 기반, 감정분석</Text>
          <TouchableOpacity style={styles.meButton}>
            <Text style={styles.meText}>Me</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.memoItem}>
              <Text style={styles.memoText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  moodBox: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    elevation: 5,
  },
  moodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    position: 'absolute',
    top: 110,
    right: 15,
    gap: 10,
  },
  circleButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    elevation: 4,
    alignItems: 'center',
  },
  placeBox: {
    position: 'absolute',
    top: 180,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    elevation: 5,
  },
  placeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 30,
  },
  bottomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysisText: {
    fontSize: 14,
    color: '#555',
  },
  meButton: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  meText: {
    fontWeight: 'bold',
  },
  memoItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    elevation: 2,
  },
  memoText: {
    fontSize: 16,
  },
});
