import type { LatLng } from 'react-native-maps';
import { create } from 'zustand';

import { getPins, writePins } from '@/lib/storage/modules/map-pins/utils';
import { createSelectors } from '@/lib/utils';
import { type Pin } from '@/types/pin';

interface MapPinsState {
  currentCoord: LatLng;
  pins: Pin[];
  setCurrentCoord: (coord: LatLng) => void;
  readPins: () => void;
  addPins: (pin: Pin) => void;
  deletePins: (id: string) => void;
  updatePins: (pin: Pin) => void;
}

const _useMapPins = create<MapPinsState>((set, get) => ({
  currentCoord: {
    latitude: 40.73,
    longitude: -73.94,
  },
  pins: [],
  setCurrentCoord: (coord: LatLng) =>
    set(() => ({
      currentCoord: coord,
    })),
  readPins: () => {
    set((state) => ({
      pins: getPins() ?? state.pins,
    }));
  },

  addPins: (pin: Pin) => {
    set((state) => ({
      pins: [...state.pins, pin],
    }));
    writePins(get().pins);
  },

  deletePins: (id: string) => {
    set((state) => ({
      pins: state.pins.filter((movie) => movie.id !== id),
    }));
    writePins(get().pins);
  },

  updatePins: (movie: Pin) => {
    set((state) => ({
      pins: state.pins.map((m) => (m.id === movie.id ? movie : m)),
    }));
    writePins(get().pins);
  },
}));

export const useMapPins = createSelectors(_useMapPins);

export const setCurrentCoord = _useMapPins.getState().setCurrentCoord;
export const updatePin = _useMapPins.getState().updatePins;
export const addPin = _useMapPins.getState().addPins;
export const deletePin = _useMapPins.getState().deletePins;
