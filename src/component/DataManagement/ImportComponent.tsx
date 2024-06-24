import {
  RecordData,
  convertCSVToData,
  convertGPXToGeoJson,
  convertGeoJsonToData,
  convertKMLToGeoJson,
} from '@/utils';
import React, { FC, useState } from 'react';

type Props = {
  onDataLoaded: (data: RecordData[]) => void;
};

const ImportComponent: FC<Props> = ({ onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleFileRead = () => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async e => {
      if (!e.target || !file) {
        return;
      }
      const data = e.target.result as string;
      const fileType = file.name.split('.').pop();

      let parsedData: RecordData[] = [];
      switch (fileType) {
        case 'csv':
          parsedData = await convertCSVToData(data);
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
