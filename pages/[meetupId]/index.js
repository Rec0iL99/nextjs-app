import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

// Needed if page is dynamic [meetupId]
// Needed if getStaticProps is used in dynamic page
export const getStaticPaths = async () => {
  // nextjs needs to pre generate all versions of this page with meetupId during build process

  const client = await MongoClient.connect(process.env.DATABASE);
  const db = client.db();

  const meetupCollection = db.collection('meetups');

  // {} for fetching all documents
  // {_id: 1} with only _id property
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // false means paths contains all [meetupId] paths
    // true means paths contains only some [meetupId] paths
    fallback: false,
    // [{ params: { meetupId: 'm1' } }, { params: { meetupId: 'm2' } }]
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // getting id from url
  const meetupId = context.params.meetupId;

  // this will only show in server console since funct only runs in server or build process
  console.log(meetupId);

  const client = await MongoClient.connect(process.env.DATABASE);
  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        address: selectedMeetup.address,
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
