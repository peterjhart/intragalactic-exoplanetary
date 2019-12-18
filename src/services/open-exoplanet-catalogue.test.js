import http from "../utils/http";
import {
  getExoplanets,
  getOrphanExoplanets,
  getExoplanetsForHottestStar,
  groupExoplanetDiscoveriesByYear,
  groupExoplanetsBySize
} from "./open-exoplanet-catalogue";

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

  describe("interprets exoplanet data", () => {
    const exoplanets = [
      {
        PlanetIdentifier: "PSO J318.5-22",
        TypeFlag: 3,
        PlanetaryMassJpt: 6.5,
        RadiusJpt: 1.53,
        PeriodDays: "",
        SemiMajorAxisAU: "",
        Eccentricity: "",
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: 1160,
        AgeGyr: "",
        DiscoveryMethod: "imaging",
        DiscoveryYear: 2013,
        LastUpdated: "13/10/03",
        RightAscension: "21 14 08",
        Declination: "+22 51 36",
        DistFromSunParsec: 24.6,
        HostStarMassSlrMass: "",
        HostStarRadiusSlrRad: "",
        HostStarMetallicity: "",
        HostStarTempK: "",
        HostStarAgeGyr: ""
      },
      {
        PlanetIdentifier: "HD 40307 b",
        TypeFlag: 0,
        PlanetaryMassJpt: 0.01258,
        RadiusJpt: "",
        PeriodDays: 4.3123,
        SemiMajorAxisAU: 0.0468,
        Eccentricity: 0.2,
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: 804.5,
        AgeGyr: "",
        DiscoveryMethod: "RV",
        DiscoveryYear: 2008,
        LastUpdated: "12/11/08",
        RightAscension: "05 54 04",
        Declination: "-60 01 24",
        DistFromSunParsec: 12.8,
        HostStarMassSlrMass: 0.77,
        HostStarRadiusSlrRad: "",
        HostStarMetallicity: -0.31,
        HostStarTempK: 4977,
        HostStarAgeGyr: ""
      },
      {
        PlanetIdentifier: "CFBDSIR2149",
        TypeFlag: 3,
        PlanetaryMassJpt: 5.5,
        RadiusJpt: "",
        PeriodDays: "",
        SemiMajorAxisAU: "",
        Eccentricity: "",
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: "",
        AgeGyr: "",
        DiscoveryMethod: "imaging",
        DiscoveryYear: 2012,
        LastUpdated: "12/11/14",
        RightAscension: "21 49 47",
        Declination: "-04 03 08",
        DistFromSunParsec: 40,
        HostStarMassSlrMass: "",
        HostStarRadiusSlrRad: "",
        HostStarMetallicity: "",
        HostStarTempK: "",
        HostStarAgeGyr: ""
      },
      {
        PlanetIdentifier: "Kepler-291 b",
        TypeFlag: 0,
        PlanetaryMassJpt: "",
        RadiusJpt: 0.19684,
        PeriodDays: 3.546511,
        SemiMajorAxisAU: "",
        Eccentricity: "",
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: "",
        AgeGyr: "",
        DiscoveryMethod: "transit",
        DiscoveryYear: 2014,
        LastUpdated: "14/02/26",
        RightAscension: "19 11 39",
        Declination: "+42 26 14",
        DistFromSunParsec: 1899.9,
        HostStarMassSlrMass: 1.01,
        HostStarRadiusSlrRad: 1.016,
        HostStarMetallicity: "",
        HostStarTempK: 6002,
        HostStarAgeGyr: ""
      },
      {
        PlanetIdentifier: "Kepler-291 c",
        TypeFlag: 0,
        PlanetaryMassJpt: "",
        RadiusJpt: 0.17132,
        PeriodDays: 5.700786,
        SemiMajorAxisAU: "",
        Eccentricity: "",
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: "",
        AgeGyr: "",
        DiscoveryMethod: "transit",
        DiscoveryYear: 2014,
        LastUpdated: "14/02/26",
        RightAscension: "19 11 39",
        Declination: "+42 26 14",
        DistFromSunParsec: 1899.9,
        HostStarMassSlrMass: 1.01,
        HostStarRadiusSlrRad: 1.016,
        HostStarMetallicity: "",
        HostStarTempK: 6002,
        HostStarAgeGyr: ""
      },
      {
        PlanetIdentifier: "CT Cha B",
        TypeFlag: 0,
        PlanetaryMassJpt: "",
        RadiusJpt: 2.4,
        PeriodDays: "",
        SemiMajorAxisAU: "",
        Eccentricity: "",
        PeriastronDeg: "",
        LongitudeDeg: "",
        AscendingNodeDeg: "",
        InclinationDeg: "",
        SurfaceTempK: 2500,
        AgeGyr: "",
        DiscoveryMethod: "imaging",
        DiscoveryYear: 2008,
        LastUpdated: "15/06/08",
        RightAscension: "11 04 09",
        Declination: "-76 27 19",
        DistFromSunParsec: 165,
        HostStarMassSlrMass: "",
        HostStarRadiusSlrRad: "",
        HostStarMetallicity: "",
        HostStarTempK: 5150,
        HostStarAgeGyr: ""
      }
    ];

    it("should get the planets that do not orbit a star", () => {
      const result = getOrphanExoplanets(exoplanets);
      expect(result.length).toBe(2);
      const ids = result.map(r => r.PlanetIdentifier);
      const expectedIds = ["CFBDSIR2149", "PSO J318.5-22"];
      expect(ids).toEqual(expect.arrayContaining(expectedIds));
    });

    it("should get the planets that orbit the hottest star", () => {
      const result = getExoplanetsForHottestStar(exoplanets);
      expect(result.length).toBe(2);
      const ids = result.map(r => r.PlanetIdentifier);
      const expectedIds = ["Kepler-291 b", "Kepler-291 c"];
      expect(ids).toEqual(expect.arrayContaining(expectedIds));
    });

    it("should group planets by the year they were discovered", () => {
      const result = groupExoplanetDiscoveriesByYear(exoplanets);
      const expectedYears = ["2008", "2012", "2013", "2014"];
      expect(Object.keys(result)).toEqual(expectedYears);
      expect(result["2008"].length).toEqual(2);
      expect(result["2012"].length).toEqual(1);
      expect(result["2013"].length).toEqual(1);
      expect(result["2014"].length).toEqual(2);
    });

    it("should group planets by size", () => {
      const result = groupExoplanetsBySize(exoplanets);
      const expectedSizes = ["other", "small", "medium", "large"];
      const sizes = Object.keys(result);
      expect(sizes.length).toEqual(4);
      expect(sizes).toEqual(expect.arrayContaining(expectedSizes));
      expect(result.other.length).toEqual(2);
      expect(result.small.length).toEqual(2);
      expect(result.medium.length).toEqual(1);
      expect(result.large.length).toEqual(1);
    });
  });
});
