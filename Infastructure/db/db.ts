import mongoose from 'mongoose'
function connectDb() {
  mongoose
    .connect(String(process.env.db_url))
    .then(() => console.log('Db Connected'))
    .catch(error => console.log('error to connect db', error.message))
}

export default connectDb
