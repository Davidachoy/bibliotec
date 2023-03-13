import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {db} from './firebase_config';
import { addDoc, collection, getDocs } from "firebase/firestore";


export function Register(){
    //useNavigate es para poder navegar a otra ventana
    let navigate = useNavigate();

    // Todos los inputs de la pagina de registro
    // Todos estos datos se envian al firebase para crear el usuario
   
    const [newNombre, setNombre] = useState("");
    const [newApellido, setApellido] = useState("");
    const [newSegundoApellido, setSegundoApellido] = useState("");
    const [newCarnee, setCarnee] = useState("");
    const [newCedula, setCedula] = useState("");
    const [newFechaNacimiento, setFechaNacimiento] = useState("");
    const [newCorreo, setCorreo] = useState("");
    const [newContraseña, setContraseña] = useState("");


    const [usuarios, setUsuarios] = useState([]);
    const usuariosCollectionRef = collection(db, "usuarios");

    const crearUsuario = async () =>{
        const adminflag = false;
        const eliminadoflag = false;
        const data = {
            nombre: newNombre,
            apellido: newApellido,
            segundoApellido: newSegundoApellido,
            carnee: newCarnee,
            cedula: newCedula,
            fechaNacimiento: newFechaNacimiento,
            correo: newCorreo,
            contraseña: newContraseña,
            admin: adminflag,
            eliminado: eliminadoflag,
            estado:"Activo"
        };

        await addDoc(usuariosCollectionRef, data);
        navigate('/',{});
    }

    useEffect(() => {
        const getUsuarios = async () => {
            const data = await getDocs(usuariosCollectionRef);
            setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getUsuarios();
    }, []);

    
    const handleCancelar = () => {
        navigate('/',{});
    }
    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark">
                <div class="jumbotron justify-content-center w-25 mx-auto my-2">
                    
                    <h1 class="fw-bold mb-5 text-center text-white">Registro de usuario</h1>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" className="form-control" id="nombre" placeholder="Nombre" 
                            onChange={(event) =>{
                                setNombre(event.target.value);
                            }}/>
                            <label for="nombre">Nombre</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido"
                            onChange={(event) =>{
                                setApellido(event.target.value);
                            }}/>
                            <label for="apellido">Apellido</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="segundoApellido" placeholder="SegundoApellido"
                            onChange={(event) =>{
                                setSegundoApellido(event.target.value);
                            }}/>
                            <label for="segundoApellido">Segundo Apellido</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="carnee" placeholder="Carnee"
                            onChange={(event) =>{
                                setCarnee(event.target.value);
                            }}/>
                            <label for="carnee">Carné</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="cedula" placeholder="Cedula"
                            onChange={(event) =>{
                                setCedula(event.target.value);
                            }}/>
                            <label for="cedula">Cedula</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="date" class="form-control" id="fechaNacimiento" placeholder="FechaNacimiento"
                            onChange={(event) =>{
                                setFechaNacimiento(event.target.value);
                            }}/>
                            <label for="fechaNacimiento">Fecha de Nacimiento</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="email" class="form-control" id="correo" placeholder="Correo"
                            onChange={(event) =>{
                                setCorreo(event.target.value);
                            }}/>
                            <label for="correo">Correo Estudiantil</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="password" class="form-control" id="contraseña" placeholder="Contraseña"
                            onChange={(event) =>{
                                setContraseña(event.target.value);
                            }}/>
                            <label for="contraseña">Contraseña</label>
                        </div>

                        <div className="row g-3 my-2 mb-5">
                            <div className="col">
                                <button onClick={crearUsuario} className="w-100 btn btn-lg btn-primary">Confirmar</button>
                            </div>
                            <div className="col">
                                <button onClick={handleCancelar} className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                            </div>
                        </div>
                </div>
            </div>

        </Fragment>
    )

}