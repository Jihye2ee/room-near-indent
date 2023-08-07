'use client'
import { styled } from '@mui/material'
import { DataGrid, DataGridProps, GridValidRowModel } from '@mui/x-data-grid'

const BaseDataGrid = <T extends GridValidRowModel>(props: DataGridProps<T>) => <DataGrid<T> {...props} />

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderStyle: 'none',
  width: '100%',
  '.MuiDataGrid-main': {
    color: theme.palette.grey[700],
    backgroundColor: theme.palette.grey[50],
  },
  '.MuiDataGrid-columnHeaders': {
    borderBottom: '1px solid',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[900],
  },
  '.MuiDataGrid-columnHeader': {
    padding: 16,
    backgroundColor: theme.palette.grey[300],
    '&:focus,&:focus-within': {
      outline: 'none',
      border: 'none',
    },
    '&:last-child': {
      '.MuiDataGrid-columnHeaderDraggableContainer': {
      },
    },
  },
  '.MuiDataGrid-row': {
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
  '.MuiDataGrid-cell': {
    width: '100%',
    alignItems: 'center',
    borderBottom: 0,
    padding: 16,
    '&:focus,&:focus-within': {
      outline: 'none',
      border: 'none',
    },
  },
  '.MuiTablePagination-actions': {
    '& > button': {
      color: theme.palette.grey[700],
      backgroundColor: theme.palette.grey[50],
    }
  }
})) as typeof BaseDataGrid

export default StyledDataGrid
