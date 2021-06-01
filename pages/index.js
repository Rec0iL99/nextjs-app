// import { useEffect, useState } from 'react';
// This import will only be available in the server side bundle and not client side
// Since it is used only in the server side or build process
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  /* 
    Two render cycles 
    1. Component imp function runs with loadedMeetups as empty array
    2. then 2nd cycle useEffect funct runs and loadedMeetups has array now
    But nextJS just takes the first render cycle results and puts it in html (SEO problem here since loadedMeetups is empty)
  */
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  // No need of above due to getStatic props

  return <MeetupList meetups={props.meetups} />;
};

// Way to move data fetching away from client side and in server side or build process
export const getStaticProps = async () => {
  // This funct will not run or be shown to the client
  // It is run when npm run build is done
  // Fetch from api
  // Connect to DB

  const client = await MongoClient.connect(process.env.DATABASE);
  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // Data can be outdated so data in npm run build could be old data
    // hence this property 10 secs
    // with property this page wont just be generated in build process but on the server for secs specified if there are reqs for this page
    revalidate: 10,
  };
};

// This funct runs ALWAYS on the server not on build process
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
