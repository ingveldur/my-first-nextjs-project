import { Fragment, PropsWithChildren } from "react";
import classes from "./Layout.module.css";

import MainNavigation from "../MainNavigation/MainNavigation";

function Layout(props: PropsWithChildren) {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
