export default class Location {
  constructor(data) {
    this.latitude = parseFloat(data[`latitude`], 10) || 0;
    this.longitude = parseFloat(data[`longitude`], 10) || 0;
    this.zoom = parseFloat(data[`zoom`], 10) || 0;
  }

  get center() {
    return [this.latitude, this.longitude];
  }

  static parseLocation(data) {
    return new Location(data);
  }
}
