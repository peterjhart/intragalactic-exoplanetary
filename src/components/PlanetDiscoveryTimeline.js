import React, { Component } from "react";
import map from "lodash/map";
import {
  groupExoplanetDiscoveriesByYear,
  groupExoplanetsBySize
} from "../services/open-exoplanet-catalogue";

class PlanetDiscoveryTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exoplanets: props.exoplanets
    };
  }

  tableRow(year, discoveries) {
    const sizes = {
      small: [],
      medium: [],
      large: [],
      other: [],
      ...groupExoplanetsBySize(discoveries)
    };
    return (
      <tr key={year}>
        <td>{year || "--"}</td>
        <td className="text-center">{sizes.small.length}</td>
        <td className="text-center">{sizes.medium.length}</td>
        <td className="text-center">{sizes.large.length}</td>
        <td className="text-center">{sizes.other.length}</td>
      </tr>
    );
  }

  tableRows(exoplanets) {
    const exoplanetsByYear = groupExoplanetDiscoveriesByYear(exoplanets);
    const years = Object.keys(exoplanetsByYear);
    years.sort();
    return map(years, year => this.tableRow(year, exoplanetsByYear[year]));
  }

  render() {
    return (
      <div>
        <h3 className="text-center mb-3">Timeline of Discovery</h3>
        <p>
          Below is a list of years when exoplanets were discovered, and how many
          small, medium, and large planets were discovered that year.
        </p>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col" className="text-center">
                Small
              </th>
              <th scope="col" className="text-center">
                Medium
              </th>
              <th scope="col" className="text-center">
                Large
              </th>
              <th scope="col" className="text-center">
                Unknown
              </th>
            </tr>
          </thead>
          <tbody>{this.tableRows(this.state.exoplanets)}</tbody>
        </table>
      </div>
    );
  }
}

export default PlanetDiscoveryTimeline;
