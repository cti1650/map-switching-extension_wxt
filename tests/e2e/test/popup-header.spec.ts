import { expect, test } from "../fixtures";
import { ExtensionPopupPage } from "../pom/ext-popup.page";
import { GoogleMapPage } from "../pom/google-map.page";
import { GsiMapPage } from "../pom/gsi-map.page";
import { YahooMapPage } from "../pom/yahoo-map.page";

const testPageUrl =
  "https://www.google.com/maps/@35.709635,139.8102033,3a,90y,38.01h,104.06t/data=!3m7!1e1!3m5!1sBoSfdWvSXZnysLjeVdnecQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-14.061108908383915%26panoid%3DBoSfdWvSXZnysLjeVdnecQ%26yaw%3D38.00537503926333!7i16384!8i8192?authuser=0&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D";

test("Popup header displays correct text", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId);
  const headerText = await popupPage.getHeaderText();
  expect(headerText).toEqual("Map Switching Extension");
});

test("Popup Open Google Maps", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("Google Map で開く");
  const googleMapPage = new GoogleMapPage(newTab);
  const resultPageUrl = await googleMapPage.getUrl();
  const searchResultText = await googleMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("google.com/maps");
  expect(searchResultText).toContain("35°42'34.7\"N 139°48'36.7\"E");
});

test("Popup Open Yahoo Map", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("Yahoo! Map で開く");
  const yahooMapPage = new YahooMapPage(newTab);
  const resultPageUrl = await yahooMapPage.getUrl();
  const searchResultText = await yahooMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("map.yahoo.co.jp/place");
  if (searchResultText === "指定された地点") {
    const searchResultNote = await yahooMapPage.getSearchResultNote();
    expect(searchResultNote).toContain("35.709635");
    return;
  }
  expect(searchResultText).toContain("東京都墨田区押上１丁目１");
});

test("Popup Open GSI Maps", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("地理院地図 で開く");
  const gsiMapPage = new GsiMapPage(newTab);
  const resultPageUrl = await gsiMapPage.getUrl();
  const searchResultText = await gsiMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("maps.gsi.go.jp");
  expect(searchResultText).toContain("35.709635,139.810203");
});
