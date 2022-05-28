import React, { useRef,useEffect } from 'react';
import { useSelector, useStore, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import Contents01 from "../pages/parts/Contents01";

function MakeImageContent(){
  const store = useStore();
  const dispatch = useDispatch();
  const iframe = useRef<HTMLIFrameElement>(null);
  const modalSwitch = useSelector(() => {
    return store.getState().base.modal.modalView
  })
  const setId = useSelector((state:{base: RootStore}) => {
    return state.base.card.setId;
  })
  function closeAction(){
    dispatch({type:'modal/close'});
    document.getElementsByTagName('body')[0].className = "";
  }

  useEffect(() => {
    dispatch({type:'card/setCotentId',setsetCotentIdId:setId});
  },[]);

  return (
   <div className={modalSwitch ? "modal view" : "modal"}>
     {modalSwitch && <div className="modal--inner">
       <button className='close boxShadow radius' onClick={() => closeAction()} >close</button>
       <h3 className="title">MakeImageContent</h3>
       <div className="box">
         <Contents01 />
         {/* <iframe ref={iframe} src={`/#/contents01`} className='iframe'></iframe> */}
       </div>
     </div>}
   </div>
  )
}

export default MakeImageContent;
