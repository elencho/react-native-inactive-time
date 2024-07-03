import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getElapsedTime, type ITime } from 'react-native-inactive-time';

const CustomText = () => {
  const [elapsedTime, setElapsedTime] = useState<ITime>(null);
  useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    const elapsedTime = await getElapsedTime();
    setElapsedTime(elapsedTime);
  };
  return (
    <View>
      <Text>Using UseEffect: {elapsedTime}</Text>
    </View>
  );
};

export default CustomText;
