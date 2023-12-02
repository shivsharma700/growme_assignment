import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  
  {
    field: 'userId',
    headerName: 'userId',
    width: 100,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 500,
    editable: true,
  },
  {
    field: 'body',
    headerName: 'Body',
    width: 700,
    editable: true,
  },
];

interface data {
    id : number,
    userId : number,
    title : string,
    body : string
}

type Row = data[];

export default function DataGridDemo() {

    const [rows , setRows] = useState<Row>([]);

    async function fetchData(){
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response);
        setRows(response.data);
    }
    
    useEffect(()=>{
        fetchData()
    },[]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}