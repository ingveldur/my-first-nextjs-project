import Card from "../../ui/Card/Card";
import classes from "./NewMeetupForm.module.css";
import { useRef } from "react";

export interface MeetupForm {
  title?: string;
  image?: string;
  address?: string;
  description?: string;
}

const NewMeetupForm = (props: {
  addMeetup: (meetupForm: MeetupForm) => any;
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const submit = (event: any) => {
    event.preventDefault();

    const title = titleInputRef.current?.value;
    const image = imageInputRef.current?.value;
    const address = addressInputRef.current?.value;
    const description = descriptionInputRef.current?.value;

    const meetup: MeetupForm = {
      title,
      image,
      address,
      description,
    };

    console.log(meetup);

    props.addMeetup(meetup);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submit}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Meetup image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Meetup address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Meetup description</label>
          <textarea
            id="description"
            required
            rows={5}
            ref={descriptionInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>Add meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
