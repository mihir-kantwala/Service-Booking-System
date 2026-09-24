const API_URI = 'http://localhost:5000/api';

export const getService = async () => {
  try {
    const res = await fetch(`${API_URI}/services`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(res.message || 'Error Fetcing Services');
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProvider = async (serviceId) => {
  // console.log(serviceId);

  try {
    const res = await fetch(`${API_URI}/providers?serviceId=${serviceId}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(res.message || 'Error Fetcing providers');
    }
    const data = await res.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSlots = async (providerData) => {
  console.log(providerData);

  const { providerId, date } = providerData;

  try {
    const res = await fetch(
      `${API_URI}/slots?providerId=${providerId}&date=${date}`,
      {
        method: 'GET',
      },
    );

    if (!res.ok) {
      throw new Error(res.message || 'Error Fetcing Slots');
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createBooking = async (formData) => {
  console.log(formData);

  try {
    const res = await fetch(`${API_URI}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(res.message || 'Error booking serviec');
    }
    console.log(res);

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
