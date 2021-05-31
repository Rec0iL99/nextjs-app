import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://www.fairobserver.com/wp-content/uploads/2020/12/Oman-2.jpg"
      title="First meetup"
      address="Some address 5, Some City, Some Country"
      description="This is the first meetup"
    />
  );
};

// Needed if page is dynamic [meetupId]
// Needed if getStaticProps is used in dynamic page
export const getStaticPaths = async () => {
  // nextjs needs to pre generate all versions of this page with meetupId during build process
  return {
    // false means paths contains all [meetupId] paths
    // true means paths contains only some [meetupId] paths
    fallback: false,
    paths: [{ params: { meetupId: 'm1' } }, { params: { meetupId: 'm2' } }],
  };
};

export const getStaticProps = async (context) => {
  // getting id from url
  const meetupId = context.params.meetupId;

  // this will only show in server console since funct only runs in server or build process
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          'https://www.fairobserver.com/wp-content/uploads/2020/12/Oman-2.jpg',
        title: 'First Meetup',
        address: 'Some address 5, Some City, Some Country',
        description: 'This is the first meetup',
      },
    },
  };
};

export default MeetupDetails;
