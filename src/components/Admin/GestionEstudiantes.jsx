import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addDoc,
  collection,
  updateDoc ,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase_config";

const GestionEstudiantes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const usuariosCollectionRef = collection(db, "usuarios");
  const getUsuarios = async () => {
    const data = await getDocs(usuariosCollectionRef);
    const usuarios = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((usuario) => !usuario.admin && !usuario.eliminado);
    setUsuarios(usuarios);
  };
  useEffect(() => {
    getUsuarios();
  }, []);

  const deleteUsuario = async (id) => {
    const confirmed = window.confirm("¿Estás seguro que quieres eliminar este usuario?");
    if (confirmed) {
    const usuaroDoc = doc(db, "usuarios", id);
    await updateDoc(usuaroDoc, { eliminado: true });
    getUsuarios();}
  };

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Gestión de estudiantes
          </h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <table className=" table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Carnee</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                    <th>Ver Historial</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.apellido}</td>
                      <td>{usuario.carnee}</td>
                      <td>{usuario.estado}</td>
                      <td className="text-left">
                        <Link to={`/edit/${usuario.id}`}>
                          <i
                            className="fa-solid fa-pen-to-square fa-2x"
                            style={{ color: "white" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteUsuario(usuario.id);
                          }}
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default GestionEstudiantes;
