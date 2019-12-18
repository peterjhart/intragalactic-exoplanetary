import filter from "lodash/filter";
import groupBy from "lodash/groupBy";
import maxBy from "lodash/maxBy";
import http from "../utils/http";

const URL =
  "https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets";

/**
 * @function getExoplanets
 * @public
 * @returns {Promise<Array>}
 */
export function getExoplanets() {
  return http.get(URL);
}

/**
 * @function getOrphanExoplanets
 * @public
 * @param {Array} exoplanets
 * @returns {Array}
 */
export function getOrphanExoplanets(exoplanets) {
  return filter(exoplanets, p => p.TypeFlag === 3);
}

/**
 * @function getMaxStarKelvins
 * @private
 * @param {Array} exoplanets
 * @returns {undefined | Number}
 */
function getMaxStarKelvins(exoplanets) {
  const planetOfMaxKStar = maxBy(exoplanets, "HostStarTempK");
  return planetOfMaxKStar && planetOfMaxKStar.HostStarTempK;
}

/**
 * @function getExoplanetsForHottestStar
 * @public
 * @param {Array} exoplanets
 * @returns {Array}
 */
export function getExoplanetsForHottestStar(exoplanets) {
  const maxK = getMaxStarKelvins(exoplanets);
  return filter(exoplanets, p => p.HostStarTempK === maxK);
}

/**
 * @function groupExoplanetDiscoveriesByYear
 * @public
 * @param {Array} exoplanets
 * @returns {Object}
 */
export function groupExoplanetDiscoveriesByYear(exoplanets) {
  return groupBy(exoplanets, "DiscoveryYear");
}

/**
 * @function groupExoplanetsBySize
 * @private
 * @param {Array} exoplanets
 * @returns {Object}
 */
export function groupExoplanetsBySize(exoplanets) {
  return groupBy(exoplanets, groupExoplanetsBySizeIteratee);
}

/**
 * @function groupExoplanetsBySizeIteratee
 * @private
 * @param {Object} exoplanet
 * @returns {string}
 */
function groupExoplanetsBySizeIteratee(exoplanet) {
  if (!exoplanet.RadiusJpt) {
    return "other";
  } else if (exoplanet.RadiusJpt < 1) {
    return "small";
  } else if (exoplanet.RadiusJpt < 2) {
    return "medium";
  } else {
    return "large";
  }
}
