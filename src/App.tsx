import { NavigationContainer } from '@react-navigation/native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { SafeAreaView, StyleSheet } from 'react-native'
import 'react-native-url-polyfill/auto'
import RootStack from './stacks/RootStack'
import { asyncStoragePersister, queryClient } from './utils/queryClient'

export default function App() {
  const { session, isLoading } = { session: null, isLoading: false }

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <RootStack />
        </SafeAreaView>
      </NavigationContainer>
    </PersistQueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
})
