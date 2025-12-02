import proj4 from "proj4";

export const convertMapPosition = (source: string, target: string, lat: number, long: number) => {
  proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
  proj4.defs(
    "EPSG:4301",
    "+proj=longlat +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +no_defs"
  );
  return proj4(source, target, [long, lat]);
};

export type MapPosition = {
  url?: string;
  gcs?: string;
  lat: number;
  long: number;
};

export const getMapPosition = (url: string): MapPosition | null => {
  if (~url.indexOf("https://www.google.") && ~url.indexOf("map")) {
    const word = url.replace("https://www.google.", "");
    const re = /@(\d+\.\d+),(\d+\.\d+),(\d+[z,m,a])/i;
    const re2 = /!3d(\d+\.\d+)!4d(\d+\.\d+)/i;
    const ex = word.match(re);
    const ex2 = word.match(re2);
    // console.log(ex);
    if (ex2) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex2[1]),
        long: Number(ex2[2]),
      };
    }
    if (ex) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex[1]),
        long: Number(ex[2]),
      };
    }
  } else if (~url.indexOf("https://map.yahoo.")) {
    const word = url.replace("https://map.yahoo.", "");
    const re = /\?lat=(\d+\.\d+)&lon=(\d+\.\d+)/i;
    const ex = word.match(re);
    // console.log(ex);
    if (ex) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex[1]),
        long: Number(ex[2]),
      };
    }
  } else if (~url.indexOf("https://maps.gsi.go.jp/")) {
    const word = url.replace("https://maps.gsi.go.jp/", "");
    const re = /#\d+\/(\d+\.\d+)\/(\d+\.\d+)/i;
    const ex = word.match(re);
    // console.log(ex);
    if (ex) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex[1]),
        long: Number(ex[2]),
      };
    }
  } else if (~url.indexOf("https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=")) {
    const word = url.replace("https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=", "");
    const re = /(\d+\.\d+),(\d+\.\d+)/i;
    const ex = word.match(re);
    if (ex) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex[1]),
        long: Number(ex[2]),
      };
    }
  } else if (~url.indexOf("https://www.river.go.jp/kawabou/pc/ov?")) {
    const word = url.replace("https://www.river.go.jp/kawabou/pc/ov?", "");
    const re = /clat=(\d+\.\d+)&clon=(\d+\.\d+)/i;
    const ex = word.match(re);
    if (ex) {
      return {
        url: url,
        gcs: "wgs84",
        lat: Number(ex[1]),
        long: Number(ex[2]),
      };
    }
  }
  return null;
};

export type MapLink = {
  gmap: string;
  ymap: string;
  ycarnavi: string;
  gsimap: string;
  disaportal: string;
  kawabou: string;
};

export const getMapLink = (data: MapPosition | null): MapLink | null => {
  if (!data) return null;
  const gmap = `https://www.google.com/maps/place/${data.lat},${data.long}`;
  const ymap = `https://map.yahoo.co.jp/place/?lat=${data.lat}&lon=${data.long}&zoom=18`;
  const ycarnavi = `yjcarnavi://navi/select?lat=${data.lat}&lon=${data.long}`;
  const gsimap = `https://maps.gsi.go.jp/#18/${data.lat}/${data.long}/`;
  const disaportal = `https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=${data.lat},${data.long}&z=18`;
  const kawabou = `https://www.river.go.jp/kawabou/pc/ov?zm=17&clat=${data.lat}&clon=${data.long}`;
  return { gmap, ymap, ycarnavi, gsimap, disaportal, kawabou };
};
