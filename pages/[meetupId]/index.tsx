import { GetStaticPaths, GetStaticProps } from "next";
import MeetupDetail from "../../components/meetups/MeetupDetail/MeetupDetail";
import { Meetup } from "../../components/meetups/MeetupList/MeetupList";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetailPage = (props: { meetup: Meetup }) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetupDetail
        id={props.meetup.id}
        title={props.meetup.title}
        description={props.meetup.description}
        address={props.meetup.address}
        image={props.meetup.image}
      />
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths<{
  meetupId: string;
}> = async () => {
  // You would fetch supported IDs from a database/API and generate this paths array dynamically
  // So I would fetch all blueprintIds and populate here for /blueprints/[blueprintId] page

  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://inga:dis@cluster0.j0jmywg.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  console.log("meetups", meetups);

  client.close();

  return {
    fallback: false,
    paths: meetups.map((m) => {
      return {
        params: {
          meetupId: m._id.toString(),
        },
      };
    }),
  };
};

// Prepares data before component is rendered
// Cannot use hooks in it
export const getStaticProps: GetStaticProps = async (context) => {
  const meetupId = context.params?.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://inga:dis@cluster0.j0jmywg.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId?.toString()),
  });

  client.close();

  return {
    props: {
      meetup: {
        title: meetup?.title,
        address: meetup?.address,
        image: meetup?.image,
        id: meetup?._id.toString(),
      },
    },
    revalidate: 10,
  };
};

export default MeetupDetailPage;
