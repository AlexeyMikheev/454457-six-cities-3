import * as React from "react";
import * as leaflet from "leaflet";
import {Offer, City, MapSetting} from "../../types";
import {ViewMode} from '../../consts';

interface Props{
  offers: Offer[];
  activeOffer: Offer;
  hoveredOffer: Offer;
  viewMode: ViewMode;
  currentCity: City;
}

class Map extends React.PureComponent<Props> {
  private _mapRef = null;
  private _map = null;
  private _markers = [];
  private _isMapInit = false;
  private _mapSettings: MapSetting = null;

  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
    this._map = null;
    this._markers = [];
    this._isMapInit = false;

    this._mapSettings = {
      zoomControl: false,
      marker: true
    };
  }

  get isAvaliableInit() {
    const {offers, activeOffer = null} = this.props;
    return this._mapRef && this._mapRef.current && ((offers && offers.length) || activeOffer);
  }

  componentDidMount() {
    if (this.isAvaliableInit) {
      this.initMap();
      this.initMarkers();
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  componentDidUpdate(prevProps) {
    if (!this.isAvaliableInit) {
      return;
    }

    if (!this._isMapInit) {
      this.initMap();
    }

    const {offers: prevOffers, activeOffer: prevActiveOffer = null, hoveredOffer: prevHoveredOffer = null, currentCity: prevCurrentCity} = prevProps;
    const {offers, activeOffer = null, hoveredOffer = null, currentCity} = this.props;

    const isActiveOfferChanged = (prevActiveOffer !== null && activeOffer !== null && prevActiveOffer.id !== activeOffer.id);

    const isHoveredOfferChanged = (prevActiveOffer !== null && activeOffer !== null && prevActiveOffer.id !== activeOffer.id) ||
    (prevHoveredOffer !== null && hoveredOffer === null) ||
    (prevHoveredOffer === null && hoveredOffer !== null);

    const isOfferschanged = !offers.every((offer) => {
      return prevOffers.some((prevOffer) => {
        return offer.id === prevOffer.id;
      });
    });

    const isPrevOfferschanged = !prevOffers.every((prevOffer) => {
      return offers.some((offer) => {
        return prevOffer.id === offer.id;
      });
    });

    const isCurrentCityChanged = prevCurrentCity.name.toLowerCase() !== currentCity.name.toLowerCase();

    if (isActiveOfferChanged || isOfferschanged || isPrevOfferschanged || isHoveredOfferChanged) {
      this.clearMarkers();
      this.initMarkers();
    }

    if (isCurrentCityChanged) {
      this.setMapView(currentCity);
    }

    if (isActiveOfferChanged) {
      this.setMapView(activeOffer);
    }
  }

  initMap() {
    const {currentCity} = this.props;

    this._map = leaflet.map(this._mapRef.current, this._mapSettings);

    this.setMapView(currentCity);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._map);

    this._isMapInit = true;
  }

  setMapView({center, zoom}) {
    this._map.setView(center, zoom);
  }

  clearMarkers() {
    if (this._map !== null) {
      this._markers.forEach((marker) => {
        this._map.removeLayer(marker);
      });
    }
    this._markers = [];
  }

  initMarkers() {
    const {offers, activeOffer = null, hoveredOffer = null} = this.props;

    const displayOfferd = hoveredOffer ? offers.slice().filter((offer) => offer.id !== hoveredOffer.id) : offers.slice();

    this.addMapMarkers(displayOfferd);

    if (hoveredOffer !== null) {
      this.addMarker(hoveredOffer.center, this.getMarkerTemplate(true));
    }

    if (activeOffer !== null) {
      this.addMarker(activeOffer.center, this.getMarkerTemplate(true));
    }
  }

  addMapMarkers(offers) {
    if (this._map !== null) {
      offers.forEach((offer) => {
        this.addMarker(offer.center, this.getMarkerTemplate());
      });
    }
  }

  addMarker(latlon, icon) {
    const marker = leaflet.marker(latlon, {icon}).addTo(this._map);
    this._markers.push(marker);
  }

  getMarkerTemplate(isActive = false) {
    return leaflet.icon({
      iconUrl: isActive ? `/img/pin-active.svg` : `/img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  destroy() {
    if (this._isMapInit) {
      this._map.remove();
      this._map = null;
      this._markers = [];
      this._isMapInit = false;
    }
  }

  render() {
    const {viewMode} = this.props;

    const isNearViewMode = viewMode === ViewMode.Property;

    return (
      <section className={`map ${isNearViewMode ? `property__map` : `cities__map`}`}><div style={{width: `100%`, height: `100%`}} ref={this._mapRef}></div></section>
    );
  }
}

export default Map;
