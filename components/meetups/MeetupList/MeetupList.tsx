import MeetupItem from "../MeetupItem/MeetupItem";
import classes from "./MeetupList.module.css";

export interface Meetup {
  id: string;
  title: string;
  description: string;
  address: string;
  image: string;
}

const MeetupList = (props: { meetups: Array<Meetup> }) => (
  <ul className={classes.list}>
    {props.meetups.map((d) => (
      <MeetupItem
        key={d.id}
        id={d.id}
        title={d.title}
        description={d.description}
        address={d.address}
        image={d.image}
      />
    ))}
  </ul>
);

export default MeetupList;
