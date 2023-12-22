import { login } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { z } from 'zod'
import Input from '../shared/input'

type Props = {}

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
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<LoginFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { error } = data

      if (error) {
        const errors = error.toString().split(':')
        throw new Error(errors[errors.length - 1].trim())
      }

      Alert.alert('Success', 'Logged in successfully!')
    },
    onError: (error) => {
      Alert.alert('Error', error.message)
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data

    mutate({
      email,
      password,
    })
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
        type="email"
      />
      <Input<LoginFormValues>
        control={control}
        name="password"
        placeholder="Please enter your password"
        label="Password"
        error={errors.password?.message}
        type="password"
      />
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || isLoading || isPending}
        loading={isSubmitting || isLoading || isPending}
        title="Submit"
      />
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
    padding: 10,
    borderRadius: 4,
  },
})

export default Login
