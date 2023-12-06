import { supabase } from '../../lib/supabase'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { Button, Input } from 'react-native-elements'
import Login from './login'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [signUp, setSignUp] = useState(false)

  async function signUpWithEmail(email: string, password: string, name: string) {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      options: {
        data: {
          name: name,
        },
      },
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session && !error) {
      Alert.alert('Please check your inbox for email verification!'), setSignUp(false)
    }
    setLoading(false)
  }

  const toggleLoading = () => {
    setLoading((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      {/* <View>
        <Text style={styles.heading}>Welcome!</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {signUp ? (
          <Input
            label="Name"
            placeholder="Please enter your name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        ) : null}
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          passwordRules={'minlength: 8; required: lower; required: upper; required: digit;'}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        {signUp ? (
          <View style={[styles.verticallySpaced]}>
            <Button style={styles.roundedButton} title="Sign up" disabled={loading} onPress={signUpWithEmail} />
          </View>
        ) : (
          <View style={styles.verticallySpaced}>
            <Button style={styles.roundedButton} title="Sign in" disabled={loading} onPress={signInWithEmail} />
          </View>
        )}
        <View style={styles.verticallySpaced}>
          <Button
            title={signUp ? 'Already have an account? Sign in' : 'No account? Sign up'}
            type="clear"
            onPress={() => setSignUp(!signUp)}
          />
        </View>
      </View> */}
      <Login loading={loading} toggleLoading={toggleLoading} />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  roundedButton: {
    borderRadius: 40,
    backgroundColor: '#000000',
    padding: 10,
    margin: 10,
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
