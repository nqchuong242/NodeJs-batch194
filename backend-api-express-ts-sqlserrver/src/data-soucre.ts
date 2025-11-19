import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql', //kiểu database
  host: 'DESKTOP-7UO06C1', //Computer Name
  port: 1433,
  username: 'chuong',
  password: 'Nqchuong2402@',
  database: 'Batch-194', //Tên Database
  entities: ['src/entities/**/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});