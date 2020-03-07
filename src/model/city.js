import Location from './location.js';

export default class City {
  constructor(data) {
    this.id = undefined;
    this.name = data[`name`];

    const location = data[`location`];
    if (location) {
      this.location = Location.parseLocation(location);
    }
  }

  get center() {
    return this.location.center;
  }

  get zoom() {
    return this.location.zoom;
  }

  static parseCity(data) {
    return new City(data);
  }
}
