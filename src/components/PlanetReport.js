import React, { Component } from "react";
import map from "lodash/map";
import {
  getExoplanets,
  getOrphanExoplanets,
  getExoplanetsForHottestStar
} from "../services/open-exoplanet-catalogue";
import PlanetDiscoveryTimeline from "./PlanetDiscoveryTimeline";

class PlanetReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  async componentDidMount() {
    try {
      const exoplanets = await getExoplanets();
      const orphanExoplanets = getOrphanExoplanets(exoplanets);
      const orphanExoplanetCount = orphanExoplanets
        ? orphanExoplanets.length
        : 0;
      const exoplanetsOfHottestStar = getExoplanetsForHottestStar(exoplanets);
      const exoplanetNamesOfHottestStar = map(
        exoplanetsOfHottestStar,
        "PlanetIdentifier"
      ).join(", ");
      this.setState({
        count: exoplanets.length,
        exoplanets,
        exoplanetsOfHottestStar,
        exoplanetNamesOfHottestStar,
        loaded: true,
        orphanExoplanetCount
      });
    } catch (e) {}
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Planetary Report</h1>
        {this.state.loaded ? (
          <div>
            <div className="mb-5">
              <p>
                There
                {this.state.count === 1
                  ? " is one exoplanet "
                  : ` are ${this.state.count} exoplanets `}
                currently known to science.
              </p>

              <p>
                {this.state.orphanExoplanetCount === 1
                  ? "One planet "
                  : `${this.state.orphanExoplanetCount} planets `}
                do not have a star to call their own.
              </p>

              {this.state.exoplanetsOfHottestStar.length && (
                <p>
                  {this.state.exoplanetNamesOfHottestStar}
                  {this.state.exoplanetsOfHottestStar.length === 1
                    ? " orbits "
                    : " orbit "}
                  the hottest known star to host exoplanets, at a scorching{" "}
                  {this.state.exoplanetsOfHottestStar[0].HostStarTempK} kelvins.
                </p>
              )}
            </div>
            <PlanetDiscoveryTimeline exoplanets={this.state.exoplanets} />
            <div className="card">
              <div className="card-body p-2">
                <small className="text-muted">
                  Sources:
                  <ul className="mb-1">
                    <li>
                      <a
                        href="https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets"
                        className="text-muted"
                      >
                        Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.kaggle.com/mrisdal/open-exoplanet-catalogue"
                        className="text-muted"
                      >
                        Documentation
                      </a>
                    </li>
                  </ul>
                </small>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            <em>loading…</em>
          </div>
        )}
      </div>
    );
  }
}

export default PlanetReport;
