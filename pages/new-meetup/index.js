import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const handleNewMeetup = async (newMeetup) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(newMeetup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Add a new meetup to the best db in the world"
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleNewMeetup} />
    </Fragment>
  );
};

export default NewMeetupPage;
