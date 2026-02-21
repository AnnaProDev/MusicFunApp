import type { Images } from "@/common/types";
import type { ChangeEvent } from "react";
import { useUploadPlaylistCoverMutation, useDeletePlaylistCoverMutation } from "@/features/playlists/api/playlistsApi";
import s from "./PlaylistCover.module.css";
import defaultCover from "@/assets/thumbnail-audio.png";
import { toast } from "react-toastify";

type Props = {
	playlistId: string;
	images: Images;
};

export const PlaylistCover = ({ images, playlistId }: Props) => {
	const originalCover = images.main?.find((img) => img.type === "original");
	const src = originalCover ? originalCover?.url : defaultCover;

	const [uploadCover] = useUploadPlaylistCoverMutation();
	const [deleteCover] = useDeletePlaylistCoverMutation();

	const handleUploadCover = (event: ChangeEvent<HTMLInputElement>) => {
		const maxSize = 1024 * 1024; // 1 MB
		const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

		const file = event.target.files?.length && event.target.files[0];
		if (!file) return;

		if (!allowedTypes.includes(file.type)) {
			toast("Only JPEG, PNG or GIF images are allowed", { type: "error" , theme: "colored"});
		}

		if (file.size > maxSize) {
			toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, { type: "error" , theme: "colored"});
		}

		uploadCover({ playlistId, file });
	};

	const handleRemoveCover = () => deleteCover(playlistId);

	return (
		<div>
			<img src={src} alt={"cover"} width={"100px"} className={s.cover} />
			<input
				type="file"
				accept="image/jpeg,image/png,image/gif"
				onChange={handleUploadCover}
			/>
			{originalCover && (
				<button onClick={() => handleRemoveCover()}>delete cover</button>
			)}
		</div>
	);
};
