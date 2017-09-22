import * as React from "react";

interface PGoogleMap {
  center?: google.maps.LatLng;
  zoom?: number;
  region?: google.maps.Data.MultiPolygon;
  chosen?: google.maps.Data.Point;
  venues?: Array<google.maps.Data.Point>;
}

export default class GoogleMap extends React.Component<PGoogleMap, {}>{
  private map: google.maps.Map | null = null;
  private latlng = new google.maps.LatLng(-34.397, 150.644);
  private zoom = 8;
  private get mapOptions(): google.maps.MapOptions {
    return {
      zoom: this.zoom,
      center: this.latlng
    };
  }
  public shouldComponentUpdate() {
    return false;
  }
  public componentWillReceiveProps(next: PGoogleMap) {
    // tslint:disable-next-line:no-console
    console.log(next);
    if (this.map) {
      if (next.center) {
        this.map.setCenter(next.center);
      }
      if (next.zoom) {
        this.map.setZoom(next.zoom);
      }
      if (next.region) {
        this.map.data.add({ geometry: next.region });
      }
    }
  }
  public componentDidMount() {
    const elem = document.getElementById("google-map");
    this.map = new google.maps.Map(elem, this.mapOptions);
  }
  public componentWillUnmount() {
    this.map = null;
  }
  public render() {
    return <div id="google-map" />;
  }
}
