import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetUpPage() {
	const router = useRouter();

	async function addMeetupHandler(enteredMeetup) {
		try {
			const response = await fetch('/api/new-meetup', {
				method: 'POST',
				body: JSON.stringify(enteredMeetup),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (data.status === 'success') {
				router.push('/');
			}

			console.dir(data);
		} catch (error) {
			console.dir(error);
		}
	}

	return (
		<>
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name='description'
					content='Add your meetup to the list of meetups to share and connect with the world!'
				/>
			</Head>
			<NewMeetUpForm onAddMeetup={addMeetupHandler} />;
		</>
	);
}
