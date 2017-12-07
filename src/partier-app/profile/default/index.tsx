import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";
import PartierCard from "shared/cards/PartierCard";
import { getUserID } from "modules/DroverClient";
import { observable } from "mobx";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class Profile extends React.Component<PProfile> {
  private model: ProfileModel;

  @observable private selectedPhoto: number = 0;
  private selectPhoto = (idx: number) => () => this.selectedPhoto = idx;

  constructor(props: RouteComponentProps<{}> & PProfile) {
    super(props);
    this.model = this.props.model;
  }

  public render() {
    return (
      <div className="columns">
        <div className="column is-4">
          <div className="box">
            <div className="tile is-ancestor is-verticle">
              <div className="tile is-parent is-vertical">
                <div className="box">
                  <div className="tile">
                    {this.model.photos[this.selectedPhoto] ?
                      <img src={this.model.photos[this.selectedPhoto]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                </div>
                <div className="tile is-parent">
                  {[0, 1, 2, 3, 4].map(idx =>
                    <div key={idx} className="tile is-child">
                      {this.model.photos[idx] ?
                        <figure className="image is-square">
                          <img src={this.model.photos[idx]} onClick={this.selectPhoto(idx)} />
                        </figure> :
                        <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
