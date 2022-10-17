import {dbConnect} from "utils/mongoose";
import Client from "models/Client";

dbConnect();

export default async function handler(req, res){

    switch (req.method) {
        case "GET":
            try {
                const clients = await Client.find();
                return res.status(200).json(clients);   
            } catch (error) {
                return res.status(500).json({error: error.message});
            } 
        case "POST":
            try {                
                const newClient = new Client(req.body);
                const savedClient = await newClient.save();
                return res.status(201).json(savedClient);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        default:
            res.status(400).json({msg: "this method is not supported."});
    }

}