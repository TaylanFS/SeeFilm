import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./filme-info.css";

import api from "../../services/api";

import { toast } from "react-toastify";

function Filme() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [filme, setFilme] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadFilme() {
			await api
				.get(`/movie/${id}`, {
					params: {
						api_key: process.env.REACT_APP_API_KEY,
						language: "pt-BR",
					},
				})
				.then((response) => {
					setFilme(response.data);
					setLoading(false);
				})
				.catch(() => {
					navigate("/", { replace: true });
					return;
				});
		}

		loadFilme();

		return () => {
			console.log("Componente desmontado");
		};
	}, [navigate, id]);

	function salvarFilme() {
		const minhaLista = localStorage.getItem("@primeflix");

		let filmesSalvos = JSON.parse(minhaLista) || [];

		const hasFilm = filmesSalvos.some(
			(filmeSalvo) => filmeSalvo.id === filme.id
		);

		if (hasFilm) {
			toast.warn("Esse filme já foi salvo em sua lista!");
			return;
		}

		filmesSalvos.push(filme);
		localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
		toast.success("Filme salvo com sucesso!");
	}

	if (loading) {
		return (
			<div className="filme-info">
				<h1> Carregando... </h1>
			</div>
		);
	}

	return (
		<div className="filme-info">
			<h1> {filme.title} </h1>
			<img
				src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
				alt={filme.title}
			/>
			<h3> Sinopse </h3>
			<span> {filme.overview} </span>
			<strong> Avaliação: {filme.vote_average} / 10 </strong>
			<div className="area-buttons">
				<button onClick={salvarFilme}> Salvar </button>

				<button>
					<a
						target="_blank"
						rel="external noreferrer"
						href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
					>
						Trailer
					</a>
				</button>
			</div>
		</div>
	);
}

export default Filme;
