import React, { FC, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { convertDataToGeoJSON, convertGeoJsonToKML } from '@/utils/convert';
import { RecordData } from '@/utils/convert';
import { GeoJSON as GeoJSONType } from 'geojson';

type Props = {
  data: RecordData[];
};

const ExportComponent: FC<Props> = ({ data }) => {
  const [geoData, setGeoData] = useState<GeoJSONType | null>(null);

  useEffect(() => {
    if (data && data.length) {
      setGeoData(convertDataToGeoJSON(data));
    }
  }, [data]);

  if (!data || !data.length) {
    return null;
  }
  const headers = Object.keys(data[0]).map(key => ({ label: key, key }));

  const exportToKML = () => {
    const kml = convertGeoJsonToKML(geoData);
    if (!kml) return;
    const blob = new Blob([kml], {
      type: 'application/vnd.google-earth.kml+xml',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.kml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToGeoJSON = () => {
    const geojson = JSON.stringify(geoData);
    if (!geojson) return;
    const blob = new Blob([geojson], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.geojson';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const exportToGPX = () => {
  //   const { Point } = GarminBuilder.MODELS;
  //   const gpxData = new GarminBuilder();
  //   geoData?.features.forEach(feature => {
  //     const [lon, lat] = feature.geometry.coordinates;
  //     gpxData.setTracks([
  //       new GarminBuilder.MODELS.Track([
  //         new GarminBuilder.MODELS.TrackSegment([new Point(lat, lon)]),
  //       ]),
  //     ]);
  //   });
  //   const gpx = buildGPX(gpxData.toObject());
  //   const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'data.gpx';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="p-4">
      <CSVLink
        data={data}
        headers={headers}
        filename="data.csv"
        className="bg-blue-500 text-white p-2 rounded"
      >
        CSVとしてエクスポート
      </CSVLink>
      <button
        onClick={exportToKML}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        KMLとしてエクスポート
      </button>
      <button
        onClick={exportToGeoJSON}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        GeoJSONとしてエクスポート
      </button>
      {/* <button
        onClick={exportToGPX}
        className="bg-green-500 text-white p-2 rounded ml-2"
      >
        GPXとしてエクスポート
      </button> */}
    </div>
  );
};

export default ExportComponent;
