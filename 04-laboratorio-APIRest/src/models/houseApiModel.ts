
export interface HouseApiModel {
    id: string;
    name: string;
    summary: string;
    description: string;
    image: string;
    accommodates: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    price: number;
    address: string; 
    reviews: Object;
}
