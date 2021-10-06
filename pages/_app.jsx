import "../styles/main.css";
import "styles/styles.css";
import "styles/stylesMobile.css";
import "styles/modales.css";
import { ApolloProvider } from "@apollo/client";
import client from "config/apollo";



const MyApp = ({ Component, pageProps }) => {
  console.log("HOla");
  return (
    <div>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
};

export default MyApp;
