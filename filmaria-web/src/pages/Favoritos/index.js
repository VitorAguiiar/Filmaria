import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './favoritos.css';

export default function Favoritos() {

    const [ filmes, setFilmes]   = useState([]);
    const [loading, setLoading]  = useState(true);

    useEffect(() => {
        setLoading(true);
        try{
            const minhaLista = localStorage.getItem("@primeflix");
            setFilmes(JSON.parse(minhaLista));
        }catch (error) {
            console.error("Erro ao carregar os filmes", error);
            toast.error("Erro ao carregar os filmes");
            setFilmes([]);
        } finally{
            setLoading(false);
        }
    }, []);

    function Deletar(id) {
        const confrima = window.confirm("Deseja realmente deletar esse filme?"); 
        
        if (!confrima) {
            return;
        }
        try{
            const filmeFiltrados = filmes.filter((item) => item.id !== id);
            setFilmes(filmeFiltrados);
            localStorage.setItem("@primeflix", JSON.stringify(filmeFiltrados));
            toast.success("Filme deletado com sucesso");
        }   
         catch (error) {
            console.error("Erro ao deletar filme", error);
            toast.error("Erro ao deletar filme");
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <h2>Carregando favoritos...</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="filmes-container">
                <h2>Filmes favoritos</h2>
                {filmes.length === 0 && <span className="lista-vazia">Nenhum filme foi salvo</span>}
                <ul>
                    {filmes.map((item) => (
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div className="acoes">
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => Deletar(item.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}