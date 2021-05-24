import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const handleNewMeetup = (data) => {
    console.log(data);
  };

  return <NewMeetupForm onAddMeetup={handleNewMeetup} />;
};

export default NewMeetupPage;
