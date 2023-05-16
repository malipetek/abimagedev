import React from 'react';
import { PolarisVizProvider as PVizProvider } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

export function PolarisVizProvider({ children }) {
  return (
    <PVizProvider >
      {children}
    </PVizProvider>
  );
}
