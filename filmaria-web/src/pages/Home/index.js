import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css';

export default function Home() {
 
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarFilmes() {
            try{
                const response = await api.get('r-api/?api=filmes');
                setFilmes(response.data);
            } catch(erro){
                console.error('Deu erro ao ler os filmes', erro);
            }
            finally{
                setLoading(false);
            }
        }

        carregarFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>  
            )  
}
        return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => (
                    <article key={filme.id}>
                        <strong>{filme.nome}</strong>
                        <img src={filme.foto} alt={`Foto do filme' ${filme.nome}`} />
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>

                    </article>
              ))}
            </div>
        </div>    
        
    ) 
}