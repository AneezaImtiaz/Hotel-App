import React from 'react';
import { useQuery } from '@apollo/client';
import { hotelList } from '../graphql/queries';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const { loading, error, data } = useQuery(hotelList);

  return null;
};
export default HomeScreen;
