import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {OfferShape} from "../../settings.js";
import {ViewMode as ViewMode, VIEWMODES} from '../../consts.js';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this._mapRef = createRef();
    this._map = null;
    this._markers = [];
    this._isMapInit = false;

    this._mapSettings = {
      center: [52.38333, 4.9],
      zoom: 12,
      zoomControl: false,
      marker: true
    };
  }

  get isAvaliableInit() {
    const {offers, activeOffer} = this.props;
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
    const {offers: prevOffers, activeOffer: prevActiveOffer, hoveredOffer: prevHoveredOffer} = prevProps;
    const {offers, activeOffer, hoveredOffer} = this.props;

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

    if (isActiveOfferChanged || isOfferschanged || isPrevOfferschanged || isHoveredOfferChanged) {
      this.clearMarkers();
      this.initMarkers();
    }
  }

  initMap() {

    this._map = leaflet.map(this._mapRef.current, this._mapSettings);

    const {center, zoom} = this._mapSettings;
    this._map.setView(center, zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._map);

    this._isMapInit = true;
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
    const {offers, activeOffer, hoveredOffer} = this.props;

    const displayOfferd = hoveredOffer !== null ? offers.slice().filter((offer) => offer.id !== hoveredOffer.id) : offers.slice();

    this.addMapMarkers(displayOfferd);

    if (hoveredOffer !== null) {
      this.addMarker(hoveredOffer.lonlat, this.getMarkerTemplate(true));
    }

    if (activeOffer !== null) {
      this.addMarker(activeOffer.lonlat, this.getMarkerTemplate(true));
    }
  }

  addMapMarkers(offers) {
    if (this._map !== null) {
      offers.forEach((offer) => {
        this.addMarker(offer.lonlat, this.getMarkerTemplate());
      });
    }
  }

  addMarker(lonlat, icon) {
    const marker = leaflet.marker(lonlat, {icon}).addTo(this._map);
    this._markers.push(marker);
  }

  getMarkerTemplate(isActive = false) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
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

Map.defaultProps = {
  activeOffer: null,
  hoveredOffer: null
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape)).isRequired,
  activeOffer: PropTypes.shape(OfferShape),
  hoveredOffer: PropTypes.shape(OfferShape),
  viewMode: PropTypes.oneOf(VIEWMODES).isRequired
};

export default Map;
