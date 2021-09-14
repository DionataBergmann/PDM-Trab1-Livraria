import React from "react";

const DivMessageErrors = ({ errors }, ano_atual) => {
  return (
    <div
      className={
        (errors.titulo || errors.autor || errors.ano || errors.preco) &&
        "alert alert-danger"
      }
    >
      {errors.titulo && (
        <span>Titulo deve ser preenchido (até 100 caracteres); </span>
      )}
      {errors.autor && <span>Autor deve ser preenchido (até 100 caracteres); </span>}
      {errors.ano && (
        <span>
            Ano deve ser selecionado; 
        </span>
      )}
      {errors.preco && (
        <span>Preço deve ser preenchido (entre 0 e 1000); </span>
      )}
     
    </div>
  );
};

export default DivMessageErrors;