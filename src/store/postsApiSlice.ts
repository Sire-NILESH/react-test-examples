import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postsAdapter = createEntityAdapter<Post>();
const initialState = postsAdapter.getInitialState();

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<EntityState<Post, number>, void>({
      query: () => "posts",
      transformResponse: (response: Post[]) => {
        return postsAdapter.setAll(initialState, response);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getPostsByUserId: build.query<EntityState<Post, number>, number>({
      query: (userId) => `posts/${userId}`,
      transformResponse: (response: Post[]) => {
        return postsAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.ids.map((id) => ({ type: "Posts" as const, id }))]
          : [],
    }),
  }),
});

export const { useGetPostsQuery } = postsApiSlice;
