import React from 'react'
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Eye from 'src/assets/Eye'
import EyeOff from 'src/assets/Eye-off'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import { getContentType } from 'src/utils/helpers'
import { useTogglePasswordVisibility } from 'src/utils/hooks/password-visibility'
import { InputType } from 'src/utils/types'

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
  type?: InputType
  keyBoardType?: KeyboardTypeOptions
  style?: StyleProp<ViewStyle>
  multiline?: boolean
  disabled?: boolean
}

function Input<TFieldValues extends FieldValues>({
  label,
  error,
  control,
  name,
  rules,
  placeholder,
  type,
  keyBoardType,
  style,
  multiline = false,
  disabled = false,
}: Props<TFieldValues>) {
  const { handlePasswordVisibility, passwordVisibility, rightIcon } = useTogglePasswordVisibility()
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View>
            {disabled ? (
              <View
                style={[
                  styles.input,
                  multiline ? styles.multiline : null,
                  style,
                  { backgroundColor: COLOR_CONSTANTS.gray.light },
                ]}
              >
                <Text>{value}</Text>
              </View>
            ) : (
              <TextInput
                placeholder={placeholder}
                style={[styles.input, multiline ? styles.multiline : null, style]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={type === 'password' ? passwordVisibility : false}
                textContentType={getContentType(type)}
                keyboardType={keyBoardType}
                multiline={multiline}
              />
            )}

            {type === 'password' ? (
              <TouchableOpacity style={styles.icon} onPress={handlePasswordVisibility}>
                {rightIcon === 'eye' ? (
                  <Eye width={20} height={20} stroke={COLOR_CONSTANTS.gray.default} />
                ) : (
                  <EyeOff width={20} height={20} stroke={COLOR_CONSTANTS.gray.default} />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
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
    color: COLOR_CONSTANTS.gray.default,
  },
  input: {
    backgroundColor: COLOR_CONSTANTS.white,
    borderColor: COLOR_CONSTANTS.black,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  multiline: {
    height: 100,
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
})

export default Input
