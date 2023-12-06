import React from 'react'
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type Props<TFieldValues extends FieldValues> = {
  label?: string
  error?: string
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
  >
  placeholder?: string
}

function Input<TFieldValues extends FieldValues>({
  label,
  error,
  control,
  name,
  rules,
  placeholder,
}: Props<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 12,
  },
})

export default Input
