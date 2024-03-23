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


export const reviewList = gql`
  query getReviews($id: String) {
    reviewCollection(where: { hotel: { sys: { id: $id } }}) {
      items {
        customer {
          firstName
          lastName
        }
        feedback
        comment {
          json
        }
      }
    }
  }
`;

