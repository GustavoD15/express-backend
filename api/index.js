import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import userRoutes from './routes/user.route.js';


dotenv.config();
db.connect();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}/`);
})
