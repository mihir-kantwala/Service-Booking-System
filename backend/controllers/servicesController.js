import { disconnect } from 'mongoose';
import Booking from '../models/Booking.js';
import Provider from '../models/Provider.js';
import Service from '../models/Service.js';
import Slot from '../models/Slot.js';

const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services) {
      return res.status(400).json({
        success: false,
        message: 'services not Avilable',
      });
    }

    res.status(200).json({
      success: true,
      message: 'services Fetched',
      services,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'server error',
      error: error.message,
    });
  }
};

const getProviders = async (req, res) => {
  try {
    const { serviceId } = req.query;
    console.log(serviceId);

    const providers = await Provider.find({ serviceId: serviceId });

    if (!providers) {
      return res.status(400).json({
        success: false,
        message: 'providers not Avilable',
      });
    }

    res.status(200).json({
      success: true,
      message: 'providers Fetched',
      providers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'server error',
      error: error.message,
    });
  }
};

const getSlots = async (req, res) => {
  try {
    const { providerId, date } = req.query;
    console.log(providerId, date);

    const slots = await Slot.find({ providerId: providerId, date: date });

    if (!slots) {
      return res.status(400).json({
        success: false,
        message: 'slots not Avilable',
      });
    }

    res.status(200).json({
      success: true,
      message: 'slots Fetched',
      slots,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'server error',
      error: error.message,
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      providerId,
      slotId,
      customerName,
      customerEmail,
      participants,
    } = req.body;

    const service = await Service.findById(serviceId);
    console.log(service);

    if (!service) {
      return res.status(400).json({
        success: false,
        message: 'service not Exist',
      });
    }

    const provider = await Provider.findById(providerId);
    console.log(provider);

    if (!provider) {
      return res.status(400).json({
        success: false,
        message: 'provider not Exist',
      });
    }

    if (provider.serviceId.toString() !== service._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'provider not belonge to service',
      });
    }

    const slot = await Slot.findById(slotId);
    console.log(slot);

    if (!slot) {
      return res.status(400).json({
        success: false,
        message: 'slot not Exist',
      });
    }

    if (slot.providerId.toString() !== provider._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'slot not belonge to provider',
      });
    }

    if (participants > slot.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough slot capacity',
      });
    }

    let totalPrice = service.basePrice * participants;
    let discount = 0;
    let surcharge = 0;

    if (participants >= 5) {
      discount = totalPrice * 0.1;
    }

    const day = new Date(slot.date).getDay();

    if (day === 6 || day === 0) {
      surcharge = totalPrice * 0.15;
    }

    totalPrice = Math.round(service.basePrice - discount + surcharge);

    const existingBooking = await Booking.findOne({
      slotId,
      customerEmail,
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'You have already booked this slot',
      });
    }

    const booking = await Booking.create({
      serviceId,
      providerId,
      slotId,
      customerName,
      customerEmail,
      participants,
      totalPrice,
    });

    await Slot.findByIdAndUpdate(slotId, {
      $inc: { capacity: -participants },
    });

    res.status(200).json({
      success: true,
      message: 'booking done successfully',
      booking,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already booked this slot',
      });
    }

    res.status(500).json({
      success: false,
      message: 'server error',
      error: error.message,
    });
  }
};

export { getServices, getProviders, getSlots, createBooking };
