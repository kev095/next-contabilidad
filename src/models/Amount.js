import {Schema, model, models } from "mongoose";

const amountSchema =new Schema({
    monto: {
        type: String
    },
    client: { 
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Amount || model('Amount', amountSchema);