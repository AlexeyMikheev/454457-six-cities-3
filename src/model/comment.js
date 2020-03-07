import Owner from "./owner.js";
import {paserDate} from "../utils.js";

export default class Comemnt {
  constructor(data) {
    this.id = data[`id`];
    this.comment = data[`comment`];
    this.rating = parseInt(data[`rating`], 10);
    this.date = paserDate(data[`date`]);
    this.user = Owner.parseOwner(data[`user`]);
  }

  static parseComemnt(data) {
    return new Comemnt(data);
  }

  static parseComemnts(data) {
    return data.map(Comemnt.parseComemnt);
  }
}
