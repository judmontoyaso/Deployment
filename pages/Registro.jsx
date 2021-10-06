import React from "react";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";

const EMPRESA = gql`
  mutation Mutation($nuevaEmpresaInput: empresaInput) {
    nuevaEmpresa(input: $nuevaEmpresaInput) {
      nombre
      razonSocial
      tipoID
      identificacion
      numeroEmpleados
      logo
    }
  }
`;

const Registro = () => {
  const router = useRouter();
  const [nuevaEmpresa] = useMutation(EMPRESA);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      identificacion: "",
      razonSocial: "",
      tipoID: "",
      numeroEmpleados: "",
      logo: "",
    },

    onSubmit: async (valores) => {
      const {
        nombre,
        razonSocial,
        tipoID,
        identificacion,
        numeroEmpleados,
        logo,
      } = valores;

      try {
        const { data } = await nuevaEmpresa({
          variables: {
            nuevaEmpresaInput: {
              nombre,
              razonSocial,
              tipoID,
              identificacion,
              numeroEmpleados,
              logo,
            },
          },
        });
        router.push("/")
        console.log(valores);
      } catch (error) {
        console.log(error);
      }
      console.log("enviando");
      console.log(valores);
    },
  });

  return (
    <div>
      <Layout>
        <form onSubmit={formik.handleSubmit}>
          {/* formulario input */}

          <section className="m-auto grid grid-cols-2 ml-16">
            <section>
              <label className="text-gray-600 m-9">Nombre de la empresa</label>
              <input
                className="border-opacity-50 m-10 mt-3 border-b-2 border-gray-500"
                id="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </section>
            <section>
              <label className="text-gray-600 m-9">Razón social</label>
              <input
                className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                id="razonSocial"
                value={formik.values.razonSocial}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </section>
            <section>
              <label className="text-gray-600 m-9">
                Tipo de identificación
              </label>
              <input
                className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                id="tipoID"
                value={formik.values.tipoID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </section>
            <section>
              <label className="text-gray-600 m-9">Identificación</label>
              <input
                className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                id="identificacion"
                type="String"
                value={formik.values.identificacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </section>
            <section>
              <label className="text-gray-600 m-9"># de empleados</label>
              <input
                className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                id="numeroEmpleados"
                type="number"
                value={formik.values.numeroEmpleados}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </section>

            <section>
              <label className="text-gray-600 m-9">Logo</label>
              <input
                className="border-opacity-50 m-10 mt-3  border-b-2 border-gray-500"
                id="logo"
                value={formik.values.logo}
                onChange={formik.handleChange}
              ></input>
            </section>
            <input
              className=" flex border-solid m-10 mt-3  border-1 border-gray-500 rounded-lg  p-2 cursor-pointer"
              type="submit"
              value="Enviar"
            ></input>
          </section>
        </form>
      </Layout>
    </div>
  );
};

export default Registro;
