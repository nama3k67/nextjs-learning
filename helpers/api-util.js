const BASE_API =
  "https://solid-ridge-299503-default-rtdb.firebaseio.com/events.json";

const transformedData = (data) => {
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getAllEvents = async () => {
  const response = await fetch(BASE_API);
  const data = await response.json();

  return transformedData(data);
};

export const getFeaturedEvents = async () => {
  const response = await fetch(`${BASE_API}?orderBy="isFeatured"&equalTo=true`);
  const data = await response.json();

  return transformedData(data);
};

export const getEventById = async (eventId) => {
  const response = await fetch(
    `${BASE_API}?orderBy="$key"&equalTo="${eventId}"`
  );
  const data = await response.json();

  return transformedData(data);
};

export const getFilteredEvents = async ({ year, month }) => {
  const events = await getAllEvents();

  const filterEvent = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filterEvent;
};
