import { PropsWithChildren } from "react";
import classes from "./Card.module.css";

const Card = (props: PropsWithChildren) => (
  <div className={classes.card}>{props.children}</div>
);

export default Card;
