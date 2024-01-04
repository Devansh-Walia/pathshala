import { useMemo } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'plain' | 'danger'
  size?: 'large' | 'small'
  disabled?: boolean
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  label?: string
  onClick?: () => void
  loading?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  style?: StyleProp<ViewStyle>
  // Additional props for text style
  textStyle?: StyleProp<TextStyle>
}

const Button = ({
  type = 'button',
  variant = 'primary',
  disabled = false,
  startIcon,
  endIcon,
  label,
  onClick,
  size = 'large',
  loading = false,
  fullWidth = false,
  fullHeight = false,
  style,
  textStyle,
}: ButtonProps) => {
  const styles = useMemo(() => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: size === 'large' ? 10 : 8,
      paddingHorizontal: 20,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: variant === 'primary' ? 'black' : 'white',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: 'black',
      opacity: disabled ? 0.5 : 1,
      flexDirection: 'row',
      width: fullWidth ? '100%' : undefined,
      height: fullHeight ? '100%' : undefined,
    }

    return baseStyle
  }, [variant, size, disabled, fullWidth, fullHeight])

  return (
    <TouchableOpacity onPress={onClick} disabled={disabled || loading} style={[styles, style]}>
      {loading && <ActivityIndicator size="small" color={variant === 'primary' ? 'white' : 'black'} />}
      {startIcon}
      {label && (
        <Text
          style={textStyle ? textStyle : variant === 'secondary' ? styleSheet.secondaryText : styleSheet.primaryText}
        >
          {label}
        </Text>
      )}
      {endIcon}
    </TouchableOpacity>
  )
}

export default Button

const styleSheet = StyleSheet.create({
  primaryText: {
    color: 'white',
  },

  secondaryText: {
    color: 'black',
  },
})
