import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {
    type: String,
    required: true,
    match: /[A-F][1-9]\d?/
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
    enum: ["DEN", "DRW", "AUS", "LEX", "SAN"],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function(){
      return new Date().setFullYear(new Date().getFullYear() + 1)
    },
  },
  tickets: [ticketSchema],
  meal: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}