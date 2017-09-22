import * as React from "react";

interface PGoogleMap {
  tmp?: string;
}
export default class GoogleMap extends React.Component<PGoogleMap, {}>{
  private map: google.maps.Map;

  private latlng = new google.maps.LatLng(-34.397, 150.644);
  public componentDidMount() {
    const mapOptions: google.maps.MapOptions = {
      zoom: 8,
      center: this.latlng
    };

    const elem = document.getElementById("google-map");
    this.map = new google.maps.Map(elem, mapOptions);

  }
  public render() {
    return <div id="google-map" />;
  }
}
