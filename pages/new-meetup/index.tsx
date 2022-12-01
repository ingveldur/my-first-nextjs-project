import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm, {
  MeetupForm,
} from "../../components/meetups/NewMeetupForm/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetup = async (meetupForm: MeetupForm) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupForm),
      headers: {
        "Content-type": "application/json",
      },
    });
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetups, create amazing networking opportunities!"
        />
      </Head>
      <NewMeetupForm addMeetup={addMeetup} />;
    </Fragment>
  );
};

export default NewMeetup;
