import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  FrameProvider,
  PolarisVizProvider,
} from "./components";

export default function App() {

  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  return (
    <PolarisProvider>
      <PolarisVizProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <FrameProvider>
              <Routes pages={pages} />
            </FrameProvider>
          </QueryProvider>
        </AppBridgeProvider>
        </BrowserRouter>
      </PolarisVizProvider>
    </PolarisProvider>
  );
}
