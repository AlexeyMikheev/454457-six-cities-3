import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {OfferShape} from "../../settings.js";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._mapInstance = null;

    this._mapSettings = {
      center: [52.38333, 4.9],
      zoom: 12,
      zoomControl: false,
      marker: true
    };

    this._markerTemplate = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  componentDidMount() {
    const {offers} = this.props;

    if (offers !== null) {
      const coords = offers.map((offer) => {
        return offer.lonlat;
      });

      this.initMap(coords);
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  initMap(coords) {
    if (!this._mapRef || !this._mapRef.current) {
      return;
    }

    this._mapInstance = leaflet.map(this._mapRef.current, this._mapSettings);

    const {center, zoom} = this._mapSettings;
    this._mapInstance.setView(center, zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._mapInstance);

    this.addMapMarkers(coords);
  }

  addMapMarkers(coords) {
    if (this._mapInstance !== null) {
      coords.forEach((lonlat) => {
        this.addMarker(lonlat);
      });
    }
  }

  addMarker(lonlat) {
    const icon = this._markerTemplate;
    leaflet.marker(lonlat, {icon}).addTo(this._mapInstance);
  }

  destroy() {
    this._mapInstance.remove();
    this._mapInstance = null;
  }

  render() {
    return (
      <section className="cities__map map"><div style={{height: `100%`}} ref={this._mapRef}></div></section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(OfferShape))
};

export default Map;
