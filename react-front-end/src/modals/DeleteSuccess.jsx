import React from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root');
function DeleteSuccess({remove,onclick}) {

  return (
    <div>
      <Modal isOpen={remove} 
        style={
          {
            overlay:{
              backgroundColor:'rgba(43,124,68,0.75)'
            },
            content:{
              height:"300px",
              width:"400px",
              top:'160px',
              left:'440px',
              color:'black',
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-around',
              alignItems:'center',
              backgroundColor:'white'
            }
          }
        }>
            <svg className='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox='0 0 52 52'>
              <circle className='checkmark-circle' cx='26' cy='26' r='25' fill='none' />
              <path className="checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        Customer Deleted Successfully
        <button className='btn btn-success' onClick={onclick}>Ok</button>
      </Modal>
    </div>
  )
}

export default DeleteSuccess