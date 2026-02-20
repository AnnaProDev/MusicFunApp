import type { Images } from "@/common/types";
import type {
	CreatePlaylistArgs,
	PlaylistData,
	PlaylistsResponse,
	UpdatePlaylistArgs,
} from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		fetchPlaylists: build.query<PlaylistsResponse, void>({
			query: () => {
				return {
					url: "playlists",
					method: "GET",
				};
			},
			providesTags: ["Playlist"],
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
			invalidatesTags: ["Playlist"],
		}),
		deletePlaylist: build.mutation<void, string>({
			query: (playlistId) => ({
				url: `playlists/${playlistId}`,
				method: "delete",
			}),
			invalidatesTags: ["Playlist"],
		}),
		updatePlaylist: build.mutation<
			void,
			{ playlistId: string; body: UpdatePlaylistArgs }
		>({
			query: ({ playlistId, body }) => ({
				url: `playlists/${playlistId}`,
				method: "put",
				body: {
					data: {
						type: "playlists",
						attributes: body,
					},
				},
			}),
			invalidatesTags: ["Playlist"],
		}),
		uploadPlaylistCovert: build.mutation<Images,	{playlistId: string; file: File }>({
			query: ({ playlistId, file }) => {
				const formData = new FormData();
				formData.append("file", file);
				return {
					url: `playlists/${playlistId}/images/main`,
					method: "post",
					body: formData,
				};
			},
			invalidatesTags: ["Playlist"],
		}),
	}),
});

export const {
	useFetchPlaylistsQuery,
	useCreatePlaylistMutation,
	useDeletePlaylistMutation,
	useUpdatePlaylistMutation,
	useUploadPlaylistCovertMutation,
} = playlistsApi;
