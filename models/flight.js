import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: { 
    type: Number, 
    min: 0
  }
})

const flightSchema = new Schema({
  airline: {
    type: String, 
    enum: ["Delta", "Southwest", "United"]
  },
  airport: {
    type: String,
    enum: ["DEN", "DRW", "AUS", "LEX", "SAN"]
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: futureDate()
  },
  tickets: [ticketSchema]
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