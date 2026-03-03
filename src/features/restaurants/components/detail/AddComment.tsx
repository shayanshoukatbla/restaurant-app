import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema, type CommentFields } from '@features/restaurants/schemas/comment.schema';
import { StarRating } from './StarRating';
import { Button } from '@components/index';

interface AddCommentProps {
  onSubmit: (comment: string, rating: number) => void;
  isPending: boolean;
}

export function AddComment({ onSubmit, isPending }: AddCommentProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: '', rating: 0 },
  });

  const onValid = (values: CommentFields): void => {
    onSubmit(values.comment, values.rating);
    reset();
  };

  return (
    <View className="border border-ink rounded-3xl p-4 gap-4 bg-canvas">
      {/* Stars selector */}
      <Controller
        control={control}
        name="rating"
        render={({ field: { value, onChange } }) => (
          <View>
            <StarRating rating={value} onRate={onChange} size={20} />
            {errors.rating && (
              <Text className="font-roobert text-sm text-primary mt-1">
                {errors.rating.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Comment text input */}
      <Controller
        control={control}
        name="comment"
        render={({ field: { value, onChange } }) => (
          <View>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Escribe tu comentario sobre el restaurante"
              placeholderTextColor="rgba(11,11,11,0.40)"
              multiline
              textAlignVertical="top"
              className="font-roobert text-base text-ink pt-0"
            />
            {errors.comment && (
              <Text className="font-roobert text-sm text-primary mt-1">
                {errors.comment.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Submit */}
      <Button
        label="Enviar"
        onPress={handleSubmit(onValid)}
        variant="outline-black"
        loading={isPending}
        disabled={isPending}
        className="self-start"
      />
    </View>
  );
}
