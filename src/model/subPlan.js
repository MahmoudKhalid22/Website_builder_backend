import {mongoose} from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema({
    name:{
        type: String
        },
    price: { 
        type : Number,
        reqire : true
    },
    description: {
        type: String
    },
    },
    {
        timestamps: true,
    }
);

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
export default SubscriptionPlan ;