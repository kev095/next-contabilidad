import { dbConnect } from "utils/mongoose";
import Amount from "models/Amount";

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
                const amount = await Amount.findById(id).populate("client");
                if(!amount) return res.status(404).json({msg: "Amount no found."});
                return res.status(200).json(amount);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "PUT":
            try {
                const amountUpdate = await Amount.findByIdAndUpdate(id, body, {new: true});
                if (!amountUpdate) return res.status(404).json({msg: "Amount not found"});
                return res.status(200).json(amountUpdate);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedAmount = await Amount.findByIdAndDelete(id);
                if(!deletedAmount) return res.status(404).json({msg: "Amount not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            break;
    }
}