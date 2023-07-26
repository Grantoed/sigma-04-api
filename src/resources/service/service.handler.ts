import HttpException from '@/utils/exceptions/http.exception';
import serviceModel from './service.model';
import Service from './service.interface';

class ServiceHandler {
    private service = serviceModel;

    public async getCount(serviceCategory?: string): Promise<number> {
        const query = serviceCategory ? { serviceCategory } : {};
        const count = await this.service.countDocuments(query);
        return count;
    }

    public async getAll(page: number, limit: number): Promise<Service[] | []> {
        const sets = await this.service
            .find()
            .skip((page - 1) * limit)
            .limit(limit);
        return sets;
    }

    public async getByCategory(
        serviceCategory: string,
        page: number,
        limit: number,
    ): Promise<Service[]> {
        const services = await this.service
            .find({ serviceCategory })
            .skip((page - 1) * limit)
            .limit(limit);
        if (!services.length) {
            throw new HttpException(404, `Services of ${serviceCategory} category don't exist`);
        }
        return services;
    }
}

export default ServiceHandler;
