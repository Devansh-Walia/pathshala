import { zodResolver } from '@hookform/resolvers/zod'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { ScrollView } from 'react-native-gesture-handler'
import Button from 'src/components/shared/button'
import Input from 'src/components/shared/input'
import PhotoPicker, { PickerResponse } from 'src/components/shared/photoPicker'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import useAddAttendance from 'src/utils/hooks/addAttendence'
import useGetKids from 'src/utils/hooks/getKids'
import useMeQuery from 'src/utils/hooks/me'
import useUpload from 'src/utils/hooks/uploadImage'
import { AttendanceFormSchema, AttendanceFormValues } from 'src/utils/schema/attendaceForm'

type Props = {}

const AttendanceForm = (props: Props) => {
  const [selected, setSelected] = React.useState<string[]>([])
  const { me } = useMeQuery()
  const { kids } = useGetKids()

  const { mutateAsync: uploadFile } = useUpload()
  const { mutate: saveAttendance, isPending } = useAddAttendance({
    onSuccess() {
      reset()
    },
  })

  const data = useMemo(() => {
    if (kids) {
      const data = kids.map((kid) => {
        return { key: kid.id, value: kid.name }
      })
      return data
    }
    return []
  }, [kids])

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm<AttendanceFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      visitAt: new Date(),
    },
    resolver: zodResolver(AttendanceFormSchema),
  })

  const onSubmit = async (values: AttendanceFormValues) => {
    try {
      if (me) {
        let imagePath: string | undefined

        if (values.image) {
          imagePath = await uploadFile(values.image)
        }

        saveAttendance({
          ...values,
          image: imagePath || '',
          user_id: me.id,
          kids: selected,
        })
      } else {
        throw new Error('please close the app and try again')
      }
    } catch (e) {
      Alert.alert(e instanceof Error ? e.message : 'something went wrong')
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Input<AttendanceFormValues>
            control={control}
            name="name"
            placeholder="Please enter your name"
            label="Your name"
            error={errors.name?.message}
            style={{
              borderColor: COLOR_CONSTANTS.beach.default,
            }}
          />
          <Input<AttendanceFormValues>
            control={control}
            multiline
            name="highlight"
            placeholder="today's highlights in a few words"
            label="Anything extraordinary happened today?"
            error={errors.highlight?.message}
            type="text"
            style={{
              borderColor: COLOR_CONSTANTS.beach.default,
            }}
          />
          <MultipleSelectList
            setSelected={(val: string[]) => setSelected(val)}
            data={data}
            save="key"
            label="Kids"
            placeholder="Select the kids you taught today"
            boxStyles={{
              borderColor: COLOR_CONSTANTS.beach.default,
            }}
            inputStyles={{
              color: COLOR_CONSTANTS.beach.default,
            }}
          />

          <View style={styles.timeWrapper}>
            <Text style={styles.label}>Time you visited</Text>
            <RNDateTimePicker
              style={styles.rnTimer}
              mode="time"
              value={getValues('visitAt')}
              onChange={(e, date) => {
                if (date) {
                  setValue('visitAt', date)
                }
              }}
            />
            {errors.visitAt ? <Text style={styles.error}>{errors.visitAt.message}</Text> : null}
          </View>

          <PhotoPicker
            setFile={(file: PickerResponse) => {
              setValue('image', file)
            }}
            error={errors.image ? ({ message: errors.image.message as string } as Error) : undefined}
          />

          <View style={styles.buttonWrapper}>
            <Button
              label="Submit"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading || isSubmitting || isPending}
              disabled={isLoading || isSubmitting || isPending}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default AttendanceForm

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_CONSTANTS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 400,
    width: '100%',
    marginHorizontal: 'auto',
    gap: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLOR_CONSTANTS.gray.default,
  },
  rnTimer: {
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    marginTop: 6,
    fontSize: 12,
  },
})
