import { useMemo } from 'react'
import { ActivityIndicator, Image, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { DocumentPickerResponse } from 'react-native-document-picker'
import { TouchableOpacity } from 'react-native'
import ImageIcon from 'src/assets/Image'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import useImagePicker from 'src/utils/hooks/useImagePicker'
import CrossIcon from 'src/assets/Cross'

type Props = {
  fullWidth?: boolean
  fullHeight?: boolean
  style?: StyleProp<TextStyle>
  setFile: (file: DocumentPickerResponse) => void
  error?: Error
  url?: string
}

const Avatar = ({ fullHeight = true, fullWidth = true, style, setFile, error, url }: Props) => {
  const styles = useMemo(() => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      width: 100,
      height: 100,
      borderColor: COLOR_CONSTANTS.beach.default,
      borderWidth: 1,
      borderRadius: 100,
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
      {status !== 'pending' && file && (url || file.fileCopyUri) ? (
        <View style={styleSheet.previewContainer}>
          <TouchableOpacity
            style={styleSheet.button}
            onPress={() => {
              reset()
            }}
          >
            <CrossIcon width={15} height={15} stroke={COLOR_CONSTANTS.black} />
          </TouchableOpacity>
          <Image
            source={{ uri: url ? url : file.fileCopyUri ? file.fileCopyUri : '' }}
            style={styleSheet.preview}
            accessibilityLabel="Preview"
          />
        </View>
      ) : status === 'pending' ? (
        <ActivityIndicator color={COLOR_CONSTANTS.gray.light} />
      ) : (
        <ImageIcon style={styleSheet.preview} stroke={styles.borderColor} />
      )}
      <Text style={styleSheet.error}>{error ? error.message : null}</Text>
    </TouchableOpacity>
  )
}

export default Avatar

const styleSheet = StyleSheet.create({
  previewContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  button: {
    backgroundColor: COLOR_CONSTANTS.white,
    shadowColor: COLOR_CONSTANTS.black,
    position: 'absolute',
    padding: 4,
    borderRadius: 100,
    elevation: 5,
    zIndex: 3,
    top: '-10%',
    right: '10%',
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    height: 3,
    width: 3,
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: COLOR_CONSTANTS.alert.dangerFaded,
  },
})

export type { DocumentPickerResponse as AvatarResponse }
