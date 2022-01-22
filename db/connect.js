import { connect } from 'mongoose'

const connectDB = (url) => {
   return connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}



export default connectDB