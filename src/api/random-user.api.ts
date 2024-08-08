import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { User } from '../interface/user.interface';

type QueryFilter = {
    page: number;
    results: string;
};

export const randomUserApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getRandomUserInfo: build.query<User[], QueryFilter>({
            query: (arg: QueryFilter) => `?inc=name,login,picture&page=${arg.page}&results=${arg.results}`,
            transformResponse: (response: { results: User[] }) => response.results,
            transformErrorResponse: (baseQueryReturnValue: FetchBaseQueryError) => {
                if ('data' in baseQueryReturnValue) {
                    return (baseQueryReturnValue.data as { error: string }).error;
                }
                return 'An unknown error occurred';
            }
        })
    })
});

export const useGetRandomUserInfo = randomUserApi.endpoints.getRandomUserInfo.useQuery;
