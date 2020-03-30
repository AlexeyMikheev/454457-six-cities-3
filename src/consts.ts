export enum Feature {
    WIFI= `Wi-Fi`,
    WASHINGMACHINE= `Washing machine`,
    TOWELS= `Towels`,
    HEATING= `Heating`,
    COFFEEMACHINE= `Coffee machine`,
    BABYSET= `Baby seat`,
    KITCHEN= `Kitchen`,
    DISHWASHER= `Dishwasher`,
    CABELTV= `Cabel TV`,
    FRIDGE= `Fridge`
  }

export const FEATURES: Feature[] = [
  Feature.WIFI,
  Feature.WASHINGMACHINE,
  Feature.HEATING,
  Feature.COFFEEMACHINE,
  Feature.BABYSET,
  Feature.DISHWASHER,
  Feature.CABELTV,
  Feature.FRIDGE
];

export enum OfferType {
  APARTMENT= `Apartment`,
  ROOM= `Private room`,
  HOUSE= `House`,
  HOTEL= `Hotel`
}

export const OFFERTYPES: OfferType[] = [
  OfferType.APARTMENT,
  OfferType.ROOM,
  OfferType.HOUSE,
  OfferType.HOTEL
];

export enum ViewMode {
  Main= 0,
  Property= 1,
  Favorite= 2
}

// export const VIEWMODES: ViewMode[] = [
//   ViewMode.Main,
//   ViewMode.Property,
//   ViewMode.Favorite
// ];

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const MAX_REVIEWS_DISPLAY_COUNT = 10;

export const MAX_IMAGES_DISPLAY_COUNT = 6;
export const MAX_NEAR_DISPLAY_COUNT = 3;

export enum SortType {
  POPULAR= `Popular`,
  PRICE_LH= `Price: low to high`,
  PRICE_HL= `Price: high to low`,
  TOPRATED= `Top rated first`
}

export const SORTTYPES: SortType[] = [
  SortType.POPULAR,
  SortType.PRICE_LH,
  SortType.PRICE_HL,
  SortType.TOPRATED
];

export const RatingValues = [`5`, `4`, `3`, `2`, `1`];

export enum ErrorType {
  UNAUTHORIZED= 401,
  BABREQUEST= 400,
  NOTFOUND= 404
}

export const TIMEOUT = 5000;
export const URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

export enum AuthStatus {
    NO_AUTH= `NO_AUTH`,
    LOADING= `LOADING`,
    AUTH= `AUTH`
  }

export enum LoadingStatus {
  DEFAULT= `DEFAULT`,
  SUCCESS= `SUCCESS`,
  LOADING= `LOADING`,
  ERROR= `ERROR`
}

export const LoadingStatuses: LoadingStatus[] = [
  LoadingStatus.DEFAULT,
  LoadingStatus.SUCCESS,
  LoadingStatus.LOADING,
  LoadingStatus.ERROR
];

export enum Url {
  COMMENTS= `comments`,
  HOTELS= `hotels`,
  FAVORITE= `favorite`,
  LOGIN= `login`,
  NEARBY= `nearby`
}

export enum AppRoute {
  LOGIN= `/login`,
  FAVORITES= `/favorites`,
  OFFER= `/offer`,
  ROOT= `/`,
}


export enum FavoriteState {
  MARKED= 1,
  UNMARKED= 0
}

export enum FavoriteButtonType {
  PROPERTY= 1,
  CARD= 0
}

// export const FavoriteButtonTypes = [
//   FavoriteButtonType.PROPERTY,
//   FavoriteButtonType.CARD
// ];

export enum ImageCardWidth {
  CARD_WIDTH= 260,
  CARD_HEIGHT= 200,
  FAVORITE_WIDTH= 150,
  FAVORITE_HEIGHT= 110
}

export const MIN_COMMENT_LENGTH = 50;
