import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import type { Review } from '@app-types/api';
import { Button } from '@components/index';
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
  const [editText, setEditText] = useState(review.comment);
  const [editRating, setEditRating] = useState(review.rating);

  const ownerName = review.owner.name ?? review.name ?? 'Usuario';
  const isOwner =
    currentUserName != null &&
    currentUserName.trim().toLowerCase() === ownerName.trim().toLowerCase();

  const handleConfirmEdit = (): void => {
    if (editText.trim().length < 10) {
      Alert.alert('Error', 'El comentario debe tener al menos 10 caracteres.');
      return;
    }
    onEdit(review._id, editText.trim(), editRating);
    setEditMode(false);
  };

  const handleDeletePress = (): void => {
    Alert.alert('Eliminar comentario', '¿Estás seguro de que quieres eliminar este comentario?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(review._id) },
    ]);
  };

  return (
    <View className="flex-col  gap-2 py-4 border-b border-blue w-full">
      <Text className="font-roobert-semibold text-base text-ink">{ownerName}</Text>
      <View className="flex items-end">
        <StarRating
          rating={editMode ? editRating : review.rating}
          onRate={editMode ? setEditRating : undefined}
        />
      </View>
      <View className="flex-col items-end w-full gap-4">
        {editMode ? (
          <TextInput
            value={editText}
            onChangeText={setEditText}
            multiline
            textAlignVertical="top"
            className="font-roobert text-base text-ink border border-ink rounded-xl px-3 py-2 min-h-[70px] w-full"
            autoFocus
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
                  onPress={handleConfirmEdit}
                  variant="outline-black"
                  loading={isEditing}
                  disabled={isEditing}
                />
                <Button
                  label="Cancelar"
                  onPress={() => {
                    setEditMode(false);
                    setEditText(review.comment);
                    setEditRating(review.rating);
                  }}
                  variant="outline-black"
                  className="opacity-50"
                />
              </>
            ) : (
              <>
                <Button label="Editar" onPress={() => setEditMode(true)} variant="outline-black" />
                <Button
                  label="Eliminar"
                  onPress={handleDeletePress}
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
