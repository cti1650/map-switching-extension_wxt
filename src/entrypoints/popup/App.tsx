import { PopupPage } from '@/component/Page';

function App() {
  const sampleUrl = '';
  const { tabPageUrl } = useChromeExtension();
  const data = useMapGeoData(tabPageUrl || sampleUrl);
  const links = useGeoToLink(data);
  // 測地系変換 https://docs.ekispert.com/v1/api/toolbox/geo/convert.html
  const sampleJson = {
    GeoPoint: {
      gcs: 'tokyo or wgs84',
      lati_d: '35.158918',
      longi_d: '136.892320',
      lati: '35.9.32.10',
      longi: '136.53.32.35',
    },
  };
  // console.log(data);

  return (
    <PopupPage links={links} url={tabPageUrl || sampleUrl} />
  );
}

export default App;
