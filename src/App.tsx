import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Make from "./pages/Make";
import Contents01 from "./pages/parts/Contents01";
import Contents02 from "./pages/parts/Contents02";
import Contents03 from "./pages/parts/Contents03";
import Contents04 from "./pages/parts/Contents04";
import Contents05 from "./pages/parts/Contents05";
import Contents06 from "./pages/parts/Contents06";

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
     <Route path="contents03" element={<Contents03 />} />
     <Route path="contents04" element={<Contents04 />} />
     <Route path="contents05" element={<Contents05 />} />
     <Route path="contents06" element={<Contents06 />} />
     <Route path='parts'>
      <Route path="contents02" element={<Contents02 />} />
     </Route>
   </Routes>
  </BrowserRouter>
 )
}