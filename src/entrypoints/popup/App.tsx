import { useQuery } from "$hooks";
import { PopupPage } from "@/component/Page";

function App() {
  const { get } = useQuery();
  const sampleUrl = get("url") || "";
  const { tabPageUrl } = useChromeExtension();
  const activeTabUrl = sampleUrl === "" ? tabPageUrl : sampleUrl;
  const data = useMapGeoData(activeTabUrl);
  const links = useGeoToLink(data);
  // 測地系変換 https://docs.ekispert.com/v1/api/toolbox/geo/convert.html

  return <PopupPage links={links} url={activeTabUrl} />;
}

export default App;
