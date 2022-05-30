import { Fragment } from 'react';

import MainNavigation from './MainNavigation';


type Props = {

    children: JSX.Element,
    
  };

const Layout : React.FC<Props>= ({
    children,
  })  => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;