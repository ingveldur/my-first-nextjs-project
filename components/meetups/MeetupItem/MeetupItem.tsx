import classes from "./MeetupItem.module.css";
import Card from "../../ui/Card/Card";
import { Meetup } from "../MeetupList/MeetupList";
import { useRouter } from "next/router";

const MeetupItem = (props: Meetup) => {
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={navigateToDetails}>Show details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
