import Head from "next/head";
import { Navbar } from "components/Navbar";

import React, { Children } from "react";

export const Layout = ({ children }) => {
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
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
};
