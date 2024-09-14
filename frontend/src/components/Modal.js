import { useState } from "react";
import warning from '../images/warning.png'

const Modal = ({modalContent, modalShow, setModalShow}) => {
    

    return ( <div className="modalContainer">
         {/* Modal */}
            <div className="modal" id="modal" style={{ display:modalShow }}> 
            {/* <div className="modal__dialog"> */}
              <section className="modal__content">
                <div className="modal__header">
                <img src={warning}/>
                    Error
                </div>
                <a href="#" className="modal__close" onClick={()=>setModalShow("none")}>OK</a>
                  <div className="modal_body">
                    {/* Content here */}
                        {modalContent}
                  </div>

              </section>
            </div>
          {/* </div> */}

        </div> 
    
    );
}
 
export default Modal;