import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme/filme";
import Favoritos from "./pages/Favoritos";

import Error from "./pages/Error";

import Header from "./components/Header";

export function RoutesApp() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/filmes/:id" element={<Filme />} />
				<Route path="/favoritos" element={<Favoritos />} />

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}
