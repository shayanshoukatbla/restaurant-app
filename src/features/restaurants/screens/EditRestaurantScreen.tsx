import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RestaurantStackScreenProps } from '@app-types/navigation';
import { FallbackScreen } from '@components/index';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';
import { EditRestaurantForm } from '../components/EditRestaurantForm';

type Props = RestaurantStackScreenProps<'EditRestaurant'>;

export default function EditRestaurantScreen({ route, navigation }: Props): React.JSX.Element {
  const { restaurantId } = route.params;
  const { data: restaurant, isLoading, isError } = useRestaurantDetail(restaurantId);

  if (isLoading) return <SafeAreaView className="flex-1 bg-canvas" />;
  if (isError || !restaurant) {
    return (
      <FallbackScreen
        title="No se pudo cargar el restaurante"
        buttonLabel="Volver"
        onPress={() => navigation.goBack()}
      />
    );
  }

  return <EditRestaurantForm restaurant={restaurant} navigation={navigation} />;
}
