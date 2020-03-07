import Location from "./location.js";
import City from "./city.js";
import Owner from "./owner";
import {getOfferType} from "../utils.js";

export default class Offer {
  constructor(data) {

    const host = data[`host`];
    if (host) {
      this.owner = Owner.parseOwner(host);
    }

    const location = data[`location`];
    if (location) {
      this.location = Location.parseLocation(location);
    }

    const city = data[`city`];
    if (city) {
      this.city = City.parseCity(city);
    }

    this.id = data[`id`];
    this.isPremium = data[`is_premium`];
    this.isMarked = data[`is_favorite`];
    this.cost = data[`price`];
    this.rating = data[`rating`];
    this.name = data[`title`];
    this.description = data[`description`];
    this.roomsCount = data[`bedrooms`];
    this.membersCount = data[`max_adults`];
    this.type = getOfferType(data[`type`]);
    this.image = data[`preview_image`];
    this.images = data[`images`];
    this.features = data[`goods`];
  }

  get cityName() {
    return this.city.name;
  }

  get center() {
    return this.location.center;
  }

  get zoom() {
    return this.location.zoom;
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
