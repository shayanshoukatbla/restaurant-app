import { z } from 'zod';

const COORDS_MSG = 'Selecciona una dirección de la lista para obtener coordenadas';

export const createRestaurantSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  address: z.string().min(5, 'La dirección es requerida'),
  lat: z
    .number({ error: COORDS_MSG })
    .optional()
    .refine((v) => v !== undefined, { message: COORDS_MSG }),
  lng: z
    .number({ error: COORDS_MSG })
    .optional()
    .refine((v) => v !== undefined, { message: COORDS_MSG }),
  description: z
    .string()
    .max(2000, 'La descripción debe tener menos de 2000 caracteres')
    .optional(),
  image: z.string().min(1, 'Debes subir una imagen'),
});

export type CreateRestaurantFields = z.infer<typeof createRestaurantSchema>;
