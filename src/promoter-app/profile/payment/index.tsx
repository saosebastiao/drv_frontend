import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import ProfileModel from "../Model";
import { updatePromoterStripeAccount } from "modules/DroverClient";
import loadScript from "modules/loadScript";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditPayment extends React.Component<PProfile> {
  private stripePromise: Promise<stripe.Stripe>;
  private profile = new EditProfileModel;
  private cardNumber: stripe.elements.Element;
  private cardExpiration: stripe.elements.Element;
  private cardCVC: stripe.elements.Element;
  private cardPostal: stripe.elements.Element;
  constructor(props: any) {
    super(props);
    const src = "https://js.stripe.com/v3/";
    this.stripePromise = loadScript(src).then(() => {
      return Stripe("pk_test_GEDUNDpJeAljk63czVCfT9o0");
    });
  }

  public async componentDidMount() {
    const style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: "16px"
      }
    };
    const stripe = await this.stripePromise;
    const elements = stripe.elements();
    this.cardNumber = elements.create("cardNumber", { style });
    this.cardExpiration = elements.create("cardExpiry", { style });
    this.cardCVC = elements.create("cardCvc", { style });
    this.cardPostal = elements.create("postalCode", { style });

    this.cardNumber.mount("#card-number");
    this.cardNumber.on("change", res => {
      const displayError = document.getElementById("card-number-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    this.cardExpiration.mount("#card-expiration");
    this.cardExpiration.on("change", res => {
      const displayError = document.getElementById("card-expiration-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    this.cardCVC.mount("#card-cvc");
    this.cardCVC.on("change", res => {
      const displayError = document.getElementById("card-cvc-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    this.cardPostal.mount("#card-postal");
    this.cardPostal.on("change", res => {
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
    this.cardNumber.unmount();
    this.cardExpiration.unmount();
    this.cardCVC.unmount();
    this.cardPostal.unmount();
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
    const stripe = await this.stripePromise;
    const { token, error } = await stripe.createToken(this.cardNumber);
    if (error) {
      // Inform the user if there was an error
      const errorElement = document.getElementById("card-errors");
      if (errorElement) {
        errorElement.textContent = error && error.message || "";
      }
    } else if (token) {
      await updatePromoterStripeAccount(token.id);
    }
  }
  public render() {
    return (
      <div className="box">
        <div className="columns is-4">
          <div className="profile-form">
            <div className="field">
              <label htmlFor="card-number" className="label">
                Credit Card Number
              </label>
              <div className="control">
                <div id="card-number" className="form-control" />
                <div id="card-number-errors" role="alert" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="card-expiration" className="label">
                Expiration
              </label>
              <div className="control">
                <div id="card-expiration" className="form-control" />
                <div id="card-expiration-errors" role="alert" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="card-cvc" className="label">
                Expiration
              </label>
              <div className="control">
                <div id="card-cvc" className="form-control" />
                <div id="card-cvc-errors" role="alert" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="card-postal" className="label">
                Postal Code
              </label>
              <div className="control">
                <div id="card-postal" className="form-control" />
                <div id="card-postal-errors" role="alert" />
              </div>
            </div>
            <button
              type="button"
              className="button is-primary"
              onClick={this.submit}>
              Create New Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }
}
