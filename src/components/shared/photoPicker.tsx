import { useMemo } from 'react'
import { ActivityIndicator, Image, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageIcon from 'src/assets/Image'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import useImagePicker from 'src/utils/hooks/useImagePicker'

type Props = {
  fullWidth?: boolean
  fullHeight?: boolean
  label?: string
  rounded?: 'lg' | 'md' | 'sm' | 'full'
  style?: StyleProp<TextStyle>
  setFile: (file: DocumentPickerResponse) => void
  error?: Error
}

const PhotoPicker = ({
  fullHeight = true,
  fullWidth = true,
  label = 'Photos please! If Any...',
  rounded = 'md',
  style,
  setFile,
  error,
}: Props) => {
  const borderRadius = useMemo(() => {
    switch (rounded) {
      case 'lg':
        return 40
      case 'md':
        return 20
      case 'sm':
        return 10
      case 'full':
        return 100
      default:
        return 20
    }
  }, [rounded])

  const styles = useMemo(() => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',

      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius,
      elevation: 3,

      borderColor: COLOR_CONSTANTS.beach.default,
      borderWidth: 1,

      width: fullWidth ? '100%' : 100,
      height: fullHeight ? 100 : 100,
      gap: 10,
      marginVertical: 10,
    }

    return baseStyle
  }, [fullWidth, fullHeight])

  const {
    data: file,
    mutate: pickImage,
    reset,
    status,
  } = useImagePicker({
    onSuccess(data, variables, context) {
      if (data) {
        setFile(data)
      }
    },
  })

  return (
    <TouchableOpacity
      style={[styles, style, error ? { borderColor: COLOR_CONSTANTS.alert.danger } : null]}
      onPress={() => {
        pickImage()
      }}
      disabled={file !== undefined}
    >
      {status !== 'pending' && file && file.fileCopyUri ? (
        <View style={styleSheet.previewContainer}>
          <Image source={{ uri: file.fileCopyUri }} style={styleSheet.preview} accessibilityLabel="Preview" />
          <TouchableOpacity
            style={styleSheet.button}
            onPress={() => {
              reset()
            }}
          >
            <Text style={styleSheet.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : status === 'pending' ? (
        <ActivityIndicator color={COLOR_CONSTANTS.gray.light} />
      ) : (
        <>
          <ImageIcon stroke={styles.borderColor} />
          {label ? <Text style={[{ color: styles.borderColor, textAlign: 'center' }]}>{label}</Text> : null}
        </>
      )}
      <Text style={styleSheet.error}>{error ? error.message : null}</Text>
    </TouchableOpacity>
  )
}

export default PhotoPicker

const styleSheet = StyleSheet.create({
  previewContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  button: {
    paddingHorizontal: 4,
    borderRadius: 100,
    elevation: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: COLOR_CONSTANTS.alert.dangerFaded,
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: COLOR_CONSTANTS.alert.dangerFaded,
  },
})

export type { DocumentPickerResponse as PickerResponse }
