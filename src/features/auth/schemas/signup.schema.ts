import { z } from 'zod';

export const signupStepOneSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Introduce un email válido'),
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
});

export const signupStepTwoSchema = z.object({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type SignupStepOneFields = z.infer<typeof signupStepOneSchema>;
export type SignupStepTwoFields = z.infer<typeof signupStepTwoSchema>;
