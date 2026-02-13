import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	CreatePlaylistArgs,
	PlaylistData,
	PlaylistsResponse,
} from "./playlistsApi.types";

export const playlistsApi = createApi({
	reducerPath: "playlistsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		headers: { "API-KEY": import.meta.env.VITE_API_KEY },
		prepareHeaders: (headers) => {
			headers.set(
				"Authorization",
				`Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
			);
			return headers;
		},
	}),
	endpoints: (build) => ({
		fetchPlaylists: build.query<PlaylistsResponse, void>({
			query: () => {
				return {
					url: "playlists",
					method: "GET",
				};
			},
		}),
		createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
			query: (body) => ({
				url: "playlists",
				method: "post",
				body: {
					data: {
						type: "playlists",
						attributes: {
							title: body.title,
							description: body.description,
						},
					},
				},
			}),
		}),
	}),
});

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } =
	playlistsApi;
