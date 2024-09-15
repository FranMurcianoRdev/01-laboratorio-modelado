import { House } from "../model/houseModel";

interface HouseDetail {
  name: string;
  picture_url: string;
  description: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  reviews: ReviewDetail[]; // Las últimas 5 reseñas
}

interface ReviewDetail {
  name: string;
  comment: string;
  date: Date;
}

export const houseToHouseApiDetail = (house: House): HouseDetail => {
  return {
    name: house.name,
    picture_url: house.images.picture_url,
    description: house.description,
    address: `${house.address.street}, ${house.address.suburb}, ${house.address.country}`,
    bedrooms: house.bedrooms,
    beds: house.beds,
    bathrooms: house.bathrooms,
    reviews: house.reviews.slice(0, 5).map(review => ({
      name: review.name,
      comment: review.comment,
      date: review.date,
    })),
  };
};
