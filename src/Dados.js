
import React from "react";

export const DadosModal = ({id='searchModal', onClose = () => {}, children}) => {
 
  const handleOutsideClick = (e) => {
    if(e.target.id == id) onClose();
  }

  const livros = localStorage.getItem("livros")
  ? JSON.parse(localStorage.getItem("livros"))
  : "";

let precos = 0
let total = 0
let caro = 0
let caroTitulo
  for (const livro of livros) {
    precos += Number(livro.preco)
    if(livro.preco > caro){
      caro = Number(livro.preco)
      caroTitulo = livro.titulo
    }
    total++;
  }

const Media = precos/total

return (

<div id="searchModal" className="searchModal" onClick={handleOutsideClick}>
  <div className="container">

         <table className="table table-striped">
          
          <thead> 
            <tr>
             
              <th>Quantidade Total de Livros</th>
              <th>Preço Médio dos Livros</th>
              <th>Título do Livro mais caro</th>
              <th>Valor do Livro mais caro</th>

            </tr>
            
            <td className="valores">{total}</td>
            <td className="valores">
            {new Intl.NumberFormat('pt-BR', {
                       style: 'currency',
                       currency : 'BRL'
                    }).format(Media)}
            </td>
            <td className="valores">{caroTitulo}</td>
            <td className="valores">
            {new Intl.NumberFormat('pt-BR', {
                       style: 'currency',
                       currency : 'BRL'
                    }).format(caro)}
            </td>
          </thead>
        </table>
  
      <button className="close" onClick={onClose}/>

    <div className="content">{children}</div>
  </div>
</div>
   
);
};
export default DadosModal;
