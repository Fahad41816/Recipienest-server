import express from "express";
import cors from "cors";
import { AllRouters } from "./routes";
import globalErrorHandler from "./MeddleWare/GlobalErrorHandler"; 
const app = express();

// 

// init medelware 
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
  res.send("Recipe Project server..");
});

 

// All router 
app.use('/api/v1', AllRouters)


app.use(globalErrorHandler)

export default app