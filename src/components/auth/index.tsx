import { supabase } from '../../lib/supabase'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import { Button, Input } from 'react-native-elements'
import Login from './login'
import SignUp from './signup'

export default function Auth() {
  const [signUp, setSignUp] = useState(false)

  const toggleSignUp = () => {
    setSignUp((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      {signUp ? <SignUp onSubmit={toggleSignUp} /> : <Login />}

      <View style={styles.verticallySpaced}>
        <Button
          title={signUp ? 'Already have an account? Sign in' : 'No account? Sign up'}
          type="clear"
          onPress={() => setSignUp(!signUp)}
        />
      </View>
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
