import { House } from '../models/houseModel';
import { HouseApiModel } from '../models/houseApiModel';
import { reviewMapper } from './reviewMapper';

export const houseMapper = (house: House): HouseApiModel => {
  return {
    id: house._id,
    name: house.name,
    summary: house.summary,
    description: house.description,
    image: house.images.picture_url,
    accommodates: house.accommodates,
    bedrooms: house.bedrooms,
    bathrooms: house.bathrooms,
    amenities: house.amenities,
    price: house.price,
    address: `${house.address.street}, ${house.address.suburb}, ${house.address.country}`,
    reviews: house.reviews.slice(-5).map(reviewMapper), // Las ultimas 5 reviews
  };
};
