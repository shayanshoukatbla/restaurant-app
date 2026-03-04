import { useQuery } from '@tanstack/react-query';
import { geocodingApi } from '@api/geocodingApi';

export const ADDRESS_SUGGESTIONS_KEY = (query: string) => ['geocoding', 'address', query] as const;

export function useAddressSuggestions(query: string) {
  return useQuery({
    queryKey: ADDRESS_SUGGESTIONS_KEY(query),
    queryFn: () => geocodingApi.searchAddress(query),
    enabled: query.trim().length >= 3,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
