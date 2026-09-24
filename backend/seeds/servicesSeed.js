import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Service from '../models/Service.js';
import Provider from '../models/Provider.js';
import Slot from '../models/Slot.js';

dotenv.config({
  path: '../.env',
});

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ServiceMarketplace',
    });
    console.log('MongoDB connected');

    // Clear old data
    await Service.deleteMany({});
    await Provider.deleteMany({});
    await Slot.deleteMany({});

    // 1. Create Services
    const services = await Service.insertMany([
      {
        name: 'Plumber',
        category: 'Home Maintenance',
        basePrice: 500,
        duration: 60,
      },
      {
        name: 'Electrician',
        category: 'Home Maintenance',
        basePrice: 400,
        duration: 60,
      },
      {
        name: 'Car Wash',
        category: 'Automotive',
        basePrice: 300,
        duration: 45,
      },
      {
        name: 'Home Cleaning',
        category: 'Cleaning',
        basePrice: 800,
        duration: 120,
      },
      {
        name: 'AC Repair',
        category: 'Appliance Repair',
        basePrice: 600,
        duration: 90,
      },
    ]);

    // 2. Create Providers
    const providers = await Provider.insertMany([
      {
        name: 'Rajesh Kumar',
        serviceId: services[0]._id, // Plumber
        rating: 4.7,
      },
      {
        name: 'Amit Patel',
        serviceId: services[0]._id, // Plumber
        rating: 4.5,
      },

      {
        name: 'Vijay Sharma',
        serviceId: services[1]._id, // Electrician
        rating: 4.8,
      },
      {
        name: 'Rahul Mehta',
        serviceId: services[1]._id, // Electrician
        rating: 4.3,
      },

      {
        name: 'Arjun Singh',
        serviceId: services[2]._id, // Car Wash
        rating: 4.6,
      },
      {
        name: 'Karan Shah',
        serviceId: services[2]._id, // Car Wash
        rating: 4.4,
      },

      {
        name: 'Neha Joshi',
        serviceId: services[3]._id, // Home Cleaning
        rating: 4.9,
      },
      {
        name: 'Priya Patel',
        serviceId: services[3]._id, // Home Cleaning
        rating: 4.6,
      },

      {
        name: 'Suresh Yadav',
        serviceId: services[4]._id, // AC Repair
        rating: 4.7,
      },
      {
        name: 'Manish Desai',
        serviceId: services[4]._id, // AC Repair
        rating: 4.2,
      },
    ]);

    // create Slots
    const slots = [
      '11:00 AM',
      '12:00 PM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
    ];

    const date = new Date();

    for (let i = 0; i < 7; i++) {
      for (const providerData of providers) {
        // console.log(providerData);

        for (const slotdata of slots) {
          const today = date.toISOString().split('T')[0];

          await Slot.create({
            providerId: providerData._id,
            date: today,
            time: slotdata,
            capacity: 3,
          });
        }
      }

      date.setDate(date.getDate() + 1);
    }

    console.log('slot created ');

    console.log(`${services.length} services created`);
    console.log(`${providers.length} providers created`);

    console.log('Seed completed successfully');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

// seedData();
