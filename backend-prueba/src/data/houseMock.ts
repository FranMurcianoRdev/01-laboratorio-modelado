let houseMockList = [
  {
    _id: '1',
    name: 'Casa Mock 1',
    summary: 'Esta es una casa de prueba',
    description: 'Descripción de prueba',
    images: { picture_url: 'https://via.placeholder.com/150' },
    accommodates: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Wifi', 'TV'],
    price: 100,
    address: '123 Calle Mock',
    country: 'España', // Agregamos el país
    reviews: [
      {
      name: 'Juan',
      comment: 'Una casa excelente',
      date: '2024-09-14' // Esta es una fecha de ejemplo, la siguiente será automática
      }
    ],
  },
  {
    _id: '2',
    name: 'Casa Mock 2',
    summary: 'Esta es una casa de prueba 2',
    description: 'Descripción de prueba 2',
    images: { picture_url: 'https://via.placeholder.com/150' },
    accommodates: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Wifi', 'TV'],
    price: 100,
    address: '123 Calle Mock',
    country: 'México', // Agregamos el país
    reviews: [],
  },
  {
    _id: '3',
    name: 'Casa Mock 3',
    summary: 'Esta es una casa de prueba 3',
    description: 'Descripción de prueba 3',
    images: { picture_url: 'https://via.placeholder.com/150' },
    accommodates: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Wifi', 'TV'],
    price: 100,
    address: '123 Calle Mock',
    country: 'España', // Agregamos el país
    reviews: [],
  },
];


export const getHouseList = () => {
  return houseMockList;
};

export const getHouse = (id: string) => {
  return houseMockList.find((house) => house._id === id);
};

export const addReviewToHouse = (id: string, review: { name: string; comment: string }) => {
  const house = houseMockList.find(h => h._id === id);
  if (!house) return null;

  // Creamos la nueva reseña con la fecha actual
  const newReview = {
    ...review,
    date: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
  };

  // Añadimos la nueva reseña a la lista de reviews de la casa
  house.reviews = [...house.reviews, newReview];

  return house;
};

