import { NavigationContainer } from '@react-navigation/native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { SafeAreaView, StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import 'react-native-url-polyfill/auto'
import RootStack from './stacks/RootStack'
import { asyncStoragePersister, queryClient } from './utils/queryClient'

export default function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
            <RootStack />
            <Toast />
          </SafeAreaView>
        </GestureHandlerRootView>
      </NavigationContainer>
    </PersistQueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
