import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { Platform, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ITime, UserInactivityResponse } from '../types';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('lastCloseDateMillis', value);
  } catch (e) {
    console.log('Error saving data in AsyncStorage', e);
  }
};

const formatTime = (time: ITime): string => {
  if (!time) {
    return '0h 0m 0s';
  }

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const getElapsedTime = async (): Promise<ITime> => {
  const lastTimeOpenMillis = await AsyncStorage.getItem('lastCloseDateMillis');
  if (!lastTimeOpenMillis) {
    return null;
  }
  const elapsedTime = Date.now() - parseInt(lastTimeOpenMillis);

  return elapsedTime;
};

const useInactivityListener = (): UserInactivityResponse => {
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [formattedTime, setFormattedTime] = useState<string | null>('');

  useEffect(() => {
    const stateChangeListener = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      stateChangeListener.remove();
    };
  });

  const prevAppState = useRef<AppStateStatus>();

  const isAppClosing = (newState: AppStateStatus) => {
    return Platform.OS === 'ios'
      ? newState === 'inactive' &&
          (prevAppState.current === 'active' ||
            prevAppState.current === undefined)
      : newState === 'background' &&
          (prevAppState.current === 'active' ||
            prevAppState.current === undefined);
  };

  const handleAppStateChange = useCallback(async (newState: AppStateStatus) => {
    const timeDifference = await getElapsedTime();
    const appClosing = isAppClosing(newState);

    const time = Date.now().toString();

    if (appClosing) {
      storeData(time);
    }

    prevAppState.current = newState;
    setElapsedTime(timeDifference);
    setFormattedTime(formatTime(timeDifference));
  }, []);

  return { elapsedTime, formattedTime };
};
export default useInactivityListener;
