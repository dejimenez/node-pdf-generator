import { default as express } from 'express';
import routing from '../routing/express-routing';

export default (port: number, cb: () => void) => {
  const app = express();
  app.use(express.json());
  app.use('/', routing());

  app.listen(port, cb);
};
