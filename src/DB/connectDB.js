import mongoose, { ConnectOptions } from 'mongoose';


// interface connectedOptions extends ConnectOptions{
//     useNewUrlParser: boolean,
//     useUnifiedTopology: boolean,
// }

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// connecting to database
const connectDB = async () => {
    const connectionUrl = process.env.NEXT_PUBLIC__DB_URI ;
    mongoose.connect(connectionUrl , options )
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
    mongoose.set('strictQuery', false);
};

export default connectDB;   