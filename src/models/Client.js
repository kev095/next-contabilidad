import {Schema, model, models } from "mongoose";

const clientSchema =new Schema({
    document: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    business_name:{

    }
}, {
    timestamps: true,
    versionKey: false
})

export default models.Client || model('Client', clientSchema);