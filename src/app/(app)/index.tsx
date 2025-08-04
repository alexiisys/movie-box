import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { type LatLng, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PlaceModal from '@/components/modals/place-modal';
import {
  colors,
  FocusAwareStatusBar,
  GridList,
  Input,
  Plus,
  Search,
  Settings,
  useModal,
} from '@/components/ui';
import { setCurrentCoord, useMapPins } from '@/lib/storage/modules/map-pins';
import { type Pin } from '@/types/pin';

const DEFAULT_LATITUDE_DELTA = 0.0922 / 50;
const DEFAULT_LONGITUDE_DELTA = 0.0421 / 50;

// eslint-disable-next-line max-lines-per-function
export default function Contacts() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const router = useRouter();
  const refMap = useRef<MapView | null>();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const pins = useMapPins.use.pins();
  const filteredPins = useMemo(
    () => pins.filter((pin) => pin.name.includes(searchValue.toLowerCase())),
    [pins, searchValue]
  );
  useEffect(() => {
    refMap.current?.animateToRegion(
      {
        latitudeDelta: DEFAULT_LATITUDE_DELTA * 50,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA * 50,
        latitude: location?.coords?.latitude ?? 40.73,
        longitude: location?.coords?.longitude ?? -73.94,
      },
      500
    );
    console.log({
      latitudeDelta: DEFAULT_LATITUDE_DELTA * 50,
      longitudeDelta: DEFAULT_LONGITUDE_DELTA * 50,
      latitude: location?.coords?.latitude ?? 40.73,
      longitude: location?.coords?.longitude ?? -73.94,
    });
  }, [location]);
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  const [selectedLocation, setSelectedLocation] = React.useState<LatLng | null>(
    null
  );
  const [selectPin, setSelectPin] = React.useState<Pin | null>(null);
  const onNewPlace = () => {
    setCurrentCoord(selectedLocation as LatLng);
    router.navigate('/new-place/new');
  };
  const refModal = useModal();
  return (
    <>
      <PlaceModal
        pin={selectPin!}
        close={() => refModal.dismiss()}
        ref={refModal.ref}
      />
      <FocusAwareStatusBar />
      <View className="relative flex-1 bg-lightBlue">
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          ref={(ref) => (refMap.current = ref)}
          onPress={(event) =>
            setSelectedLocation({
              longitude: event.nativeEvent.coordinate.longitude,
              latitude: event.nativeEvent.coordinate.latitude,
            })
          }
          initialRegion={{
            latitudeDelta: DEFAULT_LATITUDE_DELTA * 50,
            longitudeDelta: DEFAULT_LONGITUDE_DELTA * 50,
            latitude: location?.coords?.latitude ?? 40.73,
            longitude: location?.coords?.longitude ?? -73.94,
          }}
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              icon={require('../../../assets/pin.png')}
            />
          )}
          {filteredPins.map((pin) =>
            pin.activate ? (
              <Marker
                coordinate={pin.coord}
                key={pin.id}
                icon={require('../../../assets/pin_check.png')}
                onPress={() => {
                  setSelectPin(pin);
                  refModal.present();
                }}
              />
            ) : (
              <Marker
                coordinate={pin.coord}
                key={pin.id}
                onPress={() => {
                  setSelectPin(pin);
                  refModal.present();
                }}
                icon={require('../../../assets/pin_.png')}
              />
            )
          )}
        </MapView>
        <View
          className="absolute left-0 flex-row items-center gap-3 px-4"
          style={{ top: insets.top + 12 }}
        >
          <Input
            className="flex-1"
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder={'Search'}
            leftIcon={<Search color={colors.grey} />}
            search
          />
          <TouchableOpacity
            onPress={() => router.navigate('/favorites')}
            className="items-center justify-center rounded-full bg-white p-3"
          >
            <GridList width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate('/(app)/settings')}
            className="items-center justify-center rounded-full bg-white p-3"
          >
            <Settings width={24} height={24} />
          </TouchableOpacity>
        </View>
        {selectedLocation && (
          <TouchableOpacity
            onPress={onNewPlace}
            className="absolute bottom-16 right-8 items-center justify-center rounded-full bg-blue p-5"
          >
            <Plus width={32} height={32} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
