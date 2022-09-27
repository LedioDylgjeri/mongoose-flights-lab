import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String,
  airport: {
    type: String,
    default: 'DEN'
  },
  flightNo: Number,
  departs: {
    type: Date,
    default: futureDate()
  }
})

function futureDate() {
  const today = new Date()
  console.log('Today', today);
  today.setFullYear(today.getFullYear() + 1)
  console.log(today);
  return today
}
futureDate()

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}