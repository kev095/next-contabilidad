import {dbConnect} from "utils/mongoose";
import Client from "models/Client";

dbConnect();

export default async function handler(req, res){

    switch (req.method) {
        case "GET":
            try {
             
                const client = await Client.findOne({document: req.query.dni});
                return res.status(200).json(client);   
            } catch (error) {
                return res.status(500).json({error: error.message});
            } 

        default:
            res.status(400).json({msg: "this method is not supported."});
    }

}