
import { houseMapper } from '../mappers/houseMapper';
import { House } from '../models/houseModel';

describe('houseMapper', () => {
  it('should map a House to HouseApiModel correctly', () => {
    const mockHouse: House = {
      _id: '123',
      listing_url: 'some_url',
      name: 'Beautiful House',
      summary: 'A beautiful house',
      space: 'Spacious',
      description: 'This is a beautiful and spacious house.',
      neighborhood_overview: 'Great neighborhood',
      notes: 'No notes',
      transit: 'Near subway',
      access: 'Full access',
      interaction: 'Minimal interaction',
      house_rules: 'No smoking',
      property_type: 'Apartment',
      room_type: 'Entire home/apt',
      bed_type: 'Real Bed',
      minimum_nights: '2',
      maximum_nights: '10',
      cancellation_policy: 'Strict',
      last_scraped: new Date(),
      calendar_last_scraped: new Date(),
      accommodates: 4,
      bedrooms: 2,
      beds: 2,
      number_of_reviews: 10,
      bathrooms: 1.5,
      amenities: ['Wifi', 'Kitchen'],
      price: 150,
      guests_included: 1,
      images: {
        thumbnail_url: 'thumbnail_url',
        medium_url: 'medium_url',
        picture_url: 'picture_url',
        xl_picture_url: 'xl_picture_url',
      },
      host: {
        host_id: 'host_123',
        host_url: 'host_url',
        host_name: 'John',
        host_location: 'New York',
        host_about: 'Superhost',
        host_thumbnail_url: 'host_thumbnail_url',
        host_picture_url: 'host_picture_url',
        host_neighbourhood: 'Downtown',
        host_is_superhost: true,
        host_has_profile_pic: true,
        host_identity_verified: true,
        host_listings_count: 1,
        host_total_listings_count: 1,
        host_verifications: ['email', 'phone'],
      },
      address: {
        street: '123 Main St',
        suburb: 'Downtown',
        government_area: 'City Area',
        market: 'NY',
        country: 'USA',
        country_code: 'US',
        location: {
          type: 'Point',
          coordinates: [40.7128, -74.0060],
          is_location_exact: true,
        },
      },
      availability: {
        availability_30: 10,
        availability_60: 20,
        availability_90: 30,
        availability_365: 365,
      },
      review_scores: {},
      reviews: [],
    };

    const result = houseMapper(mockHouse);

    expect(result).toEqual({
      id: '123',
      name: 'Beautiful House',
      summary: 'A beautiful house',
      description: 'This is a beautiful and spacious house.',
      image: 'picture_url',
      accommodates: 4,
      bedrooms: 2,
      bathrooms: 1.5,
      amenities: ['Wifi', 'Kitchen'],
      price: 150,
      address: '123 Main St, Downtown, USA',
      reviews: [],
    });
  });
});
