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
  private profile: ProfileModel;

  @observable private selectedPhoto: 0 | 1 | 2 | 3 | 4 = 0;
  private selectPhoto = (idx: 0 | 1 | 2 | 3 | 4) => () => this.selectedPhoto = idx;

  constructor(props: RouteComponentProps<{}> & PProfile) {
    super(props);
    this.profile = this.props.model;
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
                    {this.profile.photos[this.selectedPhoto] ?
                      <img src={this.profile.photos[this.selectedPhoto]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child" onClick={this.selectPhoto(0)}>
                    {this.profile.photos[0] ?
                      <img src={this.profile.photos[0]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.selectPhoto(1)}>
                    {this.profile.photos[1] ?
                      <img src={this.profile.photos[1]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.selectPhoto(2)}>
                    {this.profile.photos[2] ?
                      <img src={this.profile.photos[2]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.selectPhoto(3)}>
                    {this.profile.photos[3] ?
                      <img src={this.profile.photos[3]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                  <div className="tile is-child" onClick={this.selectPhoto(4)}>
                    {this.profile.photos[4] ?
                      <img src={this.profile.photos[4]} /> :
                      <img src="https://bulma.io/images/placeholders/256x256.png" alt="Placeholder image" />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="box">
            <h1 className="title">
              {this.profile.name} &nbsp;
              <span className="icon">
                {this.profile.gender === "female" ?
                  <i className="fa fa-venus" aria-hidden="true" /> : null}
                {this.profile.gender === "male" ?
                  <i className="fa fa-mars" aria-hidden="true" /> : null}
              </span>
            </h1>
            <h2 className="subtitle">
              {this.profile.defaultRegion}
            </h2>
            <div>
              <a
                className="btn btn-md btn-primary"
                href={`/api/partier/${getUserID()}/stripe`}
                target="_blank">
                {this.profile.stripeAccountID ? "Manage Payment Account" : "Create Payment Account"}
              </a>
            </div>
          </div>
          {this.profile.invitations.length > 0 ?
            <div className="box">
              <h2 className="subtitle">Invitations From Friends</h2>
              <ul className="list-group">
                {this.profile.invitations.map((x) => {
                  return (<PartierCard key={x} userID={x} />);
                })}
              </ul>
            </div> : null
          }
          <div className="box">
            <h2 className="subtitle">Accepted Friends</h2>
            <ul className="list-group">
              {this.profile.accepted.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
