import { test, expect } from "./fixtures";
import { openPopup } from "./pages/popup";

test("Popup header displays correct text", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);
  expect(await popup.getHeaderText()).toEqual("Map Switching Extension");
});
