import mongoose from 'mongoose';

const provideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Provider = mongoose.model('Provider', provideSchema);

export default Provider;
