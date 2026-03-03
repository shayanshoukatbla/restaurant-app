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

/** The API only exposes { name } for review owners — no _id is returned */
export interface ReviewOwner {
  name: string;
}

export interface Review {
  _id: string;
  /** Reviewer display name (same as owner.name) */
  name?: string;
  owner: ReviewOwner;
  date: string;
  rating: number;
  comment: string;
}

// Full detail-page type (same shape, kept separate for clarity)
export type RestaurantDetail = Restaurant;

export interface Restaurant {
  _id: string;
  name: string;
  owner: string;
  address: string;
  image: string;
  latlng: LatLng;
  description?: string;
  reviews: Review[];
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

// ── Reviews / Comments ───────────────────────────────────────

export interface CreateReviewRequest {
  /** 10-255 characters */
  comment: string;
  /** 1-5 */
  rating: number;
}

export interface UpdateReviewRequest {
  comment?: string;
  rating?: number;
}

// Aliases used by the detail page
export type AddCommentRequest = CreateReviewRequest;
export type UpdateCommentRequest = UpdateReviewRequest;

export interface CommentResponse {
  review: Review;
}

// ── Generic API error ────────────────────────────────────────

export interface ApiError {
  error: string;
  statusCode?: number;
}
