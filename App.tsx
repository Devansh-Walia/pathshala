import React from 'react';
import {SafeAreaView, Text, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
