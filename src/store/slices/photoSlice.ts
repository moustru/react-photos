import { PhotoObject } from "@/types/PhotoObject";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type StatusOptions = "loading" | "resolved" | "rejected" | null;

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photosData: {
      photos: <PhotoObject[]>[],
      status: <StatusOptions>null,
      error: <string | null>null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.photosData = {
          ...state.photosData,
          status: "loading",
        };
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        console.log("fulfilled");
        state.photosData = {
          ...state.photosData,
          photos: payload,
          status: "resolved",
        };
      })
      .addCase(getPhotos.rejected, (state, { payload }) => {
        console.log("rejected");
        state.photosData = {
          ...state.photosData,
          status: "rejected",
          error: <string | null>payload,
        };
      });
  },
});

export const getPhotos = createAsyncThunk(
  "photo/getPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=50"
      );

      if (!response.ok) {
        throw new Error("Error!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default photoSlice.reducer;
