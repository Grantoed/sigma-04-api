import { Schema, model } from 'mongoose';
import Service from './service.interface';

const serviceSchema = new Schema({
    createdAt: {
        type: String,
    },
    serviceName: {
        type: String,
    },
    serviceDescription: {
        type: String,
    },
    serviceCategory: {
        type: String,
    },
    id: {
        type: String,
    },
});

const serviceModel = model<Service>('Service', serviceSchema);

export default serviceModel;
