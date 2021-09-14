import React from "react";


export const LineDetail = (props) => {

    return (
      <tr key={props.id} data-id={props.id} onClick={props.handleClick}>
        
        <td>{props.titulo}</td>
        <td>{props.autor}</td>
        <td>{props.ano}</td>
        <td>
        {new Intl.NumberFormat('pt-BR', {
                       style: 'currency',
                       currency : 'BRL'
                    }).format(props.preco)}

        </td>
        <td>
          <i className="far fa-edit text-success mr-2" title="Alterar"></i>
          <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
        </td>
      </tr>
  );
};

export const LibraryDetail = (props) => {
  const { titulo, autor, ano, preco } = props;
 
  return (
    <tr className="SearchList" key={props.idx} data-id={props.idx} onClick={props.handleClick}>
    <td>{titulo}</td>
    <td>{autor}</td>
    <td>{ano}</td>
    <td> {new Intl.NumberFormat('pt-BR', {
                       style: 'currency',
                       currency : 'BRL'
                    }).format(preco)}</td>
  
  </tr>
  );
};

export default LineDetail;






