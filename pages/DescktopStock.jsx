import React from "react";
import { Layout } from "components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";

const DescktopStock = () => {
  //estados contador de posiciones en el arreglo, color de flechas next y prev, activar o desactivar botones next y prev y estado de empresa

  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disable, setDisable] = useState(false);
  const [colorLeft, setColorLeft] = useState();
  const [color, setColor] = useState("black");
  const [estado, setEstado] = useState("por confirmar");

  //defimir el limite para la paginacion

  //Use effect para desactivar o activar botones de paginacion
  useEffect(() => {
    if (count == 0) {
      setDisable(true);
      setColorLeft("text-gray-500");
    }

    if (count == limit) {
      setDisableNext(true);
      setColor("text-gray-500");
    }
  });

  return (
    <div>
      <Layout>
        {/* contenedores global, de formulario y de imagen logo*/}

        <section className="mt-10 ml-10">
          <Link href="/">
            <a>
              <span className="font-bold text-blue-500 text-2xl">
                Administracion /
              </span>
            </a>
          </Link>
          <span className="font-bold text-2xl"> Aprobación de empresas</span>
        </section>

        <section className="contenedor mt-20 m-auto flex flex-col">
          <section className="formContenedor p- m-auto">
            <section className="contenedorDatos  m-auto">
              {/* 
              componente formik para manejar valores en el formulario, se usa enablereinitialize para reinicar los datos en el formulario
              a medida que lo reuiera, se definen como valores iniciales los valores que vienen en el arreglo pero se
              crea un usestate para cambiar el valor del estado con el boton */}

              <form id="Formulario">
                {/*  Botones de aceptar y rechazar */}
                <section className="gestionar">
                  <button className=" flex border-solid m-10 mt-3  border-1 border-gray-500 rounded-lg  p-2 cursor-pointer botonesGestion">
                    <i className="fas fa-check-circle fa-2x ml-1 text-gray-500"></i>{" "}
                    <span className="flex font-black ml-1">
                      Aprobar Empresa
                    </span>
                  </button>
                  <button className=" flex border-solid m-10 mt-3  border-1 border-gray-500 rounded-lg  p-2 cursor-pointer botonesGestion">
                    <i className="fas fa-times-circle text-gray-500 fa-2x ml-1"></i>{" "}
                    <span className="flex font-black ml-1">
                      Rechazar Empresa
                    </span>
                  </button>
                </section>
                {/* contenedor de logo de empresas */}
                <section className="contenedorLogoEmpresa flex mt-20 m-auto ">
                  {" "}
                </section>

                {/* formulario input */}

                <section className="m-auto grid grid-cols-2 ml-16">
                  <section>
                    <label className="text-gray-600 m-9">
                      Nombre de la empresa
                    </label>
                    <input
                      className="border-opacity-50 m-10 mt-3 border-b-2 border-gray-500"
                      id="nombre"
                    ></input>
                  </section>
                  <section>
                    <label className="text-gray-600 m-9">Razón social</label>
                    <input
                      className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                      id="razonSocial"
                    ></input>
                  </section>
                  <section>
                    <label className="text-gray-600 m-9">
                      Tipo de identificación
                    </label>
                    <input
                      className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                      id="tipoID"
                    ></input>
                  </section>
                  <section>
                    <label className="text-gray-600 m-9">Identificación</label>
                    <input
                      className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                      id="identificacion"
                      type="String"
                    ></input>
                  </section>

                  <section>
                    <label className="text-gray-600 m-9"># de empleados</label>
                    <input
                      className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                      id="numeroEmpleados"
                      type="string"
                    ></input>
                  </section>
                  <section>
                    <input
                      className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                      id="estado"
                      type="hidden"
                    ></input>
                  </section>
                </section>
              </form>

              <section></section>
            </section>
          </section>
        </section>

        {/* Botones de navegacion paginacion formulario */}

        <section className="botonesControl align-middle justify-center flex">
          <button disabled={disable} onClick={() => setCount(count - 1)}>
            <i className={`fas fa-chevron-circle-left text-gray-500 fa-2x`}>
              -
            </i>
          </button>
          <span className="text-gray-500 p-8 text-2xl">
            {" "}
            No tiene empresas pendiente de aprobación
          </span>
          <button
            disabled={disableNext}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <i className={`fas fa-chevron-circle-right text-gray-500 fa-2x`}>
              +
            </i>
          </button>
        </section>
      </Layout>
    </div>
  );
};

export default DescktopStock;
