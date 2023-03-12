import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

export function AdminMenu() {
  return (
    <Fragment>
      <div class="p-3 mb-2 bg-dark vh-100">
        <div className="jumbotron justify-content-center mx-auto my-2">
          <h1 className="fw-bold mb-5 text-center text-white">
            Pagina de Administrador
          </h1>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary mb-3 btn-lg" type="button">
              Gestión de cubículos
            </button>
            <button className="btn btn-primary mb-3 btn-lg" type="button">
              Gestión de estudiantes
            </button>
            <button className="btn btn-primary mb-3 btn-lg" type="button">
              Gestión de tiempos de uso
            </button>
            <button className="btn btn-primary mb-3 btn-lg" type="button">
              Gestión de asignaciones de cubículo
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
