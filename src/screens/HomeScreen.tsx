import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Loader, DefaultButton, MessageDialog } from '../components';
import { hotelList } from '../graphql/queries';
import { LOAD_HOTELS, ERROR_DIALOG, TRY_AGAIN, CLOSE } from '../utils/Constants';
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

  return (
    <div className='container'>
      <DefaultButton disabled={data ? true : false} text={LOAD_HOTELS} buttonClick={() => getHotels()} />
      {showErrorDialog && renderErrorConnectionDialog()}
      {loading ?
        <Loader />
        : null}
    </div>

  );
};
export default HomeScreen;
