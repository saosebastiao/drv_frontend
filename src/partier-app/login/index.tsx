import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";
import './styles.scss';

@observer
export default class Login extends React.Component<RouteComponentProps<any>, {}> {

  render() {
    return <div className="partier-wrapper">
      Logging In...
    </div>
  }
  
}