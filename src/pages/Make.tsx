import React from 'react';

import ContentSets from "../components/ContentSets";
import SideSelect from "../components/SideSelect";

function Home(){
 return (
   <div className="content">
    <SideSelect />
    <ContentSets />
   </div>
 )
}

export default Home;