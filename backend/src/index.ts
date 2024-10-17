import express from "express"
import connectToDb from "./db/db";
import userRoutes from "./routers/userRoutes"
import patientsRoutes from "./routers/patientRoutes";
import authRoutes from "./routers/authRoutes";
import cors from "cors"


const app = express(); 

app.use(express.json()); 
app.use(cors())

app.use('/api/v1/admin' , userRoutes);
app.use('/api/v1/patients' , patientsRoutes); 
app.use('/api/v1/auth' , authRoutes)

const PORT = 3000

connectToDb().then(()=>{
    app.listen(PORT , ()=>{
            console.log(`The server is runnning on the ${PORT}`)
    })
})