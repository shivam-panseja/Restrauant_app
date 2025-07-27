const mongoose = require('mongoose')



// const MONGO_URL =
 const  dbConnect = async () => {
    try {
        console.log('DATABASE STRING FROM ENV', process.env.MONGO_URL)
       await mongoose.connect(MONGO_URL)
       console.log('Databse connected')
    }catch (error) {
        console.log(error, 'Database error')
    }
}
module.exports = dbConnect