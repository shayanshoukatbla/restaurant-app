import { z } from 'zod';

export const commentSchema = z.object({
  comment: z
    .string()
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(255, 'El comentario no puede superar los 255 caracteres'),
  rating: z.number().min(1, 'Por favor selecciona una puntuación').max(5),
});

export type CommentFields = z.infer<typeof commentSchema>;
