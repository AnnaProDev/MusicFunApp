import { MainPage } from "@/app/ui/MainPage/MainPage";
import { PlaylistsPage } from "@/features/playlists/ui/PlaylistsPage/PlaylistsPage";
import { TracksPage } from "@/features/tracks/ui/TracksPage";
import { PageNotFound } from "@/common/components";
import { ProfilePage } from "@/features/auth/ui/ProfilePage/ProfilePage";
import { Route, Routes } from "react-router";

export const Path = {
	Main: "/",
	Playlists: "/playlists",
	Tracks: "/tracks",
	Profile: "/profile",
	NotFound: "*",
} as const;

export const Routing = () => (
	<Routes>
		<Route path={Path.Main} element={<MainPage />} />
		<Route path={Path.Playlists} element={<PlaylistsPage />} />
		<Route path={Path.Tracks} element={<TracksPage />} />
		<Route path={Path.Profile} element={<ProfilePage />} />
		<Route path={Path.NotFound} element={<PageNotFound />} />
	</Routes>
);
