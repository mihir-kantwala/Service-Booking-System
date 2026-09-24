import { useEffect, useState } from 'react';
import {
  createBooking,
  getProvider,
  getService,
  getSlots,
} from '../Apis/serviceApis';

export default function ServiceBookingPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [providerData, setProvierData] = useState({
    providerId: '',
    date: '',
  });
  const [providers, setProviders] = useState([]);

  const [slots, setSlot] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    slotId: '',
    customerName: '',
    customerEmail: '',
    participants: 0,
  });

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getService();
      setServices(res.services);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!serviceId) {
      setProvierData({
        providerId: '',
        date: '',
      });
      setProviders([]);
      return;
    }
    setProvierData({
      providerId: '',
      date: '',
    });
    setProviders([]);

    const fetchProviders = async () => {
      const res = await getProvider(serviceId);
      setProviders(res.providers);
    };

    fetchProviders();
  }, [serviceId]);

  useEffect(() => {
    if (!providerData.providerId || !providerData.date) {
      setSlot([]);
      return;
    }

    const fetchSlots = async () => {
      const res = await getSlots(providerData);
      setSlot(res.slots);
    };

    fetchSlots();
  }, [providerData.providerId, providerData.date]);

  const handleProviderChange = (e) => {
    setProvierData((prev) => ({
      ...prev,
      providerId: e.target.value,
      date: '',
    }));

    setSlot([]);
  };

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingFormSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      serviceId,
      providerId: providerData.providerId,
      slotId: bookingForm.slotId,
      customerName: bookingForm.customerName,
      customerEmail: bookingForm.customerEmail,
      participants: Number(bookingForm.participants),
    };

    console.log(bookingData);

    try {
      const res = await createBooking(bookingData);
      console.log(res);

      if (res) {
        setServiceId('');
        setProvierData({
          providerId: '',
          date: '',
        });
        setProviders([]);
        setSlot([]);
        setBookingForm({
          slotId: '',
          customerName: '',
          customerEmail: '',
          participants: 0,
        });
      }
    } catch (error) {
      console.log(error?.res?.data || error);
    }
  };

  return (
    <section>
      <h1>booking page</h1>
      <div>
        <label>Select Service :</label>
        <select
          name="serviceId"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <label>Select Provider :</label>
        <select
          name="providerId"
          value={providerData.providerId}
          onChange={handleProviderChange}
        >
          <option value="">Select Provider</option>
          {providers.map((provider) => (
            <option key={provider._id} value={provider._id}>
              {provider.name}
            </option>
          ))}
        </select>

        <label>Select date : </label>
        <input
          type="date"
          name="date"
          value={providerData.date}
          onChange={(e) =>
            setProvierData((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
        />

        <div>
          {slots.length > 0 &&
            slots.map((slot) => (
              <button
                type="button"
                key={slot._id}
                name="slotId"
                value={slot._id}
                onClick={handleBookingFormChange}
              >
                {slot.time}
              </button>
            ))}
        </div>
      </div>
      {slots.length > 0 && (
        <form onSubmit={handleBookingFormSubmit}>
          <label>Enater Name :</label>
          <input
            type="text"
            name="customerName"
            value={bookingForm.customerName}
            onChange={handleBookingFormChange}
          />
          <label>Enater Email :</label>
          <input
            type="email"
            name="customerEmail"
            value={bookingForm.customerEmail}
            onChange={handleBookingFormChange}
          />
          <label>Enater Participants :</label>
          <input
            type="Number"
            name="participants"
            value={bookingForm.participants}
            onChange={handleBookingFormChange}
          />

          <button type="submit">Book</button>
        </form>
      )}
    </section>
  );
}
