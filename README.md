# react-native-inactive-time

👾 **This library is for you** - if you want to detect when the user closed the app last time and how long it took to open it again.👾

https://github.com/elencho/react-native-inactive-time/assets/53994979/8823d56c-9a6b-4e75-aa46-75a2c0b9003e


## Installation

```sh
npm install react-native-inactive-time
# or...
yarn add react-native-inactive-time
```

This library uses [AsyncStorage](https://github.com/react-native-async-storage/async-storage), so it will be good to install it too.

```sh
yarn add @react-native-async-storage/async-storage
# or...
npm install @react-native-async-storage/async-storage
```

## Usage

Make sure **useInactivityListener()** is accessible from the whole app, add it in App.js or maybe RootNavigator.

```js
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
```
**useInactivityListener** is a onetime listener, so that means after when you kill the app, `elapsedTime` and `formattedTime` extracted from `useInactivityListener()` may be `null`. For that, we have another method: **getElapsedTime()**

```js
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

```

### Methods

Prop | Description | Return Type
------ | ------ | ------ 
**`useInactivityListener()`** | **REQUIRED** Method which should be defined at the top component, can also extend elapsed time and formatted time | void | number | null | string
**`getElapsedTime()`** | method to use inside hooks | number | null
**`elapsedTime`** | time difference from last close to last open in milliseconds | number 
**`formattedTime`** | formatted time difference from last close to last open | string 


## Plans

Library is beta version right now. I want to add tests and get some user feedback to make it more user friendly, so I appreciate all your comments and feedback.

## Contact

[LinkediIn](https://www.linkedin.com/in/elene-botchoradze-252796193/): Elene Botchoradze


Email: e.bochoradze@gmail.com


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
