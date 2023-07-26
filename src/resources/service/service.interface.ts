import { Document } from 'mongoose';

export default interface Service extends Document {
    createdAt: string;
    serviceName: string;
    serviceDescription: string;
    serviceCategory: string;
    id: string;
}
