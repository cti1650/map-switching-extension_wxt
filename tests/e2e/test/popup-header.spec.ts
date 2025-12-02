import { expect, test } from "../fixtures";
import { DisaportalPage } from "../pom/disaportal.page";
import { ExtensionPopupPage } from "../pom/ext-popup.page";
import { GoogleMapPage } from "../pom/google-map.page";
import { GsiMapPage } from "../pom/gsi-map.page";
import { KawabouPage } from "../pom/kawabou.page";
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

  const newTab = await popupPage.openMapLink("#google-map-button");
  const googleMapPage = new GoogleMapPage(newTab);
  const resultPageUrl = await googleMapPage.getUrl();
  const searchResultText = await googleMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("google.com/maps");
  expect(searchResultText).toContain("35°42'34.7\"N 139°48'36.7\"E");
});

test("Popup Open Yahoo Map", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("#yahoo-map-button");
  const yahooMapPage = new YahooMapPage(newTab);
  const resultPageUrl = await yahooMapPage.getUrl();
  const searchResultText = await yahooMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("map.yahoo.co.jp/place");
  if (searchResultText === "指定された地点") {
    const searchResultCoordinates = await yahooMapPage.getSearchResultCoordinates();
    expect(searchResultCoordinates).toContain("35.709635");
    return;
  }
  expect(searchResultText).toContain("東京都墨田区押上１丁目１");
});

test("Popup Open GSI Maps", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("#gsi-map-button");
  const gsiMapPage = new GsiMapPage(newTab);
  const resultPageUrl = await gsiMapPage.getUrl();
  const searchResultText = await gsiMapPage.getSearchResultText();

  expect(resultPageUrl).toContain("maps.gsi.go.jp");
  expect(searchResultText).toContain("35.709635,139.810203");
});

test("Popup Open 重ねるハザードマップ", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("#disaportal-button");
  const disaportalPage = new DisaportalPage(newTab);
  const resultPageUrl = await disaportalPage.getUrl();
  const searchResultText = await disaportalPage.getSearchResultText();

  expect(resultPageUrl).toContain("disaportal.gsi.go.jp/hazardmap");
  expect(searchResultText).toContain("35.709636,139.810204");
});

test("Popup Open 川の防災情報", async ({ page, extensionId }) => {
  const popupPage = new ExtensionPopupPage(page);
  await popupPage.goto(extensionId, `?url=${encodeURIComponent(testPageUrl)}`);

  const newTab = await popupPage.openMapLink("#kawabou-button");
  const kawabouPage = new KawabouPage(newTab);
  const resultPageUrl = await kawabouPage.getUrl();
  const searchResultText = await kawabouPage.getSearchResultText();

  expect(resultPageUrl).toContain("river.go.jp/kawabou");
  expect(searchResultText).toContain("東京都墨田区");
});
