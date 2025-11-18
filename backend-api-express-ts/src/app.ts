import  express, {Express, NextFunction, Response, Request} from 'express';
import createError, {HttpError } from 'http-errors';
import {ENV} from './config/ENV'
import categoriesRoute from './routes/v1/categories.route';
import categoriesRouteV2 from './routes/v1/categories.route';
import brandsRoute from './routes/v1/brands.route';
import customersRoute from './routes/v1/customers.route';
import staffsRoute from './routes/v1/staffs.route';
import productsRoute from './routes/v1/products.route';
import ordersRoute from './routes/v1/orders.route';
import orderItemsRoute from './routes/v1/orderItems.route';
import authRoute from './routes/v1/auth.route';
import { sendJsonError } from './helpers/responseHandler';
//import { appExampleMiddleware } from './middleware/appExample.middleware';


const app:Express = express();

/**MIDDLEWARE BIGIN HERE */

/*Cấu hình để nhận request từ Body*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Application middleware example
//app.use(appExampleMiddleware);

/**MIDDLEWARE END */



/****************BẮT ĐẦU KHAI BÁO ROUTES Ở ĐÂY****************/
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API'
  })
})

app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v2/categories', categoriesRouteV2);
app.use('/api/v1/brands',brandsRoute);
app.use('/api/v1/customers', customersRoute);
app.use('/api/v1/staffs', staffsRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/order-items', orderItemsRoute);
app.use('/api/v1/auth', authRoute);
/****************KẾT THÚC KHAI BÁO ROUTES****************/



/****************BẮT ĐẦU KHAI BÁO LỖI Ở ĐÂY****************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = ENV.NODE_ENV === 'development' ? err : {};

/*   res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  }); */
sendJsonError({ 
  res, 
  status: { 
    statusCode: err.status || 500, 
    message: err.message || "Internal Server Error" 
  } });
});
/****************KẾT THÚC KHAI BÁO LỖI****************/



/*App chỉ chứa phần cấu hình express*/
export default app;


