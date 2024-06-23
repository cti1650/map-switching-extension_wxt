import {
  RecordData,
  convertGPXToGeoJson,
  convertGeoJsonToData,
  convertKMLToGeoJson,
} from '@/utils';
import React, { FC, useState } from 'react';

type Props = {
  onDataLoaded: (data: RecordData) => void;
};

const ImportComponent: FC<Props> = ({ onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleFileRead = () => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target || !file) {
        return;
      }
      const data = e.target.result;
      const fileType = file.name.split('.').pop();

      let parsedData;
      switch (fileType) {
        case 'csv':
          parsedData = parseCSV(data); // CSVデータのパース関数を定義
          break;
        case 'kml':
          parsedData = convertGeoJsonToData(convertKMLToGeoJson(data));
          break;
        case 'gpx':
          parsedData = convertGeoJsonToData(convertGPXToGeoJson(data));
          break;
        case 'geojson':
          parsedData = convertGeoJsonToData(JSON.parse(data));
          break;
        default:
          alert('Unsupported file format');
          return;
      }
      onDataLoaded(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleFileRead}
        className="bg-blue-500 text-white p-2 rounded"
      >
        ファイルを読み込む
      </button>
    </div>
  );
};

export default ImportComponent;
