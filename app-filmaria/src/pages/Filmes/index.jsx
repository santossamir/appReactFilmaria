import {useEffect, useState} from 'react';
import {useParams, useHistory}from 'react-router-dom';
import './filme-info.css';
import api  from '../../services/api';

export default function Filme(){

    const {id} = useParams();
    const history = useHistory();

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilmes(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
               history.replace('/');
               return; 
            }
        
            setFilmes(response.data);
            setLoading(false);
        }

        loadFilmes();

    }, [history, id]);

    function salvarFilme(){

        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo)=> filmeSalvo.id === filmes.id)

        if(hasFilme == true){
            alert('Você já possui esse filme salvo.');
            return;
        }

        filmesSalvos.push(filmes);

        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        alert('Filme salvo com sucesso!');
    }

    if(loading == true){
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filmes.nome}</h1>
            <img src={filmes.foto} alt={filmes.nome}/>
            <h3>Sinopse</h3>
            {filmes.sinopse}
            <div>
                <button onClick={salvarFilme} >Salver</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filmes.nome} Trailer`}>Trailer</a>
                </button>
            </div>
            
        </div>
    )
}