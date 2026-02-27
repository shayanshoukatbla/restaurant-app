import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// ── Auth Stack ───────────────────────────────────────────────

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

// ── App Bottom Tabs ──────────────────────────────────────────

export type AppTabParamList = {
  RestaurantList: undefined;
  MapView: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// ── Restaurant Stack (inside Tabs) ───────────────────────────

export type RestaurantStackParamList = {
  RestaurantListScreen: undefined;
  RestaurantDetail: { restaurantId: string };
  CreateRestaurant: undefined;
  EditRestaurant: { restaurantId: string };
  RestaurantSuccess: { message: string };
  RestaurantError: { message: string };
};

export type RestaurantStackScreenProps<T extends keyof RestaurantStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RestaurantStackParamList, T>,
    BottomTabScreenProps<AppTabParamList>
  >;

// ── Root Navigator ───────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
