import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";
import defaultCover from "@/assets/thumbnail-audio.png";
import { useUploadPlaylistCovertMutation } from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistItem.module.css";

type Props = {
	playlist: PlaylistData;
	deletePlaylist: (playlistId: string) => void;
	editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({
	playlist,
	editPlaylist,
	deletePlaylist,
}: Props) => {
	const originalCover = playlist.attributes.images.main?.find(
		(img) => img.type === "original",
	);
	const src = originalCover ? originalCover?.url : defaultCover;

	const [uploadPlaylistCover] = useUploadPlaylistCovertMutation();

	const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const maxSize = 1024 * 1024; // 1 MB
		const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

		if (!allowedTypes.includes(file.type)) {
			alert("Only JPEG, PNG or GIF images are allowed");
			return;
		}

		if (file.size > maxSize) {
			alert(
				`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`,
			);
			return;
		}

			uploadPlaylistCover({ playlistId: playlist.id, file });

	};

	return (
		<div>
			<img src={src} alt="cover" width={"100px"} className={s.cover} />
			<input type="file" accept="image/jpeg,image/png,image/gif" name="file" id="image" onChange={handleCoverUpload} />
			<div>title: {playlist.attributes.title}</div>
			<div>description: {playlist.attributes.description}</div>
			<div>userName: {playlist.attributes.user.name}</div>
			<button onClick={() => deletePlaylist(playlist.id)}>Delete</button>
			<button onClick={() => editPlaylist(playlist)}>Edit</button>
		</div>
	);
};
