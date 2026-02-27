// ── Auth ─────────────────────────────────────────────────────

export interface User {
  _id: string;
  email: string;
  name: string;
  dni?: string;
  birthDate?: string;
  address?: string;
}

export interface SignupRequest {
  email: string;
  /** Minimum 6 characters */
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface VerifyResponse {
  user: User;
}

export interface LogoutResponse {
  message: string;
}

// ── Upload ───────────────────────────────────────────────────

export interface PresignRequest {
  contentType: string;
  sizeBytes: number;
}

export interface PresignResponse {
  uploadUrl: string;
  publicUrl: string;
  objectKey: string;
  expiresIn: number;
  maxSizeBytes: number;
}

// ── Restaurant ───────────────────────────────────────────────

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  image: string;
  latlng: LatLng;
  description?: string;
  avgRating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantListResponse {
  restaurantList: Restaurant[];
  total: number;
}

export interface RestaurantListParams {
  limit?: number;
  page?: number;
}

export interface Comment {
  id: string;
  comment: string;
  /** 1-5 */
  rating: number;
  userId: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantDetail extends Restaurant {
  comments: Comment[];
}

export interface CreateRestaurantRequest {
  name: string;
  address: string;
  image: string;
  latlng: LatLng;
  description?: string;
}

export interface UpdateRestaurantRequest {
  name?: string;
  address?: string;
  image?: string;
  description?: string;
  latlng?: LatLng;
}

// ── Comments ─────────────────────────────────────────────────

export interface CreateCommentRequest {
  /** 10-255 characters */
  comment: string;
  /** 1-5 */
  rating: number;
}

export interface UpdateCommentRequest {
  comment?: string;
  rating?: number;
}

// ── Generic API error ────────────────────────────────────────

export interface ApiError {
  error: string;
  statusCode?: number;
}
