import React from "react";
import { useState, useEffect } from "react";
import {LibraryDetail, LineDetail}  from "./LineDetail";

export const SearchModal = ({id='searchModal', onClose = () => {}, children}) => {
 
  const handleOutsideClick = (e) => {
    if(e.target.id == id) onClose();
  }

  const livros = localStorage.getItem("livros")
  ? JSON.parse(localStorage.getItem("livros"))
  : "";

  const [busca, setBusca] = useState('')

  const [filterLivros, setFilter] = useState([])

  useEffect(()=> {
    setFilter(
      livros.filter(livro => {
        return livro.titulo.toLowerCase().includes(busca.toLowerCase())
      })
    )
  }, [busca])

return (

<div id="searchModal" className="searchModal" onClick={handleOutsideClick}>
  <div className="container">
  <input
        
        type="text"
        className="form-control searchBar"
        placeholder="Pesquisa de livros"
        value={busca}
        onChange={(ev) => setBusca(ev.target.value)}
        
        />
         <table className="table table-striped">
          
          <thead>
            <tr>
              <th>Titulo do Livro</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Preço R$</th>
             
            </tr>
          </thead>
          
          {filterLivros.map((livro, idx) => (
        <LibraryDetail key={idx} {...livro} />
      ))}
        </table>
           
      <button className="close" onClick={onClose}/>

    <div className="content">{children}</div>
  </div>
</div>
   
);
};

export default SearchModal;
