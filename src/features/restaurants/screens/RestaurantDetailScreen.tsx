import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import type { ApiError } from '@app-types/api';
import { useAuthStore } from '@features/auth/store';
import {
  useRestaurantDetail,
  useAddComment,
  useUpdateComment,
  useDeleteComment,
} from '../hooks/useRestaurantDetail';
import {
  RestaurantHero,
  RestaurantBody,
  RestaurantReviews,
  RestaurantDetailSkeleton,
} from '../components/detail';
import { ErrorScreen } from '@components/index';

type Props = RestaurantStackScreenProps<'RestaurantDetail'>;

export default function RestaurantDetailScreen({ route, navigation }: Props): React.JSX.Element {
  const { restaurantId } = route.params;
  const user = useAuthStore((s) => s.user);

  const currentUserName = user?.name ?? null;

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: restaurant, isLoading, isError, error } = useRestaurantDetail(restaurantId);

  // ── Mutations ────────────────────────────────────────────────
  const { mutate: addComment, isPending: isAddingComment } = useAddComment(restaurantId);

  const { mutate: updateComment } = useUpdateComment(restaurantId);

  const { mutate: deleteComment } = useDeleteComment(restaurantId);

  // ── Handlers ─────────────────────────────────────────────────
  const handleAddComment = (comment: string, rating: number): void => {
    addComment({ comment, rating });
  };

  const handleEditComment = (commentId: string, comment: string, rating: number): void => {
    setEditingId(commentId);
    updateComment(
      { commentId, body: { comment, rating } },
      { onSettled: () => setEditingId(null) },
    );
  };

  const handleDeleteComment = (commentId: string): void => {
    setDeletingId(commentId);
    deleteComment(commentId, { onSettled: () => setDeletingId(null) });
  };

  // ── Render states ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RestaurantDetailSkeleton />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isError || !restaurant) {
    const message = (error as unknown as ApiError)?.error ?? 'Ups, algo salió mal';
    return <ErrorScreen title={message} buttonLabel="Volver" onPress={() => navigation.goBack()} />;
  }

  // ── Main content ─────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-4 pt-4 pb-10 gap-6"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          {/* Hero section */}
          <RestaurantHero restaurant={restaurant} onBack={() => navigation.goBack()} />

          {/* Description */}
          <RestaurantBody description={restaurant.description} />

          {/* Reviews: Edit, Delete, Add Comment */}
          <RestaurantReviews
            reviews={restaurant.reviews ?? []}
            currentUserName={currentUserName}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            isAddingComment={isAddingComment}
            deletingCommentId={deletingId}
            editingCommentId={editingId}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
