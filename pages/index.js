import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'First meetup',
    image: 'https://www.fairobserver.com/wp-content/uploads/2020/12/Oman-2.jpg',
    address: 'Some address 5, Some City, Some Country',
    description: 'This is the first meetup',
  },
  {
    id: 'm2',
    title: 'Second meetup',
    image: 'https://www.fairobserver.com/wp-content/uploads/2020/12/Oman-2.jpg',
    address: 'Some address 10, Some City, Some Country',
    description: 'This is the second meetup',
  },
];

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

  return {
    props: {
      meetups: DUMMY_MEETUPS,
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
