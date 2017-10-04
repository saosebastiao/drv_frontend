import * as React from "react";
import { CardElement } from "react-stripe-elements";

class CardSection extends React.Component {
  public render() {
    return (
      <label>
        Card details
        <CardElement style={{ base: { fontSize: "18px" } }} />
      </label>
    );
  }
}

export default CardSection;
