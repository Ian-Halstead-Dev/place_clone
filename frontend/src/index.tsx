import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/reset.css';
import './Styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './Pages/App';
import Grid from './Pages/Grid';
import NotFound from "./Pages/NotFound"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" Component={() => <App />}></Route>
        <Route path="/grid/*" Component={() => <Grid />}></Route>
        <Route path="/*" Component={() => <NotFound />}></Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode >
);
