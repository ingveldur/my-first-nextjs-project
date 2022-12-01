import MeetupList, {
  Meetup,
} from "../components/meetups/MeetupList/MeetupList";
import { Context, Fragment, useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props: { meetups: Array<Meetup> }) => {
  return (
    <Fragment>
      <Head>
        <title>React meetups!</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetupss!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// only runs on the server
// gives access to request and response
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const req = context.req; // check for authentication
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

// Prepares data before component is rendered
export const getStaticProps: GetStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://inga:dis@cluster0.j0jmywg.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        address: m.address,
        image: m.image,
        id: m._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
