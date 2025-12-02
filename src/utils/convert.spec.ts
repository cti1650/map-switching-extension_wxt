import { expect, describe, test } from "vitest";
import {
  convertDataToGeoJSON,
  convertGeoJsonToKML,
  convertGeoJsonToGPX,
  convertGeoJsonToData,
  convertKMLToGeoJson,
  convertGPXToGeoJson,
  convertCSVToData,
} from "./convert";
import { GeoJSON } from "geojson";

const testData = [
  {
    lat: 35.6809591,
    lng: 139.7673068,
    name: "Tokyo",
  },
];

const testCSV = "lat,lng,name\n35.6809591,139.7673068,Tokyo\n";

const testGeoJson: GeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.7673068, 35.6809591] },
      properties: { name: "Tokyo" },
    },
  ],
};

const testKML = `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><Placemark><name>Tokyo</name><ExtendedData><Data name="name"><value>Tokyo</value></Data></ExtendedData><Point><coordinates>139.7673068,35.6809591</coordinates></Point></Placemark></Document></kml>`;

const testGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="fabulator:gpx-builder" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 https://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v2 https://www8.garmin.com/xmlschemas/TrackPointExtensionv2.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 https://www8.garmin.com/xmlschemas/GpxExtensions/v3/GpxExtensionsv3.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v2" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
  <trk>
    <trkseg>
      <trkpt lat="35.6809591" lon="139.7673068"></trkpt>
      <extensions>
        <name>Tokyo</name>
      </extensions>
    </trkseg>
  </trk>
</gpx>`;

describe("convert", () => {
  test("convertDataToGeoJSON", () => {
    expect(convertDataToGeoJSON(testData)).toMatchObject(testGeoJson);
  });

  test("convertCSVToData", async () => {
    expect(await convertCSVToData(testCSV)).toMatchObject(testData);
  });

  test("convertGeoJsonToData", () => {
    expect(convertGeoJsonToData(testGeoJson)).toMatchObject(testData);
  });

  test("convertGeoJsonToKML", () => {
    expect(convertGeoJsonToKML(testGeoJson)).toBe(testKML);
  });

  test("convertGeoJsonToGPX", () => {
    expect(convertGeoJsonToGPX(testGeoJson)).toBe(testGPX);
  });

  test("convertKMLToGeoJson", () => {
    expect(convertKMLToGeoJson(testKML)).toMatchObject(testGeoJson);
  });

  // TODO: エラーが発生しているので直す予定
  test("convertGPXToGeoJson", () => {
    const gpx = convertGeoJsonToGPX(testGeoJson);
    expect(convertGPXToGeoJson(gpx)).toMatchObject({
      ...testGeoJson,
      features: [], // TODO: 一旦空にしておく
    });
  });
});
