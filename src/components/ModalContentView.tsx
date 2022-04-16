import React from 'react';
import { useSelector, useStore, useDispatch } from "react-redux";
import { SelectorRootStore } from "../store";

function ContentSets(){
  const store = useStore();
  const dispatch = useDispatch();
  const modalSwitch = useSelector(() => {
    return store.getState().base.modal.modalView
  })
  const setId = useSelector((state:SelectorRootStore) => {
    return state.base.card.setId
  })
  function closeAction(){
    dispatch({type:'modal/close'});
    document.getElementsByTagName('body')[0].className = "";
  }

  return (
   <div className={modalSwitch ? "modal view" : "modal"}>
     {modalSwitch && <div className="modal--inner">
       <button className='close boxShadow radius' onClick={() => closeAction()} >close</button>
       <h3 className="title">view</h3>
       <div className="box">
         <iframe src={`/contents0${setId}`} className='iframe'></iframe>
       </div>
     </div>}
   </div>
  )
}

export default ContentSets;
