import React from 'react'

export default function Alert(props) {
  //  if (!props.alert) {
  //   return null; // 🚨 prevents crash
  // }
  return (
  <div style={{minHeight :'60px'}}>
   {props.alert && (<div className="alert alert-warning alert-dismissible fade show" role="alert">
   <strong>{props.alert.type}</strong> :{props.alert.message}
        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>)}
    </div>
  )
}