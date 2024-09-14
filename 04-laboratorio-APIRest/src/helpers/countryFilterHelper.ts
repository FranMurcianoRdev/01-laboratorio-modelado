
export const filterByCountry = (houses: any[], country: string) => {
    return houses.filter((house) => house.address.country === country);
};
