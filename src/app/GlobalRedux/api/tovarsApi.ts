import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tovarsApi = createApi({
	reducerPath: 'tovarsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
	}),
	endpoints: (build) => ({
		getTovars: build.query<void, void>({
			query: () => 'products'
		})
	})
});

export const { useGetTovarsQuery } = tovarsApi;
