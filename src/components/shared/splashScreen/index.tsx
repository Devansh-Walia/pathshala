import { View, Image, StyleSheet, Text } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>study away</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
