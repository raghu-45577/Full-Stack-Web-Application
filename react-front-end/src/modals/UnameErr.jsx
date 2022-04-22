import React from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root');
function UnameErr({unameModal,onclick}) {
    return (
        <div>
          <Modal isOpen={unameModal} 
            style={
              {
                overlay:{
                  backgroundColor:'rgba(95,91,91,0.75)'
                },
                content:{
                  height:"200px",
                  width:"600px",
                  top:'160px',
                  left:'340px',
                  color:'red',
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'space-around',
                  alignItems:'center'
                }
              }
            }>
            User Name Should be Valid and cannot be empty
            <button className='btn btn-danger' onClick={onclick}>Close</button>
          </Modal>
        </div>
      )
}

export default UnameErr