export default class Owner {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`name`];
    this.avatar = data[`avatar_url`];
    this.isTrust = data[`is_pro`];
  }

  static parseOwner(data) {
    return new Owner(data);
  }
}
