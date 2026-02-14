import { useForm } from "react-hook-form";
import {
	useDeletePlaylistMutation,
	useFetchPlaylistsQuery,
} from "../../api/playlistsApi";
import type { PlaylistData, UpdatePlaylistArgs } from "../../api/playlistsApi.types";
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm";
import s from "./PlaylistsPage.module.css";
import { useState } from "react";
import { EditPlaylistForm } from "./EditPlaylistForm/EditPlaylistForm";
import { PlaylistItem } from "./PlaylistItem/PlaylistItem";

// export const PlaylistsPage = () => {
// 	const { data } = useFetchPlaylistsQuery();
// 	const [deletePlaylist] = useDeletePlaylistMutation();
// 	const [updatePlaylist] = useUpdatePlaylistMutation();

// 	const deletePlaylistHandler = (playlistId: string) => {
// 		if (confirm("Are you sure you want to delete the playlist?")) {
// 			deletePlaylist(playlistId);
// 		}
// 	};

// 	const updatePlaylistHandler = (playlistId: string) => {
// 		updatePlaylist({
// 			playlistId,
// 			body: {
// 				title: "🎶1",
// 				description: "🤩2",
// 				tagIds: [],
// 			},
// 		});
// 	};

// 	return (
// 		<div className={s.container}>
// 			<h1>Playlists page</h1>
// 			<CreatePlaylistForm />
// 			<div className={s.items}>
// 				{data?.data.map((playlist) => {
// 					return (
// 						<div className={s.item} key={playlist.id}>
// 							<div>title: {playlist.attributes.title}</div>
// 							<div>description: {playlist.attributes.description}</div>
// 							<div>userName: {playlist.attributes.user.name}</div>
// 							<button onClick={() => deletePlaylistHandler(playlist.id)}>
// 								Delete
// 							</button>
// 							<button onClick={() => updatePlaylistHandler(playlist.id)}>
// 								Edit
// 							</button>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

export const PlaylistsPage = () => {
	const [playlistId, setPlaylistId] = useState<string | null>(null);

	const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

	const { data } = useFetchPlaylistsQuery();

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
			<div className={s.items}>
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
