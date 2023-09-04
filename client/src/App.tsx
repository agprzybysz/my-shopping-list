import React from "react";
import { NavigationMenu } from "./layouts/NavigationMenu";
import { Layout } from "./layouts/Layout";
import { Page } from "./layouts/Page";
import "./styles/App.css";

function App() {
  return (
    <Layout>
      <NavigationMenu />
      <Page />
    </Layout>
  );
}

export default App;
