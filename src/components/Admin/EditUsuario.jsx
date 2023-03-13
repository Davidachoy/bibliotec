import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase_config";

const EditUsuario = () => {
  let navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [carnee, setCarnee] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [estado, setEstado] = useState("");

  const { id } = useParams();
  const update = async (e) => {
    e.preventDefault();
    const usuario = doc(db, "usuarios", id);
    const data = {
      nombre: nombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      carnee: carnee,
      cedula: cedula,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      contraseña: contraseña,
      estado: estado,
    };
    await updateDoc(usuario, data);
    navigate("/gestionEstudiantes");
  };

  const getUsuarioById = async (id) => {
    const usuario = await getDoc(doc(db, "usuarios", id));
    if (usuario.exists()) {
      //console.log(usuario.data())
      setNombre(usuario.data().nombre);
      setApellido(usuario.data().apellido);
      setSegundoApellido(usuario.data().segundoApellido);
      setCarnee(usuario.data().carnee);
      setCedula(usuario.data().cedula);
      setFechaNacimiento(usuario.data().fechaNacimiento);
      setCorreo(usuario.data().correo);
      setContraseña(usuario.data().contraseña);
      setEstado(usuario.data().estado);
    } else {
      console.log("El usuario no existe");
    }
  };

  useEffect(() => {
    getUsuarioById(id);
  });
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Editar Usuario
          </h1>
        </div>
        <div></div>
      </div>
    </Fragment>
  );
};

export default EditUsuario;
