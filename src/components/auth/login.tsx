import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { z } from 'zod'
import Input from '../shared/input'
import { supabase } from 'src/lib/supabase'

type Props = {
  loading: boolean
  toggleLoading: () => void
}

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/g),
})

type LoginFormValues = z.infer<typeof schema>

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please enter your credentials to Login!</Text>
      <Input<LoginFormValues>
        control={control}
        name="email"
        placeholder="Please enter your email"
        label="Email"
        error={errors.email?.message}
      />
      <Input<LoginFormValues>
        control={control}
        name="password"
        placeholder="Please enter your password"
        label="Password"
        error={errors.password?.message}
      />
      <Button style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} title="Submit" />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
  },
  container: {
    flex: -1,
    justifyContent: 'center',
    padding: 8,
    borderColor: 'white',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
})

export default Login
