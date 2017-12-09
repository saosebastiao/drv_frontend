import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditSocialModel from "./Model";
import ViewSquadModel from "../Model";
import Gallery from "shared/Gallery";

interface PEditSocial extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

const photos = [
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png",
  "https://bulma.io/images/placeholders/256x256.png"
];

@observer
export default class EditSocial extends React.Component<PEditSocial> {
  private model = new EditSocialModel(this.props.model.squadID);

  public render() {
    return this.model.isReady ? (
      <div className="box">
        Social Media Placeholder
        <Gallery height={480} width={480} photos={photos} />
      </div>
    ) : null;
  }
}
