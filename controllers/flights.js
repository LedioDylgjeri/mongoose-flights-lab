import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  const newFlight = new Flight()
  console.log(newFlight);
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0,16)
  console.log(departsDate);
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate
  })
}

function create(req, res) {
  console.log(req.body, 'test');
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
}

export {
  newFlight as new,
  create,
  index
}