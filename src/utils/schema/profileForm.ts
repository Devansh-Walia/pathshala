import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../constants'

export const UserSchema = z.object({
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

export type UserSchemaValues = z.infer<typeof UserSchema>
