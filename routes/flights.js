import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

router.get('/new', flightsCtrl.new)

export {
  router
}