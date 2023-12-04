import { supabase } from '../../lib/supabase'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Button, Input } from 'react-native-elements'

export default function Auth() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [signUp, setSignUp] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
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

  return (
    <View style={styles.container}>
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
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View>
        ) : (
          <View style={styles.verticallySpaced}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
        )}
        <View style={styles.verticallySpaced}>
          <Button
            title={signUp ? 'Already have an account? Sign in' : 'No account? Sign up'}
            type="clear"
            onPress={() => setSignUp(!signUp)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})
