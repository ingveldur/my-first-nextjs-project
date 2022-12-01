import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from 'mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string }>
) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const { title, image, address, description } = data;
            const client = await MongoClient.connect("mongodb+srv://inga:dis@cluster0.j0jmywg.mongodb.net/?retryWrites=true&w=majority");
            const db = client.db();
            const meetupsCollection = db.collection('meetups');

            const result = await meetupsCollection.insertOne({
                title,
                image,
                address,
                description
            });

            console.log(result);
            client.close();
            res.status(201).json({ message: 'Meetup inserted!' });

        } catch (error) {
            console.log("error", error);
        }
    }
}
