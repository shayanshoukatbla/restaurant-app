import { z } from 'zod';

export const profileSchema = z.object({
  dni: z.string().min(1, 'El DNI es obligatorio').max(20, 'DNI demasiado largo'),

  birthDate: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido — usa DD/MM/YYYY'),

  address: z.string().min(1, 'La dirección es obligatoria').max(255, 'Dirección demasiado larga'),
});

export type ProfileFields = z.infer<typeof profileSchema>;
