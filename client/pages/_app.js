// import App from 'next/app'
import 'cross-fetch'
import React from 'react';
import { ApolloProvider } from "@apollo/client/react";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import getClient from "apollo";
import 'src/styles/globals.css';
import { ME } from 'src/operations/user';

const progress = new ProgressBar({
  size: 2,
  color: "#0891B2",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const client = getClient(pageProps.token)
  client.writeQuery({
    query: ME,
    data: {
      me: pageProps.user || null
    }
  })
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp