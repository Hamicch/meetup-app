// our-domain.com/
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

export default function HomePage(props) {
	return (
		<>
			<Head>
				<title>Meetups</title>
				<meta
					name='description'
					content='Browse a huge lit of highly active React meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://root:xUnMcmmJf7Du4MaU@cluster0.jdgjw.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	console.log('meetups::', meetups);

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				id: meetup._id.toString(),
				title: meetup.data.title,
				image: meetup.data.image,
				address: meetup.data.address,
				description: meetup.data.description,
			})),
		},
		revalidate: 10,
	};
}
