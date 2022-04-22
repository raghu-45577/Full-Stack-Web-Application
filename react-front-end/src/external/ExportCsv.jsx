import React from 'react'
import { CSVLink } from 'react-csv';

function ExportCsv(props) {

    const headers=[
        {label:'ID',key:'id'},
        {label:'First Name',key:'firstName'},
        {label:'Last Name',key:'lastName'},
        {label:'Email Id',key:'emailId'}
    ];
  return (
    <div>
        <CSVLink
            headers={headers}
            data={props.customers}
            filename={props.title}
            target="_blank">
                <button className='btn btn-success'>Download</button>
        </CSVLink>
    </div>
  )
}

export default ExportCsv