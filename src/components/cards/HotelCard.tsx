import React, { useState } from 'react';
import { ImageGallery, StarRating, Review } from '../layouts';
import { DefaultButton } from '../buttons';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { SHOW_REVIEWS, HIDE_REVIEWS } from '../../utils/Constants';
import { format } from 'date-fns';
import './HotelCard.css';

export type hotelItem = {
    sys: {
        id: string;
    };
    name: string;
    description: {
        json: any
    };
    rating: number;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    price: {
        value: string,
        symbol: string,
    };
    imagesCollection: {
        items: {
            url: string;
        }[];
    };
};

type HotelCardProps = {
    item: hotelItem;
};

const HotelCard: React.FC<HotelCardProps> = ({ item }) => {
    const [isReviewsShow, setIsReviewsShow] = useState(false);

    const onReviewShow = () => {
        setIsReviewsShow(!isReviewsShow);
    };

    return (
        <div className='card-container'>
            <div className="card-content">
                <div className="image-container">
                    <ImageGallery images={item?.imagesCollection?.items} />
                </div>
                <div className="inner-content">
                    <div className="hotel-header">
                        <div>
                            <h2 className='name'>{item?.name}</h2>
                            <p className='country'>{`${item?.city} - ${item?.country}`}</p>
                        </div>
                        <StarRating rating={item?.rating} />
                    </div>
                    <p className='description'>{documentToPlainTextString(item?.description?.json)}</p>
                    <div className="hotel-header">
                        <DefaultButton text={isReviewsShow ? HIDE_REVIEWS : SHOW_REVIEWS} buttonClick={() => onReviewShow()} />
                        <div>
                            <p className='price'>{`${item?.price?.value} ${item?.price?.symbol}`}</p>
                            <p className='country'>{`${format(new Date(item?.startDate), "dd-MM-yyyy")} - ${format(new Date(item?.endDate), "dd-MM-yyyy")}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            {isReviewsShow && <Review dismissReviewContainer={() => { setIsReviewsShow(false); }} specificSysId={item?.sys?.id} />}
        </div>
    );
};

export default HotelCard;
