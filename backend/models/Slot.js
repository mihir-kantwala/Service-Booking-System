import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;
