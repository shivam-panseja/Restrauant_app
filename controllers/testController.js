const testUserController = (req,res) => {
    try {
    console.log('working')
    return res.status(200).json({output : "healthy"})
    }catch (error) {
        console.log(error)
    }

}

module.exports = { testUserController}