import React, { FC, useState } from "react";
import ImportComponent from "./ImportComponent";
import ExportComponent from "./ExportComponent";
import EditableTable from "./EditableTable";
import { RecordData } from "@/utils";

const testData = [
  {
    name: "Location A",
    category: "Store",
    street: "Market",
    lat: 39.984,
    lng: -75.343,
  },
  {
    name: "Location B",
    category: "House",
    street: "Broad",
    lat: 39.284,
    lng: -75.833,
  },
  {
    name: "Location C",
    category: "Office",
    street: "South",
    lat: 39.123,
    lng: -74.534,
  },
];

const DataManagement: FC = () => {
  const [data, setData] = useState<RecordData[]>(testData);

  const handleDataLoaded = (loadedData: RecordData[]) => {
    setData(loadedData);
  };

  // TODO: 編集機能実装
  // const handleUpdateData = (index: number, updatedRow: RecordData) => {
  //   setData((prevData) => prevData.map((row, i) => (i === index ? updatedRow : row)));
  // };

  const handleDeleteRow = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleAddRow = (newRow: RecordData) => {
    setData((prevData) => [...prevData, newRow]);
  };

  return (
    <div className="p-4">
      <ImportComponent onDataLoaded={handleDataLoaded} />
      <EditableTable
        columns={[
          { Header: "Name", accessor: "name" },
          { Header: "Location", accessor: "location" },
        ]} // カラムを設定
        data={data}
        // updateData={handleUpdateData}
        deleteRow={handleDeleteRow}
        addRow={handleAddRow}
      />
      <ExportComponent data={data} />
    </div>
  );
};

export default DataManagement;
