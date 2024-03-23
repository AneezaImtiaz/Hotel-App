import React from 'react';
import { useQuery } from '@apollo/client';
import { reviewList } from '../../graphql/queries';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Loader } from '../overlays';
import { ERROR_DIALOG, NO_REVIEW_DIALOG, CLOSE } from '../../utils/Constants';
import { MessageDialog } from '../dialogs'
import './Review.css';

export type reviewItem = {
  customer: {
    firstName: string;
    lastName: string;
  };
  feedback: string;
  comment: {
    json: any
  };
};

interface ReviewProps {
  specificSysId: string;
  dismissReviewContainer: (() => void);

}

const Review: React.FC<ReviewProps> = ({ specificSysId, dismissReviewContainer = () => null }) => {

  const { loading, error, data } = useQuery(reviewList, {
    variables: { id: specificSysId },
  });

  const renderErrorConnectionDialog = () => {
    return (
      <MessageDialog
        title={ERROR_DIALOG.title}
        description={ERROR_DIALOG.description}
        button={CLOSE}
        onButtonClick={() => dismissReviewContainer()}
      />
    );
  };

  const renderNoDataDialog = () => {
    return (
      <MessageDialog
        title={NO_REVIEW_DIALOG.title}
        description={NO_REVIEW_DIALOG.description}
        button={CLOSE}
        onButtonClick={() => dismissReviewContainer()}
      />
    );
  };

  const feedbackSymbol = (feedback: string) => {
    return feedback.toLowerCase() === 'positive' ? '+' : '-';
  };

  return (
    <div className="review-container">
      {error?.message && renderErrorConnectionDialog()}
      {loading ?
        <Loader />
        : data?.reviewCollection?.items.length > 0
          ? data?.reviewCollection?.items?.map((item: reviewItem) =>
            <div className="review-content">
              <div className='feedback-container'>
                <div>{feedbackSymbol(item?.feedback)}</div>
              </div>
              <div className='comment'>
                <h2>{`${item?.customer?.firstName} ${item?.customer?.lastName}`}</h2>
                <p>{documentToPlainTextString(item?.comment?.json)}</p>
              </div>
            </div>
          ) : renderNoDataDialog()
      }
    </div>
  );
};

export default Review;