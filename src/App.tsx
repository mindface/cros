import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Make from "./pages/Make";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const App: React.FC = () => {
 return (
  <BrowserRouter>
   <Header />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/make" element={<Make />} />
   </Routes>
   <Footer />
  </BrowserRouter>
 )
}