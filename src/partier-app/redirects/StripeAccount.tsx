import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { updatePartierStripeAccount } from "modules/DroverClient";

interface SPartierUpdateState {
  waiting: boolean;
  error?: string;
}

export default class PartierUpdate extends React.Component<RouteComponentProps<{}>, SPartierUpdateState> {
  private update = (code: string) => {
    updatePartierStripeAccount(code).then(() => {
      this.setState({ waiting: false });
    }).catch(err => {
      this.setState({ waiting: false, error: err });
    });

  }

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);
    const code = params.get("code");
    this.state = { waiting: true };
    if (code) {
      this.update(code);
    } else {
      this.state = { waiting: false };
    }
  }
  public render() {
    if (this.state.waiting) {
      return (
        <div>loading...</div>
      );
    } else if (this.state.error) {
      return (
        <div>{this.state.error}</div>
      );
    } else {
      return (
        <Redirect to="/partier/profile" />
      );
    }
  }
}
