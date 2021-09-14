import React, { useState, useEffect, useRef } from 'react'
import FormLivros from './FormLivros';
import LineDetail from './LineDetail';
import SideLivros from './SideLivros';
import "./table.css";
import  SearchModal from './SearchModal';
import DadosModal from './Dados'

const AppBody = () => {
  
  const [lista, setLista] = useState([]);
  const childRef = useRef();

  useEffect(() => {
    setLista(localStorage.getItem("livros")
      ? JSON.parse(localStorage.getItem("livros"))
      : []);
  }, []); 

  const handleClick = e => {
    
    const tr = e.target.closest("tr");
    const id = Number(tr.getAttribute("data-id"));
    
    if (e.target.classList.contains("fa-edit")) {      
     
      const livroAlt = {}
      livroAlt.titulo = tr.cells[0].innerText;
      livroAlt.autor = tr.cells[1].innerText;
      livroAlt.ano = tr.cells[2].innerText;
      livroAlt.preco = tr.cells[3].innerText;
      livroAlt.id = id;

      childRef.current.onLoadData(livroAlt);

    } else if (e.target.classList.contains("fa-minus-circle")) {
    
      const titulo = tr.cells[0].innerText;

      if (window.confirm(`Confirma a exclusão do livro "${titulo}"?`)) {
      
        const novaLista = lista.filter((livro) => {return  livro.id !== id});

        localStorage.setItem("livros", JSON.stringify(novaLista));

        // atualiza a tabela (refresh)
        setLista(novaLista);
      }
    }
  }

  const atualizaLista = (dados) => {
    setLista(dados);
  }
 
const [isModalVisible, setIsModalVisible] = useState(false)

const [isModalDadosVisible, setIsModalDadosVisible] = useState(false)

  return (
    <div className="row">
      <SideLivros />
      
    
      <div className="col-sm-9 mt-2">
        <FormLivros atualiza={atualizaLista} lista={lista} ref={childRef}/>

        <button className="Botao" onClick={() => setIsModalVisible(true)}>Pesquisar</button>
      {isModalVisible ? (

      <SearchModal onClose={() => setIsModalVisible(false)}>
       
        </SearchModal> 

      ) : null}

        <button className="Botao" onClick={() => setIsModalDadosVisible(true)}>Dados</button>
      {isModalDadosVisible ? (

      <DadosModal onClose={() => setIsModalDadosVisible(false)}>
       
        </DadosModal> 

      ) : null}

        <table className="table table-striped">
          
          <thead>
            <tr>
              <th>Titulo do Livro</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Preço R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody >
         
            {lista.map((livro) => {
              livro.handleClick = handleClick;
              return (LineDetail(livro));
             
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppBody;