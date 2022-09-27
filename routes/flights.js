import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

// GET
router.get('/new', flightsCtrl.new)
router.get('/', flightsCtrl.index)

// POST
router.post('/', flightsCtrl.create)

export {
  router
}
