import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import type { ApiError } from '@app-types/api';
import { useAuthStore } from '@features/auth/store';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';
import { useDeleteRestaurant } from '../hooks/useCreateRestaurant';
import { useCommentMutations } from '../hooks/useCommentMutations';
import {
  RestaurantHero,
  RestaurantBody,
  RestaurantReviews,
  RestaurantDetailSkeleton,
} from '../components/detail';
import { FallbackScreen, Button } from '@components/index';

type Props = RestaurantStackScreenProps<'RestaurantDetail'>;

export default function RestaurantDetailScreen({ route, navigation }: Props): React.JSX.Element {
  const { restaurantId } = route.params;
  const user = useAuthStore((s) => s.user);

  const currentUserName = user?.name ?? null;

  const { data: restaurant, isLoading, isError, error } = useRestaurantDetail(restaurantId);
  const { mutate: deleteRestaurant, isPending: isDeletingRestaurant } = useDeleteRestaurant();

  // ── Comment mutations ────────────────────────────────────────
  const {
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    isAddingComment,
    deletingCommentId,
    editingCommentId,
  } = useCommentMutations(restaurantId);

  const handleDeleteRestaurant = (): void => {
    Alert.alert(
      'Eliminar restaurante',
      '¿Estás seguro de que deseas eliminar este restaurante? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            deleteRestaurant(restaurantId, {
              onSuccess: () => navigation.goBack(),
            }),
        },
      ],
    );
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
    return <FallbackScreen title={message} buttonLabel="Volver" onPress={() => navigation.goBack()} />;
  }

  const ownerName =
    typeof restaurant.owner === 'string'
      ? restaurant.owner
      : ((restaurant.owner as unknown as { name?: string })?.name ?? '');

  const isOwner =
    currentUserName != null &&
    !!ownerName &&
    currentUserName.trim().toLowerCase() === ownerName.trim().toLowerCase();

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
            deletingCommentId={deletingCommentId}
            editingCommentId={editingCommentId}
          />

          {/* Owner-only: Edit + Delete restaurant */}
          {isOwner && (
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  label="Editar"
                  variant="outline-black"
                  fullWidth
                  onPress={() => navigation.navigate('EditRestaurant', { restaurantId })}
                />
              </View>
              <View className="flex-1">
                <Button
                  label="Eliminar"
                  variant="solid-black"
                  fullWidth
                  loading={isDeletingRestaurant}
                  onPress={handleDeleteRestaurant}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
