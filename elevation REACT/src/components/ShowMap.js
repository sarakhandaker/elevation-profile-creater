import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
const key = process.env.REACT_APP_GOOGLE_API_KEY

const mapStyles = {
  width: '80%',
  height: '80%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'First Address'}
        />
        <Marker
         onClick={this.onMarkerClick}
          name={'Second Address'}
          position={{ lat: this.props.lat2, lng: this.props.lng2 }} />
        <Marker />
        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow> */}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);