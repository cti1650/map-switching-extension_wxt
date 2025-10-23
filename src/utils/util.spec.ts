import { expect, describe, test } from "vitest";
import { convertMapPosition, getMapPosition, getMapLink } from "./util";

describe("util", () => {
  test("convertMapPosition", () => {
    const position = {
      lat: 35.6809591,
      long: 139.7673068,
    };
    expect(convertMapPosition("EPSG:4326", "EPSG:4301", position.lat, position.long)).toMatchObject(
      [139.77054094064192, 35.677719714679185]
    );
  });
  describe("getMapPosition", () => {
    test("goolge.com", () => {
      expect(
        getMapPosition(
          "https://www.google.com/maps/@34.462203,136.7234757,3a,75y,325.21h,92.18t/data=!3m6!1e1!3m4!1sxOyPbAqy4qs0vt7e6PhXSQ!2e0!7i13312!8i6656?coh=205409&entry=ttu"
        )
      ).toMatchObject({
        gcs: "wgs84",
        lat: 34.462203,
        long: 136.7234757,
        url: "https://www.google.com/maps/@34.462203,136.7234757,3a,75y,325.21h,92.18t/data=!3m6!1e1!3m4!1sxOyPbAqy4qs0vt7e6PhXSQ!2e0!7i13312!8i6656?coh=205409&entry=ttu",
      });
    });
    test("google.co.jp", () => {
      expect(
        getMapPosition(
          "https://www.google.com/maps/place/Google%E5%90%88%E5%90%8C%E4%BC%9A%E7%A4%BE%E3%83%BB%E5%85%AD%E6%9C%AC%E6%9C%A8%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9/@35.6604523,139.7266565,17z/data=!3m1!4b1!4m6!3m5!1s0x60188b770913970d:0xccc3467fcb15b353!8m2!3d35.6604523!4d139.7292314!16s%2Fg%2F1vwlp3d8?entry=ttu"
        )
      ).toMatchObject({
        gcs: "wgs84",
        lat: 35.6604523,
        long: 139.7292314,
        url: "https://www.google.com/maps/place/Google%E5%90%88%E5%90%8C%E4%BC%9A%E7%A4%BE%E3%83%BB%E5%85%AD%E6%9C%AC%E6%9C%A8%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9/@35.6604523,139.7266565,17z/data=!3m1!4b1!4m6!3m5!1s0x60188b770913970d:0xccc3467fcb15b353!8m2!3d35.6604523!4d139.7292314!16s%2Fg%2F1vwlp3d8?entry=ttu",
      });
    });
    test("yahoo.co.jp", () => {
      expect(
        getMapPosition("https://map.yahoo.co.jp/place?lat=35.6809591&lon=139.7673068&zoom=18")
      ).toMatchObject({
        gcs: "wgs84",
        lat: 35.6809591,
        long: 139.7673068,
        url: "https://map.yahoo.co.jp/place?lat=35.6809591&lon=139.7673068&zoom=18",
      });
    });
    test("maps.gsi.go.jp", () => {
      expect(getMapPosition("https://maps.gsi.go.jp/#18/35.6809591/139.7673068/")).toMatchObject({
        gcs: "wgs84",
        lat: 35.6809591,
        long: 139.7673068,
        url: "https://maps.gsi.go.jp/#18/35.6809591/139.7673068/",
      });
    });
    test("disaportal.gsi.go.jp", () => {
      expect(
        getMapPosition(
          "https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=35.6809591,139.7673068"
        )
      ).toMatchObject({
        gcs: "wgs84",
        lat: 35.6809591,
        long: 139.7673068,
        url: "https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=35.6809591,139.7673068",
      });
    });
    test("river.go.jp", () => {
      expect(
        getMapPosition(
          "https://www.river.go.jp/kawabou/pc/ov?zm=18&clat=34.68218959002214&clon=136.51207035407427&fld=0&mapType=0&viewGrpStg=0&viewRd=1&viewRW=1&viewRiver=1&viewPoint=1"
        )
      ).toMatchObject({
        gcs: "wgs84",
        lat: 34.68218959002214,
        long: 136.51207035407427,
        url: "https://www.river.go.jp/kawabou/pc/ov?zm=18&clat=34.68218959002214&clon=136.51207035407427&fld=0&mapType=0&viewGrpStg=0&viewRd=1&viewRW=1&viewRiver=1&viewPoint=1",
      });
    });
  });

  test("getMapLink", () => {
    const position = {
      lat: 35.6809591,
      long: 139.7673068,
    };
    expect(getMapLink(position)).toMatchObject({
      gmap: "https://www.google.com/maps/place/35.6809591,139.7673068",
      gsimap: "https://maps.gsi.go.jp/#18/35.6809591/139.7673068/",
      ycarnavi: "yjcarnavi://navi/select?lat=35.6809591&lon=139.7673068",
      ymap: "https://map.yahoo.co.jp/place/?lat=35.6809591&lon=139.7673068&zoom=18",
      disaportal:
        "https://disaportal.gsi.go.jp/hazardmap/maps/index.html?ll=35.6809591,139.7673068&z=18",
      kawabou: "https://www.river.go.jp/kawabou/pc/ov?zm=17&clat=35.6809591&clon=139.7673068",
    });
  });
});
