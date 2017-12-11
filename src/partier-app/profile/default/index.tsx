import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";
import PartierCard from "shared/cards/PartierCard";
import { getUserID } from "modules/DroverClient";
import Gallery from "shared/Gallery";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class Profile extends React.Component<PProfile> {
  private model: ProfileModel;

  constructor(props: RouteComponentProps<{}> & PProfile) {
    super(props);
    this.model = this.props.model;
  }

  public render() {
    return (
      <div className="columns">
        <Gallery photos={this.model.photos} />
        <div className="column is-4">
          <div className="box">
            <h1 className="title">
              {this.model.name} &nbsp;
              <span className="icon">
                {this.model.gender === "female" ?
                  <i className="fa fa-venus" aria-hidden="true" /> : null}
                {this.model.gender === "male" ?
                  <i className="fa fa-mars" aria-hidden="true" /> : null}
              </span>
            </h1>
            <h2 className="subtitle">
              {this.model.defaultRegion}
            </h2>
            <div>
              <a
                className="btn btn-md btn-primary"
                href={`/api/partier/${getUserID()}/stripe`}
                target="_blank">
                {this.model.stripeAccountID ? "Manage Payment Account" : "Create Payment Account"}
              </a>
            </div>
          </div>
          {this.model.invitations.length > 0 ?
            <div className="box">
              <h2 className="subtitle">Invitations From Friends</h2>
              <ul className="list-group">
                {this.model.invitations.map((x) => {
                  return (<PartierCard key={x} userID={x} />);
                })}
              </ul>
            </div> : null
          }
          <div className="box">
            <h2 className="subtitle">Accepted Friends</h2>
            <ul className="list-group">
              {this.model.accepted.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
