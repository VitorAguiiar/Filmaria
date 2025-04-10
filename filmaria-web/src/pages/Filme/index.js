import { useState, useEffect } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import './filme.css';

export default function Filme() {
    //vamos pegar o id do filme na URL
    const { id } = useParams();

    //Vamos usar o useavigate (hook) para navegação
    const navigate = useNavigate();

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function lerFilme(){
            setLoading(true);
            try{
                const reponse = await api.get(`r-api/?api=filmes/${id}`);
                setFilme(reponse.data);
            } catch(erro){
                console.error('filme não encontrado, Você sera redirecionado para a home Page');
                navigate('/', { replace: true });
            } finally{
                setLoading(false);
            }
        }
        lerFilme();
    }, [id, navigate]);

    function salvarFilme(){
        if(!filme) return;

        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const temFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
        
        if(temFilme){
            toast.warn('Esse filme já está na sua lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso');
}   
    if(loading){
        return(
            <div className="loading-container">
                <h2>Carregando detalhes do filme...</h2>
            </div>  
            );
    }
    //vamos exibir os detalhes do filme
    return(
        <div className="container">
        <div className="filme-info">
            <article>
                <h1>{filme.nome}</h1>
                <img src={filme.foto} alt={`Foto do filme ${filme.nome}`} />
                <h3>Sinopse</h3>
                <p>{filme.sinopse}</p>

                <div className="botoes"> 
                    <button onClick={salvarFilme}>Salvar</button>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome + 'trailer')}`} className="botao-link">Trailer</a>
                </div>
            </article>
        </div>
    </div>
    )
}