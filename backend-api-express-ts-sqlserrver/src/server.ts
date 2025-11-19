import { ENV } from './config/ENV'
import app from './app';
import { myDataSource } from './data-soucre';


const PORT = ENV.PORT || 9000;

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    //expess app listen
    app.listen(PORT, () => {
      console.log(`===> Example app listening on port http://localhost:${PORT}`)
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })


