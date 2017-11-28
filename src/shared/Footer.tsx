import { observer } from "mobx-react";
import * as React from "react";

@observer
export default class Footer extends React.Component<{}, {}> {

  public render() {
    return (
      <footer className="footer">
        <span>© 2017 Drover Ltd.</span>
      </footer>
    );
  }

}
