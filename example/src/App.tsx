import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import useInactivityListener from 'react-native-inactive-time';
import CustomText from './CustomText';

export default function App() {
  const { elapsedTime, formattedTime } = useInactivityListener();

  return (
    <View style={styles.container}>
      <CustomText />
      <Text>Elapsed Time: {elapsedTime}</Text>
      <Text>Formatted Time: {formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
