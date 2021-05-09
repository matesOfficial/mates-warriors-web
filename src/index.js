import { ChakraProvider } from "@chakra-ui/react"
import React from 'react';
import ReactDOM from 'react-dom';

import App from './views/pages/App';

import "./views/styles/index.css"

const render = (Component) => {
  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>
        <Component />
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


render(App)
