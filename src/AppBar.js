import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import './AppBar.css'
import Conecta from './Conecta';
import { ClienteContext } from './ClienteContext';
import { useHistory } from "react-router-dom";

const AppBar = () => {

  const atualizaLista = (dados) => {
    setLista(dados);
  }
  
  const [lista, setLista] = useState([]);
  const [livros, setLivros] = useState([]);

  const getLivros = async () => {
    const lista = await Conecta.get("livros");
      //  console.log(lista);
    setLivros(lista.data);
  };

  useEffect(() => {
    getLivros();
  }, []);

  const [isModalDadosVisible, setIsModalDadosVisible] = useState(false)

  const cliente = useContext(ClienteContext);
  let history = useHistory();

  const loginLogout = () => {
    cliente.setDados({id: null, nome: "", token: ""});
    history.push("/login")
  }

  return (

    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <Link className="navbar-brand" to="/">
        <h1 className="text-white">
          Livros
        </h1>
        <h4 className="text-white font-italic">
          Sistema de Cadastro e Manutenção de Livros
        </h4>
        </Link>
        <li className="nav-item">
          <span className="nav-link" onClick={loginLogout}>
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.dados.nome ? cliente.dados.nome + " (sair)" : "(identifique-se)"}
          </span>
          
        </li>
      </nav>
    
    
  );
}

export default AppBar;