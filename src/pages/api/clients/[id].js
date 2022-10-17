import { dbConnect } from "utils/mongoose";
import Client from "models/Client";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {
        method,
        body,
        query: {id},
    } = req;
    
    switch (method) {
        case "GET":
            try {
                const client = await Client.findById(id);
                if(!client) return res.status(404).json({msg: "client no found."});
                return res.status(200).json(client);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "PUT":
            try {
                const clientUpdate = await Client.findByIdAndUpdate(id, body, {new: true});
                if (!clientUpdate) return res.status(404).json({msg: "Client not found"});
                return res.status(200).json(clientUpdate);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedClient = await Client.findByIdAndDelete(id);
                if(!deletedClient) return res.status(404).json({msg: "Client not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            break;
    }
}