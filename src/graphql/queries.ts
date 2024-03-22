import { gql } from '@apollo/client';

export const hotelList = gql`
  query getHotels {
    hotelCollection(limit: 5) {
      items {
        sys {
          id
        }
        name
        description {
          json
        }
        rating
        city
        country
        startDate
        endDate
        price
        imagesCollection {
          items {
						url
          }
        }
      }
    }
  }
`;
