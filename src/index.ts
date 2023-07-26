require('dotenv').config();
import 'module-alias/register';
import App from './app';
import ServiceController from './resources/service/service.controller';

const app = new App([new ServiceController()], Number(process.env.PORT));

app.listen();
