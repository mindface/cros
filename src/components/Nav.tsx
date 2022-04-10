import React from 'react';
import { Link } from 'react-router-dom';

function Nav(){
  return (
   <div className="nav-outer">
     <Link className="link" to="/">home</Link>
     <Link className="link" to="/about">about</Link>
     <Link className="link" to="/make">make</Link>
   </div>
  )
}

export default Nav;
