import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Make from "./pages/Make";
import Contents01 from "./pages/parts/Contents01";
import Contents02 from "./pages/parts/Contents02";

import Layout from "./layout";

export const App: React.FC = () => {
 return (
  <BrowserRouter>
    <Routes>
     <Route path="/" element={<Layout><Home /></Layout>} />
     <Route path="about" element={<Layout><About /></Layout>} />
     <Route path="make" element={<Layout><Make /></Layout>} />
     <Route path="contents01" element={<Contents01 />} />
     <Route path="contents02" element={<Contents02 />} />
     <Route path='parts'>
      <Route path="contents02" element={<Contents02 />} />
     </Route>
   </Routes>
  </BrowserRouter>
 )
}