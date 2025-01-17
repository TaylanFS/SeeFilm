import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./home.css";

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=d8b65021204f9326d7b9d6d5255e747c&language=pt-BR

function Home() {
	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function loadFilmes() {
			const response = await api.get("movie/now_playing", {
				params: {
					api_key: "d8b65021204f9326d7b9d6d5255e747c",
					language: "pt-BR",
					page: 1,
				},
			});

			setFilmes(response.data.results.slice(0, 12));
			setLoading(false);
		}

		loadFilmes();
	}, []);

	if (loading) {
		return (
			<div className="loading">
				<h2> Carregando... </h2>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="lista-filmes">
				{filmes.map((filme) => {
					return (
						<article key={filme.id}>
							<strong> {filme.title} </strong>

							<img
								src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
								alt={filme.title}
							/>

							<Link to={`/filmes/${filme.id}`}> Acessar </Link>
						</article>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
