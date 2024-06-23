import * as GeoJSON from 'geojson';
import tokml from 'geojson-to-kml';
import * as toGeoJSON from '@tmcw/togeojson';
import { DOMParser } from 'xmldom';
import { buildGPX, GarminBuilder, BaseBuilder } from 'gpx-builder';
import { GeoJsonObject, GeoJSON as GeoJSONType } from 'geojson';
import { parse } from 'gpx-parser-builder';

export type RecordData = Record<string, string | number | null>;

export const convertDataToGeoJSON = (data: any): GeoJSONType | null => {
  if (!data) return null;
  const geojsonData = GeoJSON.parse(data, { Point: ['lat', 'lng'] });
  console.log('geojsonData', JSON.stringify(geojsonData));
  return geojsonData;
};

export const convertGeoJsonToData = (data: GeoJSONType | null): any[] => {
  if ((data as any).features) {
    return (data as any).features.map((feature: any) => {
      const [lng, lat] = feature.geometry.coordinates;
      return {
        ...(feature.properties || {}),
        lat,
        lng,
      };
    });
  }
  return [];
};

export const convertGeoJsonToKML = (
  data: GeoJSONType | null
): string | null => {
  if (!data) return null;
  const kml = tokml(data);
  return kml;
};

export const convertGeoJsonToGPX = (
  data: GeoJSONType | null
): string | null => {
  if (!data) return null;
  const { Point, Track, Segment } = GarminBuilder.MODELS;
  const gpxData = new GarminBuilder();
  const trackSegments: Segment[] = [];

  (data as any).features.forEach((feature: any) => {
    const [lon, lat] = feature.geometry.coordinates;
    if (!lat || !lon) return;
    trackSegments.push(
      new Segment([new Point(lat, lon)], {
        ...feature.properties,
      })
    );
  });

  gpxData.setTracks([new Track(trackSegments)]);

  const gpx = buildGPX(gpxData.toObject());
  return gpx;
};

export const convertKMLToGeoJson = (
  data: string | null
): GeoJSONType | null => {
  if (!data) return null;
  const kmlDom = new DOMParser().parseFromString(data, 'text/xml');
  const geojsonData = toGeoJSON.kml(kmlDom);
  return geojsonData as GeoJSONType;
};

export const convertGPXToGeoJson = (
  data: string | null
): GeoJSONType | null => {
  if (!data) return null;
  const gpxDom = new DOMParser().parseFromString(data, 'text/xml');
  const geojsonData = toGeoJSON.gpx(gpxDom);
  return geojsonData;
};
