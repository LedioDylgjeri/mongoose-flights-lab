import { Flight } from '../models/flight.js'
import { Meal } from '../models/meals.js'

function newFlight(req, res) {
  const newFlight = new Flight()
  console.log(newFlight);
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate
  })
}

function create(req, res) {
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`flights/${flight._id}`)
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
      title: 'All Flights',
      flights: flights,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meal')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meal}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail',
        flight: flight,
        meals: meals
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.id(req.params.ticketId).remove()
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/flrights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meal.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  createTicket,
  deleteTicket,
  addMeal
}