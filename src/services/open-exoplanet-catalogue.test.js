import http from "../utils/http";
import { getExoplanets } from "./open-exoplanet-catalogue";

jest.mock("../utils/http");

const catalogUrl =
  "https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets";

describe("open-exoplanet-catalogue service", () => {
  describe("calls http.get()", () => {
    it("should call http.get with a certain URL", async () => {
      const exoplanet = "I am Bertrand Russell's Teapot";
      http.get.mockResolvedValue([exoplanet]);
      const result = await getExoplanets();
      expect(http.get).toHaveBeenCalledWith(catalogUrl);
      expect(result).toEqual(expect.arrayContaining([exoplanet]));
    });
  });
});
