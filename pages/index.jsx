import { Cards } from "components/Cards";
import Link from "next/link";
import { LayoutDot } from "components/LayoutDot";
import { useQuery, gql } from "@apollo/client";
import IndexStock from "./IndexStock";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Se realiza consulta  para manejar las notificaciones

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

export default function Home() {
  const [count, setCount] = useState(0);
  const [limit, setlimit] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disable, setDisable] = useState(false);
  const [colorLeft, setColorLeft] = useState();
  const [color, setColor] = useState("black");

  const router = useRouter();
  console.log(router);

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
  

  //Query  para consulta
  const { data, loading, refetch } = useQuery(QUERY, {
    variables: {
      obtenerEmpresaEstadoEstado: "Sin gestionar",
    },
  });
  if (loading) return "wait";

  //Tamaño del arreglo para manejar la paginación
  const tamaño = data.obtenerEmpresaEstado.length;

  //Definir valores para mostrar una posicion especifica del arreglo de datos
  let y = count;

  let x = data.obtenerEmpresaEstado[y];

  const obtenerEmpresas = x;
  //Retorno de pagina sin datos

  if (typeof obtenerEmpresas == "undefined") return <IndexStock></IndexStock>;

  return (
    <div>
      <LayoutDot>
        <div>
          <section>
            <ul className="ulista">
              <Link href="/GestionEmpresas">
                <a>
                  <Cards
                    nombreEmpresa="Solicitud de creacion de empresas"
                    mensaje={`${tamaño} solicitudes sin tratar`}
                    logo="fas fa-industry"
                  />
                </a>
              </Link>
              <Cards
                nombreEmpresa="Indicadores"
                mensaje="Visitado por ultima vez: 31/10/2021"
                logo="fas fa-chart-bar"
              />
              <Cards
                nombreEmpresa="Inscripcion de empleados"
                mensaje="3 usuarios sin empresa registrada"
                logo="fa fa-user-tie"
              />
              <Cards
                nombreEmpresa="gestión de usuarios"
                mensaje="532 usuarios activos en la plataforma"
                logo="fa fa-users-cog"
              />
            </ul>
          </section>
        </div>
      </LayoutDot>
    </div>
  );
}
