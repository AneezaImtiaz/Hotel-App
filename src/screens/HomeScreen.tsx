import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Loader, DefaultButton, MessageDialog, HotelCard } from '../components';
import { hotelList } from '../graphql/queries';
import { LOAD_HOTELS, ERROR_DIALOG, TRY_AGAIN, CLOSE } from '../utils/Constants';
import { hotelItem } from '../components/cards/HotelCard';
import './HomeScreen.css';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {

  const [getHotels, { loading, error, data }] = useLazyQuery(hotelList);
  const [showErrorDialog, setShowErrorDialog] = useState(error?.message ? true : false);

  const renderErrorConnectionDialog = () => {
    return (
      <MessageDialog
        title={ERROR_DIALOG.title}
        description={ERROR_DIALOG.description}
        button={TRY_AGAIN}
        closeButton={CLOSE}
        onClose={() => { setShowErrorDialog(false); }}
        onButtonClick={() => { setShowErrorDialog(false); getHotels(); }}
      />
    );
  };

  const renderItem = (item: hotelItem) => {
    return (<HotelCard item={item} />);
  };

  return (
    <div className='container'>
      <div className='button-container'>
        <DefaultButton disabled={data ? true : false} text={LOAD_HOTELS} buttonClick={() => getHotels()} />
      </div>
      {showErrorDialog && renderErrorConnectionDialog()}
      {loading ?
        <Loader />
        : data?.hotelCollection?.items.map((item: any) => renderItem(item))
      }
    </div>

  );
};
export default HomeScreen;
