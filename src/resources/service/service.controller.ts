import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ServiceHandler from '@/resources/service/service.handler';

class ServiceController implements Controller {
    public path = '/service';
    public router = Router();
    private ServiceHandler = new ServiceHandler();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.getAll);
        this.router.get(`${this.path}/:category`, this.getByCategory);
    }

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const count = await this.ServiceHandler.getCount();
            const totalPages = Math.ceil(count / limit);
            const services = await this.ServiceHandler.getAll(page, limit);
            res.status(200).json({ services, page, limit, count, totalPages });
        } catch (e: any) {
            next(new HttpException(e.status, e.message));
        }
    };

    private getByCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { category: serviceCategory } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 3;
            const count = await this.ServiceHandler.getCount(serviceCategory);
            const totalPages = Math.ceil(count / limit);
            const services = await this.ServiceHandler.getByCategory(serviceCategory, page, limit);
            res.status(200).json({ services, page, limit, count, totalPages });
        } catch (e: any) {
            next(new HttpException(e.status, e.message));
        }
    };
}

export default ServiceController;
