import * as React from "react";
import { Elements } from "react-stripe-elements";
// import { submitToken } from "modules/DroverClient";
import MyForm from "./MyForm";

export default class StripeForm extends React.Component<any> {
  public render() {
    return (
      <Elements>
        <MyForm />
      </Elements>
    );
  }

}
