import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import {NotificationContainer} from 'react-notifications';
import DivMessageErrors from "./DivMessageErrors";
import NotificationsAlert from "./NotificationsAlert";

const FormLivros = forwardRef(({atualiza, lista}, ref) => {
  const {register, handleSubmit, formState: { errors }, setValue} = useForm();
  const [alterar, setAlterar] = useState(false);
  const [data_id, setData_id] = useState(0);

  const onSubmit = (data) => {

    data.id = new Date().getTime();
    console.log(data);

    const livros = localStorage.getItem("livros")
      ? JSON.parse(localStorage.getItem("livros"))
      : "";

    localStorage.setItem("livros", JSON.stringify([...livros, data]));

    atualiza([...lista, data]);

    setValue("titulo", "");
    setValue("autor", "");
    setValue("ano", "");
    setValue("preco", "");

  }

  const onUpdate = data => {
    
    const livros = JSON.parse(localStorage.getItem("livros"));

    const livros2 = [];

    for (const livro of livros) {
      if (livro.id === data_id) {
        data.id = data_id;
        livros2.push(data);  
      } else {
        livros2.push(livro);
      }
    }

    localStorage.setItem("livros", JSON.stringify(livros2));

    atualiza(livros2);

    setValue("titulo", "");
    setValue("autor", "");
    setValue("ano", "");
    setValue("preco", "");

    setAlterar(false);

    NotificationsAlert("success", "Atenção!", "Livro Alterado com Sucesso");
  }

  const onLoadData = ({id, titulo, autor, ano, preco}) => {
    setValue("titulo", titulo);
    setValue("autor", autor);
    setValue("ano", ano);
    setValue("preco", preco);

    setAlterar(true);
    setData_id(id);
  }

  useImperativeHandle(ref, () => ({
    onLoadData
    
  }));

  return (
    
    <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Titulo:</span>
        </div>
        <input
          type="text"
          className="form-control"
          {...register("titulo", {
            required: true,
            minLength: 2,
            maxLength: 100,
          })}
          autoFocus
        />
  
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Autor:</span>
        </div>
        <input
          className="form-control"
          {...register("autor", {
            required: true,
           
          })}
        />

      <div className="input-group-prepend">
          <span className="input-group-text">Ano:</span>
        </div>
        <select
          className="form-control"
          {...register("ano", {
            required: true,
          })}
        >
          <option value="">-- Selecione o Ano --</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>x
          <option value="2013">2013</option>x
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
      </div>

        <div className="input-group-prepend">
          <span className="input-group-text">Preço R$:</span>
        </div>
        <input
          type="number"
          className="form-control"
          {...register("preco", {
            required: true,
            min: 0,
            max: 100000,
          })}
        />
        <div className="input-group-append">
          <input
            type="submit"
            className={alterar ? "d-none" : "btn btn-primary"}
            value="Adicionar"
          />
          <input
            type="submit"
            className={alterar ? "btn btn-success" : "d-none"}
            value="Alterar"
          />
        </div>
        
      </div>

      <DivMessageErrors errors={errors}/>    
      <NotificationContainer/>
    
    </form>
    
  );
});


export default FormLivros;
