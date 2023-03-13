import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import "./reservations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";


export function ClientReservations() {

    return (
        <Fragment>
            <div class="p-3 mb-2 bg-dark">
                <div className="jumbotron justify-content-center w-50 mx-auto my-2">

                    <h1 className="fw-bold mb-5 text-center text-white">Cubículos Reservados</h1>
                    <div className="reservations">
                    <div className="reservation">
                    <h6>Cubiculo </h6>
                    <h6>Fecha </h6>
                    <h6>Hora</h6>
                    <h6>Capacidad</h6>
                    <input type="radio" value="Cubiculo1" name="cubiculo" />
                    </div>

                    <div className="reservation">
                    <h6>Cubiculo </h6>
                    <h6>Fecha </h6>
                    <h6>Hora</h6>
                    <h6>Capacidad</h6>
                    <input type="radio" value="Cubiculo1" name="cubiculo" />
                    </div>
                    
                    </div>
                    <div className="row g-3 my-2 mb-5">
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-primary">Confirmar</button>
                        </div>
                        <div className="col">
                            <button className="w-100 btn btn-lg btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}