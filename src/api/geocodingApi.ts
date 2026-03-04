import axios from 'axios';

const nominatimClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GEOCODING_API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'RestaurantApp/1.0',
    'Accept-Language': 'es',
  },
});

export interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

export const geocodingApi = {
  searchAddress: async (query: string, limit = 5): Promise<NominatimResult[]> => {
    const res = await nominatimClient.get<NominatimResult[]>('/search', {
      params: { q: query, format: 'json', limit, addressdetails: 1 },
    });
    return res.data;
  },
};
