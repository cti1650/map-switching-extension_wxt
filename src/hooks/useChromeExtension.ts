import { useEffect, useMemo, useState } from "react";
import { browser } from "wxt/browser";

export const useChromeExtension = () => {
  const [tabPageUrl, setTabPageUrl] = useState<string>("");
  const [tabPageTitle, setTabPageTitle] = useState<string>("");
  useEffect(() => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }).then((tabs) => {
      console.log(tabs[0].url);
      setTabPageUrl((prev) => {
        if (prev !== tabs[0].url) {
          return tabs[0].url || "";
        }
        return prev;
      });
      setTabPageTitle((prev) => {
        if (prev !== tabs[0].title) {
          return tabs[0].title || "";
        }
        return prev;
      });
    });
  }, []);
  return useMemo(() => {
    return { tabPageUrl, tabPageTitle };
  }, [tabPageUrl, tabPageTitle]);
};
