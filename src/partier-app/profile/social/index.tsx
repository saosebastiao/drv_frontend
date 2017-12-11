import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import ProfileModel from "../Model";
import Gallery from "shared/Gallery";

interface PEditSocial extends RouteComponentProps<{}> {
  model: ProfileModel;
}

const photos = [
  "https://bulma.io/images/placeholders/16x16.png",
  "https://bulma.io/images/placeholders/24x24.png",
  "https://bulma.io/images/placeholders/32x32.png",
  "https://bulma.io/images/placeholders/48x48.png",
  "https://bulma.io/images/placeholders/64x64.png",
  "https://bulma.io/images/placeholders/96x96.png",
  "https://bulma.io/images/placeholders/128x128.png"
];

@observer
export default class EditSocial extends React.Component<PEditSocial> {
  private profile = new EditProfileModel;
  constructor(props: any) {
    super(props);
  }

  public render() {
    return this.profile.isReady ? (
      <div className="box">
        Social Media Placeholder
        <Gallery height={480} width={480} photos={photos} />
      </div>
    ) : null;
  }
}
