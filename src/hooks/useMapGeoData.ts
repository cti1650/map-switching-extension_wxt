import { MapLink, MapPosition, getMapLink, getMapPosition } from '@/utils/util';
import { useEffect, useState } from 'react';

export const useMapGeoData = (url: string | null) => {
  const [dataJson, setDataJson] = useState<MapPosition | null>(null);
  useEffect(() => {
    if (!url) return;
    setDataJson(getMapPosition(url));
  }, [url]);
  return dataJson;
};

export const useGeoToLink = (geoData: MapPosition | null) => {
  const [links, setLinks] = useState<MapLink | null>(null);
  useEffect(() => {
    if (!geoData) return;
    setLinks(getMapLink(geoData));
  }, [geoData]);
  return links;
};
