import React from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const UserTable = ({ data, refetchData }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Identification Number', accessor: 'identification_number' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Last Name', accessor: 'last_name' },
      { Header: 'Date of Birth', accessor: 'date_of_birth' },
      { Header: 'Date of Issue', accessor: 'date_of_issue' },
      { Header: 'Date of Expiry', accessor: 'date_of_expiry' },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => (
          <button onClick={() => handleDelete(value)} className="bg-red-500 text-white px-2 py-1 rounded">
            Delete
          </button>
        ),
      },
    ],
    [refetchData] 
  );

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/${userId}`);
      refetchData(); // Refetch data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table-auto border-collapse w-full">
      {/* Header */}
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="bg-blue-400 border p-2">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* Body */}
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="p-2">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
