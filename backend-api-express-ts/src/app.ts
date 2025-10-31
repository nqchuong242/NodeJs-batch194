import  express, {Express, NextFunction, Response, Request} from 'express';
import categoriesRoute from './routes/v1/categories.route';
import categoriesRouteV2 from './routes/v1/categories.route';
import createError, {HttpError } from 'http-errors';
import {ENV} from './config/ENV'
import Student from './models/Student.model'


const app:Express = express();

/*Cấu hình để nhận request từ Body*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    message: 'Backend API'
  })
})
/****************BẮT ĐẦU KHAI BÁO ROUTES Ở ĐÂY****************/
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v2/categories', categoriesRouteV2);
app.get('/students', async (req: Request,res: Response)=>{
  const students = await Student.find();
  res.json({
    message: 'Danh sách sinh viên',
    data: students
  });
});
app.post('/students', async (req: Request,res:Response)=>{
  const {fullName, age} = req.body;
  const newStudent = new Student({
    fullName,
    age
  });
  await newStudent.save();
  res.status(201).json({
    message: 'Tạo sinh viên thành công',
    data: newStudent
  })
});

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

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});
/****************KẾT THÚC KHAI BÁO LỖI****************/



/*App chỉ chứa phần cấu hình express*/
export default app;


