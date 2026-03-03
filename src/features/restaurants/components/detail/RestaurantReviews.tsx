import React from 'react';
import { View } from 'react-native';
import type { Review } from '@app-types/api';
import { CommentItem } from './CommentItem';
import { AddComment } from './AddComment';

interface RestaurantReviewsProps {
  reviews: Review[];
  currentUserName: string | null;
  onAddComment: (comment: string, rating: number) => void;
  onEditComment: (commentId: string, comment: string, rating: number) => void;
  onDeleteComment: (commentId: string) => void;
  isAddingComment: boolean;
  deletingCommentId: string | null;
  editingCommentId: string | null;
}

export function RestaurantReviews({
  reviews,
  currentUserName,
  onAddComment,
  onEditComment,
  onDeleteComment,
  isAddingComment,
  deletingCommentId,
  editingCommentId,
}: RestaurantReviewsProps): React.JSX.Element {
  return (
    <View className="gap-0">
      {/* Add comment form */}
      <AddComment onSubmit={onAddComment} isPending={isAddingComment} />

      {/* Comment list */}
      {reviews.map((review) => (
        <CommentItem
          key={review._id}
          review={review}
          currentUserName={currentUserName}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
          isDeleting={deletingCommentId === review._id}
          isEditing={editingCommentId === review._id}
        />
      ))}
    </View>
  );
}
