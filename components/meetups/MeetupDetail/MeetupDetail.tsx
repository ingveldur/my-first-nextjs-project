/* eslint-disable @next/next/no-img-element */
import classes from "./MeetupDetail.module.css";
import { Meetup } from "../MeetupList/MeetupList";

const MeetupDetail = (props: Meetup) => {
  console.log("props", props);

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};
export default MeetupDetail;
