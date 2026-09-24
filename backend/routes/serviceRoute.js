import { Router } from 'express';
const router = Router();

import {
  getServices,
  getProviders,
  getSlots,
  createBooking,
} from '../controllers/servicesController.js';
import { validateCredentials } from '../middlewares/validate.js';

router.get('/services', getServices);
router.get('/providers', getProviders);
router.get('/slots', getSlots);
router.post('/bookings', validateCredentials, createBooking);

// GET /api/services
// GET /api/providers?serviceId=
// GET /api/slots?providerId=&date=
// POST /api/bookings

export default router;
