import React from 'react';
import { Link } from 'react-router-dom';

function Nav(){
  return (
   <div className="nav-outer">
     <Link className="link" to="/">home</Link>
     <Link className="link" to="/about">about</Link>
     <Link className="link" to="/make">make</Link>
     <Link className="link" to="/parts/contents01">contents01</Link>
     <Link className="link" to="/parts/contents02">contents02</Link>
   </div>
  )
}

export default Nav;
