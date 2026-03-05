import { useState } from 'react';
import { useAddComment, useUpdateComment, useDeleteComment } from './useRestaurantDetail';

export function useCommentMutations(restaurantId: string) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutate: addComment, isPending: isAddingComment } = useAddComment(restaurantId);
  const { mutate: updateComment } = useUpdateComment(restaurantId);
  const { mutate: deleteComment } = useDeleteComment(restaurantId);

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

  return {
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    isAddingComment,
    deletingCommentId: deletingId,
    editingCommentId: editingId,
  };
}
