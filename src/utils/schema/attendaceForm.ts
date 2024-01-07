import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../constants'

const schema = z.object({
  name: z.string(),
  visitAt: z.date(),
  user_id: z.string().optional(),
  highlight: z.string().optional(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )
    .optional(),
})

export type AttendanceFormValues = z.infer<typeof schema>

export { schema as AttendanceFormSchema }
