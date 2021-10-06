import Head from "next/head";
import { NavbarNotificacion } from "components/NavbarNotificacion";


import React, { Children } from "react";

export const LayoutDot = ({ children }) => {
  return (
    <div className="main">
      <Head>
        <title>Gente Prevalente</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/0888d5f4dd.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <NavbarNotificacion />
      <main className="main">{children}</main>
    </div>
  );
};
