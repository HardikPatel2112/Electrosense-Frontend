import DataTable from "react-data-table-component";

import React from "react";

export default function DataTable(props) {
  return (
    <div>  
      <datatable  title="Products List"  columns={props.columns}    data={props.data}  ></datatable>
    </div>
  );
}
