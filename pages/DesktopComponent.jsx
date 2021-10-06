import React from "react";
import { LayoutDot } from "components/LayoutDot";
import Link from "next/link";
import Modals from "components/Modals";
import { Formik } from "formik";
import { useQuery, gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import DescktopStock from "./DescktopStock";

const QUERY = gql`
  query Query($obtenerEmpresaEstadoEstado: String!) {
    obtenerEmpresaEstado(estado: $obtenerEmpresaEstadoEstado) {
      nombre
      razonSocial
      tipoID
      identificacion
      numeroEmpleados
      logo
      estado
    }
  }
`;

const ACTUALIZAR = gql`
  mutation Mutation(
    $actualizarEmpresaIdentificacion: String!
    $actualizarEmpresaInput: EstadoInput
  ) {
    actualizarEmpresa(
      identificacion: $actualizarEmpresaIdentificacion
      input: $actualizarEmpresaInput
    ) {
      nombre
    }
  }
`;

const DesktopComponent = () => {
  //estados contador de posiciones en el arreglo, color de flechas next y prev, activar o desactivar botones next y prev y estado de empresa

  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disable, setDisable] = useState(false);
  const [colorLeft, setColorLeft] = useState();
  const [color, setColor] = useState("black");
  const [estado, setEstado] = useState("por confirmar");

  //defimir el limite para la paginacion

  useEffect(() => {
    if (count == 0) {
      setlimit(tamaño);
    }
  });

  //Use effect para desactivar o activar botones de paginacion
  useEffect(() => {
    if (count == 0) {
      setDisable(true);
      setColorLeft("text-gray-500");
    }

    if (count != 0) {
      setDisable(false);
      setColorLeft("Black");
    }

    if (count == limit - 1) {
      setDisableNext(true);
      setColor("text-gray-500");
    }

    if (count != limit - 1) {
      setDisableNext(false);
      setColor("Black");
    }
  });

  //Mutation actualizar

  const [actualizarEmpresa] = useMutation(ACTUALIZAR, {
    //utilizar refetch para volver a realizar la consulta despues de la mutacion
    refetchQueries: [QUERY],
  });

  //Query  para consulta
  const { data, loading, refetch } = useQuery(QUERY, {
    variables: {
      obtenerEmpresaEstadoEstado: "Sin gestionar",
    },
  });
  if (loading) return "Consultado en la base de datos...";

  console.log(data.obtenerEmpresaEstado[0]);

  //Tamaño del arreglo para manejar la paginación
  const tamaño = data.obtenerEmpresaEstado.length;

  //Definir valores para mostrar una posicion especifica del arreglo de datos
  let y = count;

  let x = data.obtenerEmpresaEstado[y];

  const obtenerEmpresas = x;

  //Retorno de pagina sin datos
  if (typeof obtenerEmpresas == "undefined")
    return <DescktopStock></DescktopStock>;

  return (
    <div>
      <LayoutDot>
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
              <Formik
                enableReinitialize
                initialValues={{
                  nombre: obtenerEmpresas.nombre,
                  razonSocial: obtenerEmpresas.razonSocial,
                  tipoID: obtenerEmpresas.tipoID,
                  identificacion: obtenerEmpresas.identificacion,
                  numeroEmpleados: obtenerEmpresas.numeroEmpleados,
                  logo: obtenerEmpresas.logo,
                  estado: estado,
                }}
                onSubmit={async (valores) => {
                  console.log(valores);
                  console.log(valores.estado);
                  const { identificacion, estado } = valores;

                  try {
                    const { data } = await actualizarEmpresa({
                      variables: {
                        actualizarEmpresaIdentificacion: identificacion,
                        actualizarEmpresaInput: { estado },
                      },
                    });

                    console.log(data);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit} id="Formulario">
                      {/*  Botones de aceptar y rechazar */}
                      <section className="gestionar">
                        <button
                          className=" flex border-solid m-10 mt-3  border-1 border-gray-500 rounded-lg  p-2 cursor-pointer botonesGestion"
                          onClick={() => setEstado("Aceptada")}
                          type="submit"
                        >
                          <i className="fas fa-check-circle fa-2x ml-1 check"></i>{" "}
                          <span className="flex font-black ml-1">
                            Aprobar Empresa
                          </span>
                        </button>
                        <button
                          className=" flex border-solid m-10 mt-3  border-1 border-gray-500 rounded-lg  p-2 cursor-pointer botonesGestion"
                          onClick={() => setEstado("No Aceptada")}
                        >
                          <i className="fas fa-times-circle text-red-600 fa-2x ml-1"></i>{" "}
                          <span className="flex font-black ml-1">
                            Rechazar Empresa
                          </span>
                        </button>
                      </section>
                      {/* contenedor de logo de empresas */}
                      <section className="contenedorLogoEmpresa flex mt-20 m-auto ">
                        {" "}
                        <Image
                          src={props.values.logo}
                          alt="logo"
                          width={250}
                          height={80}
                        />
                      </section>

                      {/* formulario input */}

                      <section className="m-auto grid grid-cols-2 ml-16">
                        <section>
                          <label className="text-gray-600 m-9">
                            Nombre de la empresa
                          </label>
                          <input
                            className="border-opacity-50 m-10 mt-3 border-b-2 border-gray-500 font-bold"
                            id="nombre"
                            value={props.values.nombre}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          ></input>
                        </section>
                        <section>
                          <label className="text-gray-600 m-9">
                            Razón social
                          </label>
                          <input
                            className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500 font-bold"
                            id="razonSocial"
                            value={props.values.razonSocial}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          ></input>
                        </section>
                        <section>
                          <label className="text-gray-600 m-9">
                            Tipo de identificación
                          </label>
                          <input
                            className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500 font-bold"
                            id="tipoID"
                            value={props.values.tipoID}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          ></input>
                        </section>
                        <section>
                          <label className="text-gray-600 m-9">
                            Identificación
                          </label>
                          <input
                            className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500 font-bold"
                            id="identificacion"
                            type="String"
                            value={props.values.identificacion}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          ></input>
                        </section>

                        <section>
                          <label className="text-gray-600 m-9">
                            # de empleados
                          </label>
                          <input
                            className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500 font-bold"
                            id="numeroEmpleados"
                            type="string"
                            value={props.values.numeroEmpleados}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          ></input>
                        </section>
                        <section>
                          <input
                            className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500 font-bold"
                            id="estado"
                            value={props.values.estado}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="hidden"
                          ></input>
                        </section>
                      </section>
                    </form>
                  );
                }}
              </Formik>
              <section></section>
              <Modals></Modals>
            </section>
          </section>
        </section>

        {/* Botones de navegacion paginacion formulario */}

        <section className="botonesControl align-middle justify-center flex">
          <button disabled={disable} onClick={() => setCount(count - 1)}>
            <i className={`fas fa-chevron-circle-left ${colorLeft} fa-2x`}>-</i>
          </button>
          <span className="text-gray-500 p-8 text-2xl">
            {" "}
            Empresa {count + 1} de {tamaño} pendiente de aprobación
          </span>
          <button
            disabled={disableNext}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <i className={`fas fa-chevron-circle-right ${color} fa-2x`}>+</i>
          </button>
        </section>
      </LayoutDot>
    </div>
  );
};

export default DesktopComponent;
