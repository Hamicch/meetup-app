import { MongoClient } from 'mongodb';

// /api/new-meetup

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const data = req.body;

			// const { title, description, address, image } = data;

			const client = await MongoClient.connect(
				'mongodb+srv://root:xUnMcmmJf7Du4MaU@cluster0.jdgjw.mongodb.net/meetups?retryWrites=true&w=majority'
			);
			const db = client.db();

			const meetupsCollection = db.collection('meetups');

			const result = await meetupsCollection.insertOne({ data });

            console.dir('RESULT::', result);
            
            client.close();

            res.status(201).json({
                status: 'success',
                message: 'Meetup successfully created!',
            })
		} catch (error) {
			console.dir(error);
		}
	}
}
