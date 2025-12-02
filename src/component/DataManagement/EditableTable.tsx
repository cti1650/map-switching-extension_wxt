import React, { FC, useState } from "react";
import { useTable } from "react-table";

type Props = {
  columns: any[];
  data: any[];
  updateData?: (rowIndex: number, columnId: number, value: string) => void;
  deleteRow: (rowIndex: number) => void;
  addRow: (newRow: any) => void;
};

const EditableTable: FC<Props> = ({ columns, data, deleteRow, addRow }) => {
  const [newRow, setNewRow] = useState<Record<string, string | number>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, columnId: string) => {
    const value = e.target.value;
    setNewRow((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  const handleAddRow = () => {
    addRow(newRow);
    setNewRow({});
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-4">
      <table {...getTableProps()} className="table-auto w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border px-4 py-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
                <td>
                  <button
                    onClick={() => deleteRow(row.index)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            {columns.map((column) => (
              <td key={column.accessor} className="border px-4 py-2">
                <input
                  value={newRow[column.accessor] || ""}
                  onChange={(e) => handleInputChange(e, column.accessor)}
                  className="p-2 border rounded"
                />
              </td>
            ))}
            <td>
              <button onClick={handleAddRow} className="bg-green-500 text-white p-2 rounded">
                追加
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
