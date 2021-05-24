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

const HomePage = () => {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
};

export default HomePage;
