import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";
var divStyle = {
    color: 'white',
    padding: '10px',
    fontSize: '12px',
    alignContent: 'flex-end'
};
const GestionCubiculos = () => {
  const [cubiculos, setCubiculos] = useState([]);
  const cubiculosCollectionRef = collection(db, "cubiculos");
  let navigate = useNavigate();
  useEffect(() => {
    const getCubiculos = async () => {
      const data = await getDocs(cubiculosCollectionRef);
      const cubiculos = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
      setCubiculos(cubiculos);
    };
    getCubiculos();
  }, []);
  
  useEffect(() => {
    console.log(cubiculos);

  }, [cubiculos]);
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Gestión de cubiculos
          </h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className=" table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Número de cubículo</th>
                    <th>Capacidad</th>
                    <th>Servicios especiales</th>
                    <th>Disponibilidad</th>

                  </tr>
                </thead>
                <tbody>
                  {cubiculos.map((cubiculos) => (
                    <tr key={cubiculos.id}>
                      <td>{cubiculos.numeroCubiculo}</td>
                      <td>{cubiculos.capacidad}</td>
                      <td>{cubiculos.tipo}</td>
                      <td>{cubiculos.disponible}</td>
                    </tr>
                  ))}
                </tbody>
                <button
                    onClick={() => {navigate('/crearCubiculos',{})}}
                    className="btn btn-primary mb-3 btn-lg"
                    type="button"
                        >
                    Crear cubículo
                </button>
                <h1 style={divStyle}>
                    Leyenda
                </h1>
                <h1 style={divStyle}>
                    Servicio especial 1: 

                        NVDA: programa parlante que lee el texto.
                </h1>
                <h1 style={divStyle}>
  
                    Servicio especial 2: 
                         Lanbda 1.4: software para la edición de textos matemáticos basada en la utilización de ordenadores PC con sistema operativo Microsoft Windows, compatible con el revisor de pantalla.
                </h1>
                <h1 style={divStyle}>
                    Servicio especial 3:

                    JAWS: Ofrece una interoperabilidad entre usuarios ciegos y videntes, mediante la utilización de líneas braille, sintetizadores de voz, pantalla e impresoras, tanto en tinta como braille.
                </h1>
              </table>
            </div>
          </div>
        </div>

      </div>


</Fragment>
  );
};
export default GestionCubiculos;