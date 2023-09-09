import mongoose from "mongoose"

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blogging-platform.uvnbe0x.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error while database connection', error)
    }
}

export default Connection;