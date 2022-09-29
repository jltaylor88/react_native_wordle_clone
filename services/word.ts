import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';

export interface IWordDto {
  word: string;
  syllables: {count: number; list: string[]};
}

const axiosBaseQuery =
  ({
    baseURL,
  }: {
    baseURL: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}) => {
    try {
      const response = await axios({
        url: `${baseURL}${url}`,
        method,
        data,
        params,
        headers: {
          'X-RapidAPI-Key':
            '50a0977881mshb166cfc20fee9bep16ee8fjsnfa6f7a73785b',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        },
      });

      return {data: response.data};
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: axiosBaseQuery({baseURL: 'https://wordsapiv1.p.rapidapi.com/'}),
  endpoints: builder => ({
    getRandomWord: builder.query<IWordDto, void>({
      query: () => ({
        url: 'words/',
        method: 'get',
        params: {random: true, lettersMin: 5, lettersMax: 5},
      }),
    }),
    searchForWord: builder.mutation<IWordDto, string | undefined>({
      query: word => {
        return {
          url: `words/${word}`,
          method: 'get',
        };
      },
    }),
  }),
});

export const {useGetRandomWordQuery, useSearchForWordMutation} = wordApi;
