import {MAX_RATING} from "./consts.js";

export const getRatingPercents = (value) => Math.floor(value) * 100 / MAX_RATING;

