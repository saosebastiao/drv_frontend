import * as React from "react";
import { submitToken } from "modules/DroverClient";

const stripe = Stripe("pk_test_GEDUNDpJeAljk63czVCfT9o0");
const elements = stripe.elements();

export default class StripeForm extends React.Component<{}> {

  public shouldComponentUpdate() {
    return false;
  }
  public componentDidMount() {
    const style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: "16px",
        lineHeight: "24px"
      }
    };
    // Create an instance of the card Element
    const card = elements.create("card", { style });
    // Add an instance of the card Element into the `card-element` <div>
    card.mount("#card-element");
    card.on("change", res => {
      const displayError = document.getElementById("card-errors");
      if (displayError) {
        if (res && res.error) {
          displayError.textContent = res.error && res.error.message || "";
        } else {
          displayError.textContent = "";
        }
      }
    });
    const form = document.getElementById("payment-form");
    if (form) {
      form.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        const { token, error } = await stripe.createToken(card);
        if (error) {
          // Inform the user if there was an error
          const errorElement = document.getElementById("card-errors");
          if (errorElement) {
            errorElement.textContent = error && error.message || "";
          }
        } else {
          // Send the token to your server
          this.stripeTokenHandler(token);
        }
      });
    }
  }

  public stripeTokenHandler = async (token?: stripe.Token) => {
    if (token) {
      const res = await submitToken(token);
      // tslint:disable-next-line:no-console
      console.log(res);
    }
  }

  public render() {
    return (
      <form id="payment-form">
        <div className="form-row">
          <label htmlFor="card-element">
            Credit or debit card
          </label>
          <div id="card-element" />

          <div id="card-errors" role="alert" />
        </div>

        <button>Submit Payment</button>
      </form>
    );
  }
}
