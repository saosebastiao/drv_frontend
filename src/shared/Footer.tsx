import * as React from "react";
import { observer } from "mobx-react";

import './styles.scss';

@observer
export default class Footer extends React.Component<{}, {}> {

  render() {
    return <footer className="footer-wrapper">
      © 2017 Drover Ltd.
    </footer>;
  }

}