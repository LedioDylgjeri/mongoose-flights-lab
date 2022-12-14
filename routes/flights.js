import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

// GET
router.get('/', flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.get('/:id/edit', flightsCtrl.edit)

// POST
router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.post('/:id/meals', flightsCtrl.addMeal)

router.delete('/:id', flightsCtrl.delete)

router.delete('/flights/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

export {
  router
}
