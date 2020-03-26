
export const Feature = {
  WIFI: `Wi-Fi`,
  WASHINGMACHINE: `Washing machine`,
  TOWELS: `Towels`,
  HEATING: `Heating`,
  COFFEEMACHINE: `Coffee machine`,
  BABYSET: `Baby seat`,
  KITCHEN: `Kitchen`,
  DISHWASHER: `Dishwasher`,
  CABELTV: `Cabel TV`,
  FRIDGE: `Fridge`
};

export const FEATURES = [
  Feature.WIFI,
  Feature.WASHINGMACHINE,
  Feature.HEATING,
  Feature.COFFEEMACHINE,
  Feature.BABYSET,
  Feature.DISHWASHER,
  Feature.CABELTV,
  Feature.FRIDGE
];

export const OfferType = {
  APARTMENT: `Apartment`,
  ROOM: `Private room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const OFFERTYPES = [
  OfferType.APARTMENT,
  OfferType.ROOM,
  OfferType.HOUSE,
  OfferType.HOTEL
];

export const ViewMode = {
  Main: 0,
  Property: 1,
  Favorite: 2
};

export const VIEWMODES = [
  ViewMode.Main,
  ViewMode.Property,
  ViewMode.Favorite
];

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const MAX_REVIEWS_DISPLAY_COUNT = 10;

export const MAX_IMAGES_DISPLAY_COUNT = 6;
export const MAX_NEAR_DISPLAY_COUNT = 3;

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LH: `Price: low to high`,
  PRICE_HL: `Price: high to low`,
  TOPRATED: `Top rated first`
};

export const SORTTYPES = [
  SortType.POPULAR,
  SortType.PRICE_LH,
  SortType.PRICE_HL,
  SortType.TOPRATED
];

export const RatingValues = [5, 4, 3, 2, 1];

export const ErrorType = {
  UNAUTHORIZED: 401,
  BABREQUEST: 400
};

export const TIMEOUT = 5000;
export const URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

export const AuthStatus = {
  NO_AUTH: `NO_AUTH`,
  LOADING: `LOADING`,
  AUTH: `AUTH`
};

export const LoadingStatus = {
  DEFAULT: `DEFAULT`,
  SUCCESS: `SUCCESS`,
  LOADING: `LOADING`,
  ERROR: `ERROR`
};

export const LoadingStatuses = [
  LoadingStatus.DEFAULT,
  LoadingStatus.SUCCESS,
  LoadingStatus.LOADING,
  LoadingStatus.ERROR
];

export const Url = {
  COMMENTS: `comments`,
  HOTELS: `hotels`,
  FAVORITE: `favorite`,
  LOGIN: `login`,
  NEARBY: `nearby`
};

export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
  ROOT: `/`,
};


export const FavoriteState = {
  MARKED: 1,
  UNMARKED: 0
};

export const FavoriteButtonType = {
  PROPERTY: 1,
  CARD: 0
};

export const FavoriteButtonTypes = [
  FavoriteButtonType.PROPERTY,
  FavoriteButtonType.CARD
];

export const ImageCardWidth = {
  CARD_WIDTH: 260,
  CARD_HEIGHT: 200,
  FAVORITE_WIDTH: 150,
  FAVORITE_HEIGHT: 110
};
