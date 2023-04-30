import { PhotoObject } from "@/types/PhotoObject";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const photosApi = createApi({
  reducerPath: "photos",
  tagTypes: ["PhotosTag"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/photos",
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<PhotoObject[], string>({
      query: (limit) => `?_limit=${limit}`,
    }),
    addPhoto: builder.mutation({
      query: (body) => ({
        url: "add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPhotosQuery, useAddPhotoMutation, useLazyGetPhotosQuery } =
  photosApi;
