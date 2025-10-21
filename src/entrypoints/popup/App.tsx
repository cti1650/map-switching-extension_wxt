import { PopupPage } from "@/component/Page";

function App() {
  const sampleUrl = "";
  const { tabPageUrl } = useChromeExtension();
  const data = useMapGeoData(tabPageUrl || sampleUrl);
  const links = useGeoToLink(data);
  // 測地系変換 https://docs.ekispert.com/v1/api/toolbox/geo/convert.html

  return <PopupPage links={links} url={tabPageUrl || sampleUrl} />;
}

export default App;
