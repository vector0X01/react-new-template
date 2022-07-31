import React from 'react';
import { makeStyles } from '@mui/styles';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.css';

const useStyles = makeStyles(() => ({
  table: {
    '& .p-paginator': {
      justifyContent: 'flex-end',
    },
    '& .p-progressbar': {
      height: '0.5rem',
      backgroundColor: '#d8dadc',
    },
    '& .p-progressbar-value': {
      backgroundColor: '#607d8b',
    },
    '& .p-datepicker': {
      minWidth: '25rem',
      '& td': {
        fontWeight: '400',
      },
    },
    '& .p-datatable': {
      '.p-datatable-header': {
        padding: '1rem',
        textAlign: 'left',
        fontSize: '1.5rem',
      },
      '.p-datatable-tbody': {
        overflowY: 'auto',
        height: '100% !important',
      },
    },
    '& .visible-icon': {
      background: '#263E50 !important',
    },
    '& .edit-icon': {
      background: '#5AAA5D !important',
    },
    '& .delete-icon': {
      background: '#DC5147 !important',
    },
    '& .visible-icon, .edit-icon, .delete-icon': {
      color: '#fff !important',
      width: '30px !important',
      height: '28px !important',
      padding: '8px !important',
      borderRadius: '3px !important',
      marginRight: '3px !important',
    },
  },
}));

const Table = (props) => {
  const {
    columns,
    data,
    rows = 5,
    paginatorTemplate,
    selection = null,
    onSelectionChange = () => {},
    filters,
    loading,
    filterFields = [],
    emptyMessage = 'No Records found',
  } = props;
  const classes = useStyles();

  return (
    <DataTable
      className={classes.table}
      value={data}
      paginator
      paginatorTemplate={paginatorTemplate}
      rows={rows}
      paginatorClassName="justify-content-end"
      // className="mt-6"
      responsiveLayout="scroll"
      dataKey="id"
      rowHover
      selection={selection}
      onSelectionChange={onSelectionChange}
      filters={filters}
      filterDisplay="menu"
      loading={loading}
      globalFilterFields={filterFields}
      emptyMessage={emptyMessage}
      currentPageReportTemplate="Show {totalRecords} entries"
      scrollable
      scrollHeight="600px"
    >
      {columns.map((item, i) => (
        <Column key={i} {...item} />
      ))}
    </DataTable>
  );
};

export default Table;
