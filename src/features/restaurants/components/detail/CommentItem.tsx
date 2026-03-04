import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Review } from '@app-types/api';
import { Button } from '@components/index';
import { commentSchema, type CommentFields } from '@features/restaurants/schemas/comment.schema';
import { StarRating } from './StarRating';

interface CommentItemProps {
  review: Review;
  currentUserName: string | null;
  onEdit: (commentId: string, comment: string, rating: number) => void;
  onDelete: (commentId: string) => void;
  isDeleting?: boolean;
  isEditing?: boolean;
}

export function CommentItem({
  review,
  currentUserName,
  onEdit,
  onDelete,
  isDeleting = false,
  isEditing = false,
}: CommentItemProps): React.JSX.Element {
  const [editMode, setEditMode] = useState(false);

  const ownerName = review.owner.name ?? review.name ?? 'Usuario';
  const isOwner =
    currentUserName != null &&
    currentUserName.trim().toLowerCase() === ownerName.trim().toLowerCase();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: review.comment, rating: review.rating },
  });

  const enterEditMode = (): void => {
    reset({ comment: review.comment, rating: review.rating });
    setEditMode(true);
  };

  const cancelEdit = (): void => {
    reset({ comment: review.comment, rating: review.rating });
    setEditMode(false);
  };

  const onValid = (values: CommentFields): void => {
    onEdit(review._id, values.comment, values.rating);
    setEditMode(false);
  };

  const confirmDelete = (): void => {
    Alert.alert('Eliminar comentario', '¿Estás seguro de que quieres eliminar este comentario?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(review._id) },
    ]);
  };

  return (
    <View className="gap-2 py-4 border-b border-blue w-full">
      <Text className="font-roobert-semibold text-base text-ink">{ownerName}</Text>

      {/* Stars — Controller only active in edit mode */}
      <View className="items-end">
        {editMode ? (
          <Controller
            control={control}
            name="rating"
            render={({ field: { value, onChange } }) => (
              <>
                <StarRating rating={value} onRate={onChange} />
                {errors.rating && (
                  <Text className="font-roobert text-sm text-primary mt-1">
                    {errors.rating.message}
                  </Text>
                )}
              </>
            )}
          />
        ) : (
          <StarRating rating={review.rating} />
        )}
      </View>

      {/* Comment body + action buttons */}
      <View className="items-end gap-4 w-full">
        {editMode ? (
          <Controller
            control={control}
            name="comment"
            render={({ field: { value, onChange } }) => (
              <View className="w-full">
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
                  autoFocus
                  className="font-roobert text-base text-ink border border-ink rounded-xl px-3 py-2 min-h-[70px] w-full"
                />
                {errors.comment && (
                  <Text className="font-roobert text-sm text-primary mt-1">
                    {errors.comment.message}
                  </Text>
                )}
              </View>
            )}
          />
        ) : (
          <Text className="font-roobert text-base text-ink w-full">{review.comment}</Text>
        )}

        {isOwner && (
          <View className="flex-row gap-4">
            {editMode ? (
              <>
                <Button
                  label="Guardar"
                  onPress={handleSubmit(onValid)}
                  variant="outline-black"
                  loading={isEditing}
                  disabled={isEditing}
                />
                <Button
                  label="Cancelar"
                  onPress={cancelEdit}
                  variant="outline-black"
                  className="opacity-50"
                />
              </>
            ) : (
              <>
                <Button label="Editar" onPress={enterEditMode} variant="outline-black" />
                <Button
                  label="Eliminar"
                  onPress={confirmDelete}
                  variant="outline-black"
                  loading={isDeleting}
                  disabled={isDeleting}
                />
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
