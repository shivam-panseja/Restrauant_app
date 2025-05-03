const mongoose = require('mongoose')

 const  dbConnect = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log('Databse connected')
    }catch (error) {
        console.log('Database error')
    }
}
module.exports = dbConnect