import * as React from "react";
import loadScript from "modules/loadScript";

interface PGoogleMap {
  center?: google.maps.LatLng;
  zoom?: number;
  region?: google.maps.Data.MultiPolygon;
  chosen?: google.maps.Data.Point;
  venues?: Array<google.maps.Data.Point>;
}

export default class GoogleMap extends React.Component<PGoogleMap, {}>{
  constructor(props: PGoogleMap) {
    super(props);
    const src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAL2cgmMDJB355Ln78OvsygHGmFqwW_l4k";
    this.scriptLoader = loadScript(src);
  }
  private scriptLoader: Promise<boolean>;
  private map: google.maps.Map | null = null;
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
  public async componentDidMount() {
    await this.scriptLoader;
    const center = new google.maps.LatLng(-34.397, 150.644);
    const zoom = 8;
    const elem = document.getElementById("google-map");
    this.map = new google.maps.Map(elem);
    this.map.setCenter(center);
    this.map.setZoom(zoom);
  }
  public componentWillUnmount() {
    this.map = null;
  }
  public render() {
    return <div id="google-map" />;
  }
}
