import React from "react";
import { shallow } from "enzyme";
import {
  getExoplanets,
  getOrphanExoplanets,
  getExoplanetsForHottestStar
} from "../services/open-exoplanet-catalogue";
import PlanetReport from "./PlanetReport";

jest.mock("../services/open-exoplanet-catalogue");

describe("PlanetReport", () => {
  const mockExoplanets = [];
  const mockOrphanExoplanets = [];
  const mockExoplanetsForHottestStar = [];

  beforeEach(() => {
    getExoplanets.mockResolvedValue(mockExoplanets);
    getOrphanExoplanets.mockReturnValue(mockOrphanExoplanets);
    getExoplanetsForHottestStar.mockReturnValue(mockExoplanetsForHottestStar);
  });

  it("should fetch exoplanet data", async () => {
    const component = shallow(<PlanetReport />);
    const instance = component.instance();
    await instance.componentDidMount();
    expect(getExoplanets).toHaveBeenCalled();
    expect(getOrphanExoplanets).toHaveBeenCalled();
    expect(getExoplanetsForHottestStar).toHaveBeenCalled();
  });
});
