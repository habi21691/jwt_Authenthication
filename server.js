const  express =require("express")
const { errorHandler } = require("./middleware/errorMiddleware")
const dotenv = require("dotenv").config()
const colors = require('colors')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express();


connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoute'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Started on Port ${port}  `))

