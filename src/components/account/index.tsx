import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { z } from 'zod'

import { Text } from 'react-native-elements'
import Button from 'src/components/shared/button'
import Input from 'src/components/shared/input'
import { ACCEPTED_IMAGE_TYPES, COLOR_CONSTANTS, MAX_FILE_SIZE } from 'src/utils/constants'
import useMeQuery from 'src/utils/hooks/me'
import useUpdateProfile from 'src/utils/hooks/updateProfile'
import useUpload from 'src/utils/hooks/uploadImage'
import { BUCKET_PATH } from 'src/utils/types'
import Avatar from '../shared/avatar'
import useGetImageBlob from 'src/utils/hooks/getImage'

const userSchema = z.object({
  full_name: z.string().min(1, 'Name is required').optional(),
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )
    .optional(),
  avatar_url: z.string().optional(),
})

export type UserSchemaValues = z.infer<typeof userSchema>

export default function UserForm() {
  const { me } = useMeQuery()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UserSchemaValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: me?.full_name || '',
    },
  })

  const { mutateAsync: getImage, data: image } = useGetImageBlob()

  const { mutateAsync: upload, status: isUploading } = useUpload({ to: BUCKET_PATH.AVATARS })

  const { mutate: updateProfile, status: isUpdatingProfile } = useUpdateProfile({})

  const onSubmit = async (values: UserSchemaValues) => {
    if (isDirty && me?.id) {
      if (values.avatar) {
        await upload(values.avatar)
      }

      updateProfile({
        id: me.id,
        values: { full_name: values.full_name, avatar_url: values.avatar_url, updated_at: new Date() },
      })
    }
  }

  useEffect(() => {
    setValue('full_name', me?.full_name)
    if (me?.avatar_url) {
      getImage({
        path: me.avatar_url,
        from: BUCKET_PATH.AVATARS,
      })
    }
  }, [me])

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.label}>Avatar</Text>
          <Avatar
            setFile={(file) => setValue('avatar', file)}
            error={errors.avatar?.message ? new Error(errors.avatar?.message as string) : undefined}
            url={image as string}
          />
        </View>
        <Input control={control} name="full_name" label="Your Name" error={errors.full_name?.message} />
        <Button
          label="Submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || isUpdatingProfile === 'pending' || isUploading === 'pending'}
          loading={isUpdatingProfile === 'pending' || isUploading === 'pending'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_CONSTANTS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLOR_CONSTANTS.gray.default,
  },
})
