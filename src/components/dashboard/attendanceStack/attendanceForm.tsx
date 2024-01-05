import { zodResolver } from '@hookform/resolvers/zod'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import Button from 'src/components/shared/button'
import Input from 'src/components/shared/input'
import { COLOR_CONSTANTS } from 'src/utils/constants'
import { z } from 'zod'

type Props = {}

const schema = z.object({
  email: z.string().email(),
  highlight: z.string().optional(),
  visitAt: z.date(),
})

type AttendanceFormValues = z.infer<typeof schema>

const AttendanceForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<AttendanceFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      visitAt: new Date(),
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (values: AttendanceFormValues) => {
    console.log(values)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input<AttendanceFormValues>
          control={control}
          name="email"
          placeholder="Please enter your email"
          label="Email"
          error={errors.email?.message}
          type="email"
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

        <View style={styles.buttonWrapper}>
          <Button label="Submit" onClick={handleSubmit(onSubmit)} loading={isLoading || isSubmitting} />
        </View>
      </View>
    </View>
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
