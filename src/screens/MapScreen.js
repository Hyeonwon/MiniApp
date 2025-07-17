import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  ScrollView,
  Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SLIDE_HEIGHT = 350;

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT - 120)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gesture) => {
        slideAnim.setValue(Math.max(120, Math.min(SCREEN_HEIGHT, gesture.moveY)));
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 50) {
          Animated.spring(slideAnim, {
            toValue: SCREEN_HEIGHT - 120,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(slideAnim, {
            toValue: SCREEN_HEIGHT - SLIDE_HEIGHT,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const goToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  const openGoogleMapsToDestination = () => {
    const latitude = 37.5665; // 목적지 예시
    const longitude = 126.9780;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="현재 위치" />
          </MapView>

          {/* 상단 UI */}
          <View style={styles.topBar}>
            <Text style={styles.moodText}>“이번 주 기분: 😊 57% ” + "자세히 보기"</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.circleButton}>
              <Text style={{ fontSize: 20 }}>☰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton}>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* 오늘의 장소 추천 */}
          <View style={styles.routeBox}>
            <TouchableOpacity onPress={openGoogleMapsToDestination} style={styles.routeButton}>
              <Text style={{ fontSize: 16 }}>📍 길안내</Text>
            </TouchableOpacity>
            <Text style={styles.routeText}>오늘의 장소 추천!!!</Text>
          </View>

          {/* 현재 위치로 이동 */}
          <TouchableOpacity style={styles.compassBtn} onPress={goToCurrentLocation}>
            <Text style={{ fontSize: 22 }}>🧭</Text>
          </TouchableOpacity>

          {/* 하단 슬라이드 */}
          <Animated.View style={[styles.slideUpPanel, { top: slideAnim }]} {...panResponder.panHandlers}>
            <View style={styles.handleBar} />
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>공유된 메모를 기반, 감정분석</Text>
              <TouchableOpacity style={styles.meButton}><Text style={{ fontWeight: 'bold' }}>Me</Text></TouchableOpacity>
            </View>
            {[1, 2, 3].map(i => (
              <View key={i} style={styles.memoCard}>
                <Text style={styles.memoLabel}>{i}</Text>
                <View style={styles.memoBox} />
              </View>
            ))}
          </Animated.View>
        </>
      ) : (
        <Text style={{ padding: 20 }}>위치 불러오는 중...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
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
  routeBox: {
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
  routeButton: {
    marginRight: 10,
  },
  routeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  compassBtn: {
    position: 'absolute',
    top: 140,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  slideUpPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SLIDE_HEIGHT + 120,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#aaa',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  meButton: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  memoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memoLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#111',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 12,
  },
  memoBox: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
