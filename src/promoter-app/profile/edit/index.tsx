import "bootstrap-sass/assets/javascripts/bootstrap.js";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import { updatePromoterStripeAccount } from "modules/DroverClient";

const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: "16px",
    lineHeight: "24px"
  }
};
const stripe = Stripe("pk_test_GEDUNDpJeAljk63czVCfT9o0");
const elements = stripe.elements();
const cardNumber = elements.create("cardNumber", { style });
const cardExpiration = elements.create("cardExpiry", { style });
const cardCVC = elements.create("cardCvc", { style });
const cardPostal = elements.create("postalCode", { style });

@observer
export default class EditProfile extends React.Component<RouteComponentProps<{}>, {}> {
  public profile = new EditProfileModel;
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    // Add an instance of the card Element into the `card-element` <div>
    cardNumber.mount("#card-number");
    cardNumber.on("change", res => {
      const displayError = document.getElementById("card-number-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    cardExpiration.mount("#card-expiration");
    cardExpiration.on("change", res => {
      const displayError = document.getElementById("card-expiration-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    cardCVC.mount("#card-cvc");
    cardCVC.on("change", res => {
      const displayError = document.getElementById("card-cvc-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    cardPostal.mount("#card-postal");
    cardPostal.on("change", res => {
      const displayError = document.getElementById("card-postal-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
  }
  public componentWillUnmount() {
    cardNumber.unmount();
    cardExpiration.unmount();
    cardCVC.unmount();
    cardPostal.unmount();
  }

  public clickSave = async () => {
    await this.profile.save();
    this.props.history.push("/promoter/profile");
  }

  public changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  public changeEmail = (event: any) => {
    this.profile.email = event.target.value;
  }

  private submit = async (e: any) => {
    e.preventDefault();
    const { token, error } = await stripe.createToken(cardNumber);
    if (error) {
      // Inform the user if there was an error
      const errorElement = document.getElementById("card-errors");
      if (errorElement) {
        errorElement.textContent = error && error.message || "";
      }
    } else if (token) {
      const res = await updatePromoterStripeAccount(token.id);
      // tslint:disable-next-line:no-console
      console.log(res);
    }
  }
  public render() {
    return (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="input-name" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Display Name">Display Name</span>
                </label>
                <div className="value-col">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="input-name"
                    value={this.profile.name}
                    onChange={this.changeName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="input-email" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Email">Email</span>
                </label>
                <div className="value-col">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="input-email"
                    value={this.profile.email}
                    onChange={this.changeEmail}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-number" className="label-col control-label">
                  Credit Card Number
                </label>
                <div className="value-col">
                  <div id="card-number" className="form-control" />
                  <div id="card-number-errors" role="alert" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-expiration" className="label-col control-label">
                  Expiration
                </label>
                <div className="value-col">
                  <div id="card-expiration" className="form-control" />
                  <div id="card-expiration-errors" role="alert" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-cvc" className="label-col control-label">
                  Expiration
                </label>
                <div className="value-col">
                  <div id="card-cvc" className="form-control" />
                  <div id="card-cvc-errors" role="alert" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-postal" className="label-col control-label">
                  Postal Code
                </label>
                <div className="value-col">
                  <div id="card-postal" className="form-control" />
                  <div id="card-postal-errors" role="alert" />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={this.submit}>Create New Payment Method</button>
              <br />
              <button type="button" className="btn btn-md btn-primary" onClick={this.clickSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
