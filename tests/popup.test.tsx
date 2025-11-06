import { PopupPage } from "@/component/Page";
import { getMapLink, getMapPosition } from "@/utils/util";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Popup(React)", () => {
  it("URLから位置情報を取得する", async () => {
    const url =
      "https://www.google.com/maps/@35.6785687,139.7610622,3a,75y,305.39h,90t/data=!3m7!1e1!3m5!1sR0h2seb3BKcVhD2_LLC0ug!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DR0h2seb3BKcVhD2_LLC0ug%26yaw%3D305.394458946019!7i16384!8i8192?authuser=0&entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D";
    const data = getMapPosition(url);
    const links = getMapLink(data);
    render(<PopupPage links={links} url={url} />);
    const button = screen.getByRole("heading", { name: "Google Map" });
    expect(button).not.toBeNull();
  });
  it("対応していないURLの場合", async () => {
    const url = "https://www.example.com/";
    const data = getMapPosition(url);
    const links = getMapLink(data);
    render(<PopupPage links={links} url={url} />);
    const divElement = screen.getByText("マップ変換に対応していないサイトのようです…");
    expect(divElement).not.toBeNull();
  });
});
