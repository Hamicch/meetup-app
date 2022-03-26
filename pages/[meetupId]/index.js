import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

export default function MeetupDetails(props) {
	return (
		<>
			<Head>
				<title>{props.meetupData?.data?.title}</title>
				<meta
					name='description'
					content={props.meetupData?.data?.description}
				/>
			</Head>
			<MeetupDetail
				image={props.meetupData?.data?.image}
				title={props.meetupData?.data?.title}
				address={props.meetupData?.data?.address}
				description={props.meetupData?.data?.description}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://root:xUnMcmmJf7Du4MaU@cluster0.jdgjw.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://root:xUnMcmmJf7Du4MaU@cluster0.jdgjw.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const Meetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	const selectedMeetup = JSON.parse(JSON.stringify(Meetup));

	console.dir('selectedMeetup:::', selectedMeetup);

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				image: selectedMeetup.image,
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
		revalidate: 10,
	};
}
