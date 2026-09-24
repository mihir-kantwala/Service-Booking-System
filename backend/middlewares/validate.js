import mongoose from 'mongoose';

export const validateCredentials = (req, res, next) => {
  const {
    serviceId,
    providerId,
    slotId,
    customerName,
    customerEmail,
    participants,
  } = req.body;

  if (
    !serviceId ||
    !providerId ||
    !slotId ||
    !customerName ||
    !customerEmail ||
    !participants
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (!Number.isInteger(participants) || participants <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Participants must be a positive number',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid serviceId',
    });
  }
  if (!mongoose.Types.ObjectId.isValid(providerId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid providerId',
    });
  }
  if (!mongoose.Types.ObjectId.isValid(slotId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid slotId',
    });
  }
  const Name = customerName.trim();
  const Email = customerEmail.trim().toLowerCase();

  const nameRegex = /^[a-zA-Z\s'-]{2,30}$/;

  if (!nameRegex.test(Name)) {
    return res.status(400).json({
      success: false,
      message: 'not a valid name',
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(Email)) {
    return res.status(400).json({
      success: false,
      message: 'not a valid Email',
    });
  }

  req.body.customerName = Name;
  req.body.customerEmail = Email;

  next();
};
