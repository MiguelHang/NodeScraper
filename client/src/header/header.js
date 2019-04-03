import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import { Logo, PageTitle } from './styles';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title={
            <div>
              {/* <Logo src={logo}/> */}
              <PageTitle>Moto search</PageTitle>
            </div>
          }
          showMenuIconButton={false}
        />
      </div>
    )
  }
}

export default Header