import {dbConnect} from "utils/mongoose";
import Amount from "models/Amount"; 

dbConnect();

export default async function handler(req, res){

    switch (req.method) {
        case "GET":
            try {
                const amounts = await Amount.find().populate("client");
               
                return res.status(200).json(amounts);   
            } catch (error) {
                return res.status(500).json({error: error.message});
            } 
        case "POST":
            try {                
                const newAmount = new Amount(req.body);
                const savedAmount = await newAmount.save();
                return res.status(201).json(savedAmount);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        default:
            res.status(400).json({msg: "this method is not supported."});
    }

}