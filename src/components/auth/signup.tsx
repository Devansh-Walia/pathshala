import { signup } from '@api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { z } from 'zod'
import Input from '../shared/input'

type Props = {
  onSubmit: () => void
}

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/g),
})

type SignUpFormValues = z.infer<typeof schema>

const SignUp = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      const {
        error,
        data: { session },
      } = data

      if (error) Alert.alert(error.toString())

      if (!session && !error) {
        Alert.alert('Please check your inbox for email verification!')
        props.onSubmit()
      }

      Alert.alert('Success', 'Logged in successfully!')
    },
    onError: (error) => {
      Alert.alert('Error', error.message)
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    const { email, password, name } = data

    mutate({
      email,
      password,
      name,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please enter your credentials to SignUp!</Text>
      <Input<SignUpFormValues>
        control={control}
        name="name"
        placeholder="Please enter your name"
        label="Name"
        error={errors.name?.message}
      />
      <Input<SignUpFormValues>
        control={control}
        name="email"
        placeholder="Please enter your email"
        label="Email"
        error={errors.email?.message}
        type="email"
      />
      <Input<SignUpFormValues>
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
        disabled={isSubmitting || isPending}
        loading={isSubmitting || isPending}
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
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
})

export default SignUp
