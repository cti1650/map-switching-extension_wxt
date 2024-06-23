import { expect, describe, test } from 'vitest';
import {
  convertMapPosition,
  getMapPosition,
  getMapLink,
} from './util';

describe('util', () => {
  test('convertMapPosition', () => {
    const position = {
      lat: 35.6809591,
      long: 139.7673068,
    };
    expect(
      convertMapPosition('EPSG:4326', 'EPSG:4301', position.lat, position.long)
    ).toMatchObject([139.77054094064192, 35.677719714679185]);
  });
  test('getMapPosition', () => {
    expect(
      getMapPosition(
        'https://www.google.com/maps/@34.462203,136.7234757,3a,75y,325.21h,92.18t/data=!3m6!1e1!3m4!1sxOyPbAqy4qs0vt7e6PhXSQ!2e0!7i13312!8i6656?coh=205409&entry=ttu'
      )
    ).toMatchObject({
      gcs: 'wgs84',
      lat: 34.462203,
      long: 136.7234757,
      url: 'https://www.google.com/maps/@34.462203,136.7234757,3a,75y,325.21h,92.18t/data=!3m6!1e1!3m4!1sxOyPbAqy4qs0vt7e6PhXSQ!2e0!7i13312!8i6656?coh=205409&entry=ttu',
    });
  });

  test('getMapLink', () => {
    const position = {
      lat: 35.6809591,
      long: 139.7673068,
    };
    expect(getMapLink(position)).toMatchObject({
      gmap: 'https://www.google.com/maps/place/35.6809591,139.7673068',
      gsimap: 'https://maps.gsi.go.jp/#18/35.6809591/139.7673068/',
      ycarnavi: 'yjcarnavi://navi/select?lat=35.6809591&lon=139.7673068',
      ymap: 'https://map.yahoo.co.jp/place/?lat=35.6809591&lon=139.7673068&zoom=18',
    });
  });
});
