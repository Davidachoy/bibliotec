import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDoc, collection, getDocs,where,query } from "firebase/firestore";
import { db } from "../firebase_config";
import { Form } from 'react-bootstrap';

const checkIfCubiculoExists = async (numeroCubiculo) => {
    const querySnapshot = await getDocs(
      query(collection(db, "cubiculos"), where("numeroCubiculo", "==", numeroCubiculo))
    );
    return !querySnapshot.empty;
  };

  var divStyle = {
    color: 'white',
    padding: '10px',
    fontSize: '20px',
    alignContent: 'flex-end',
    marginLeft: '40px'

};

const checkboxStyle = {
    color: "#fff",
    padding: '20px',
    marginLeft: '-10px',
    alignContent: "center"
}

export function CrearCubiculos(){
    
    

    let navigate = useNavigate();
    const [newNumeroCubiculo, setNumeroCubiculo] = useState("");
    const [newCapacidad, setCapacidad] = useState("");
    const [newTipo, setTipo] = useState("");
    const [newEstado, setEstado] = useState("");
    
    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false
    });
    
    const [cubiculos, setCubiculos] = useState([]);
    const cubiculosCollectionRef = collection(db, "cubiculos");

    function getSelectedOptions(options) {
        let selectedOptions = "";
        for (const key in options) {
          if (options[key]) {
            selectedOptions += key.slice(-1) + ",";
          }
        }
        return selectedOptions.slice(0, -1);
    }

    const crearCubiculo = async () =>{
        const cubiculoExists = await checkIfCubiculoExists(newNumeroCubiculo);

            if (!/^\d+$/.test(newNumeroCubiculo)) {
                alert("El número de cubículo solo debe contener números.");
                return navigate('/crearCubiculos',{});
            }
            if (cubiculoExists) {
                alert("El número de cubículo ya existe en la base de datos.");
                return navigate('/crearCubiculos',{});
            }
            if (newCapacidad<=0 || newCapacidad>10){
                alert("El número de capacidad mínimo es 1 y máximo 10.");
                return navigate('/crearCubiculos',{});
            }
            if(newEstado !== 'Disponible' && newEstado !== 'Mantenimiento' && newEstado !== 'Ocupado'){
                alert("El estado solo puede ser Disponible,Mantenimiento u Ocupado")
                return navigate('/crearCubiculos',{});
            }

            if(newNumeroCubiculo == null || ""){
             alert("El campo de número de cubículo no puede estar vacío")
            return navigate('/crearCubiculos',{});
            }
            const selectedOptions = getSelectedOptions(options);
            if (selectedOptions === "") {
              alert("Por favor seleccione al menos una opción de servicios especiales.");
              return navigate('/crearCubiculos',{});
            }
            else {
        const data = {
            numeroCubiculo: newNumeroCubiculo,
            capacidad: newCapacidad,
            tipo: getSelectedOptions(options),
            disponible: newEstado, 
        };
        

        await addDoc(cubiculosCollectionRef, data);
        navigate('/crearCubiculos',{});
        }
    }

    useEffect(() => {
        const getCubiculos = async () => {
            const data = await getDocs(cubiculosCollectionRef);
            setCubiculos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getCubiculos();
    }, []);

    function CheckboxExample() {
        const [options, setOptions] = useState({
          option1: false,
          option2: false,
          option3: false,
        });
    }
    function handleCheckboxChange(event) {
          const { name, checked } = event.target;
          setOptions({ ...options, [name]: checked });
        }
    const handleCancelar = () => {
        navigate('/crearCubiculo',{});
    }
    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark vh-100">
                <div class="jumbotron justify-content-center w-25 mx-auto my-2">
                    
                    <h1 class="fw-bold mb-5 text-center text-white">Registro de cubículo</h1>

                        <div className="form-floating mx-5 my-2">
                            <input type="int" className="form-control" id="numeroCubiculo" placeholder="Número de cubículo" 
                            onChange={(event) =>{
                                setNumeroCubiculo(event.target.value);
                            }}/>
                            <label for="Número de cubículo">Número de cubículo</label>
                        </div>

                        <div className="form-floating mx-5 my-2">
                            <input type="int" class="form-control" id="capacidad" placeholder="capacidad"
                            onChange={(event) =>{
                                setCapacidad(event.target.value);
                            }}/>
                            <label for="capacidad">Capacidad</label>
                        
                            </div>

                            <div className="form-floating mx-5 my-2">
                            <input type="text" class="form-control" id="estado" placeholder="estado"
                            onChange={(event) =>{
                                setEstado(event.target.value);
                            }}/>
                            <label for="estado">Estado</label>
                            </div>
                            
                        <h1 style={divStyle}>
                                Servicios especiales: 
                        </h1>
                            </div>

                            <Form>
                            <Form.Group style={{marginLeft: '760px'}} >
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 1"
                                name="option1"
                                style={checkboxStyle}
                                checked={options.option1}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 2"
                                name="option2"
                                style={checkboxStyle}
                                checked={options.option2}
                                onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                inline
                                type="checkbox"
                                label="Option 3"
                                name="option3"
                                style={checkboxStyle}
                                checked={options.option3}
                                onChange={handleCheckboxChange}
                                />
                            </Form.Group>
                            </Form>

                            

                        <div className="row g-3 my-2 mb-5">
                            <div className="col">
                                <button onClick={crearCubiculo} className="w-100 btn btn-lg btn-primary">Confirmar</button>
                            </div>
                            <div className="col">
                                <button onClick={handleCancelar} className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                            </div>
                        </div>
                </div>
            

        </Fragment>
    );
    
};
export default CrearCubiculos;