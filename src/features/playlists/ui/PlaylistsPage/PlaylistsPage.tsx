import { useForm } from "react-hook-form";
import {
	useDeletePlaylistMutation,
	useFetchPlaylistsQuery,
} from "../../api/playlistsApi";
import type {
	PlaylistData,
	UpdatePlaylistArgs,
} from "../../api/playlistsApi.types";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useState } from "react";
import { EditPlaylistForm } from "./EditPlaylistForm/EditPlaylistForm";
import { PlaylistItem } from "./PlaylistItem/PlaylistItem";
import { useDebounceValue } from "@/common/hooks/useDebounceValue.ts";

export const PlaylistsPage = () => {
	const [playlistId, setPlaylistId] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

	const debouncedSearch = useDebounceValue(search);

	const { data, isLoading } = useFetchPlaylistsQuery({ search: debouncedSearch });

	const [deletePlaylist] = useDeletePlaylistMutation();

	const deletePlaylistHandler = (playlistId: string) => {
		if (confirm("Are you sure you want to delete the playlist?")) {
			deletePlaylist(playlistId);
		}
	};

	const editPlaylistHandler = (playlist: PlaylistData | null) => {
		if (playlist) {
			setPlaylistId(playlist.id);
			reset({
				title: playlist.attributes.title,
				description: playlist.attributes.description,
				tagIds: playlist.attributes.tags.map((t) => t.id),
			});
		} else {
			setPlaylistId(null);
		}
	};

	return (
		<div className={s.container}>
			<h1>Playlists page</h1>
			<CreatePlaylistForm />
			<input
				type="search"
				name="search"
				id="search"
				placeholder="Search playlists..."
				onChange={(e) => setSearch(e.currentTarget.value)}
			/>
			<div className={s.items}>
				{!data?.data.length && !isLoading && <p>No playlists found</p>}
				{data?.data.map((playlist) => {
					const isEditing = playlistId === playlist.id;

					return (
						<div className={s.item} key={playlist.id}>
							{isEditing ? (
								<EditPlaylistForm
									playlistId={playlistId}
									handleSubmit={handleSubmit}
									register={register}
									editPlaylist={editPlaylistHandler}
									setPlaylistId={setPlaylistId}
								/>
							) : (
								<PlaylistItem
									playlist={playlist}
									deletePlaylist={deletePlaylistHandler}
									editPlaylist={editPlaylistHandler}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
