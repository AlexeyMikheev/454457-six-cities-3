import {OfferType} from "./consts";

export interface Location {
    latitude: number;
    longitude: number;
    zoom: number;
    center: number[];
}

export interface City {
    name: string;
    location: Location;
    center: number[];
    zoom: number;
}

export interface Owner {
    id: number;
    name: string;
    avatar: string;
    isTrust: boolean;
}

export interface Offer {
    owner: Owner;
    location: Location;
    city: City;
    id: number;
    isPremium: boolean;
    isMarked: boolean;
    cost: number;
    rating: number;
    name: string;
    description: string;
    roomsCount: number;
    membersCount: number;
    type: OfferType;
    image: string;
    images: string[];
    features: string[];
    cityName: string;
    center: number[];
    zoom: number;
}

export interface UserInfo {
  avatar_url: string;
  email: string;
  id: number;
  is_pro: boolean;
  name: string;
}

export interface Review{
    id: number;
    comment: string;
    rating: number;
    date: number;
    user: Owner;
  }

export type HoveredChangeArgType = number | null;
export type SendCommentArgType = {
    rating: string;
    comment: string;
}
export type FormValueArgsType = {
    target: {
        name: string;
        value: string;
    };
}

export type SubmitArgsType = {
    login: string;
    password: string;
}

export interface FormState{
    [key: string]: string;
 }

export interface BooleanState{
    isToggled: boolean;
 }

export type OfferHoveredChangeFunction = (offerId: HoveredChangeArgType) => void | null;
export type OfferChangeFunction = (offerId: number) => void;
export type CityChangeFunction = (cityName: string) => void;
export type SendCommentFunction = (offerId: number, args: SendCommentArgType) => void;
export type FormValueChangeFunction = (args: FormValueArgsType) => void;
export type FormSubmitFunction = (args: SubmitArgsType) => void;

export type EmptyFunction = () => void;

export type MapSetting = {
    zoomControl: boolean;
    marker: boolean;
}
