import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";
import EditPhotosModel from "./Model";
import GalleryEdit from "shared/GalleryEdit";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditPhotos extends React.Component<PProfile> {
  private model = new EditPhotosModel(this.props.model.photos);
  constructor(props: any) {
    super(props);
  }

  public save = async (photos: Array<IPhoto>) => {
    const res = await this.model.save(photos);
    this.props.model.photos = res;
    this.props.history.push("/partier/profile");
    // go back
  }

  public render() {
    return this.model.photos ? (
      <div className="box">
        <GalleryEdit photos={this.model.photos} save={this.save} />
      </div>
    ) : null;
  }
}
