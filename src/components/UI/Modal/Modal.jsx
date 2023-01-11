import React, {useState} from "react";
import cl from './Modal.module.css';

const Modal = ({children, visible, setVisible}) =>
{
    const rootClasses = [cl.myModal]

    if(visible){
        rootClasses.push(cl.active)
    }

    return(
        <div className={rootClasses.join(" ")} onClick={()=>setVisible(false)}>
            <div className={cl.myModalContente} onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
export default Modal