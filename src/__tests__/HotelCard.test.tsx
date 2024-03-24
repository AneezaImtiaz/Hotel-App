import { render, screen, fireEvent } from '@testing-library/react';
import { HotelCard } from '../components';
import { SHOW_REVIEWS, HIDE_REVIEWS } from '../utils/Constants';

// Mock components
jest.mock('../components/layouts/ImageGallery', () => {
    return ({ images }) => <div data-testid="mock-image-gallery">ImageGallery component</div>;
});
jest.mock('../components/layouts/StarRating', () => {
    return ({ rating }) => <div data-testid="mock-star-rating">StarRating component</div>;
});
jest.mock('../components/layouts/Review', () => {
    return ({ dismissReviewContainer }) => <div data-testid="mock-review">Review component</div>;
});

describe('HotelCard', () => {
    const mockHotelItem = {
        sys: { id: '123' },
        name: 'Hotel Sunshine',
        description: { json: { content: [{ content: [{ value: 'A lovely place to stay.' }] }] } },
        rating: 5,
        city: 'Paris',
        country: 'France',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
        price: { value: '100', symbol: '€' },
        imagesCollection: { items: [{ url: 'http://example.com/image.jpg' }] },
    };

    it('renders with initial state without reviews', () => {
        render(<HotelCard item={mockHotelItem} />);
        expect(screen.getByText(mockHotelItem.name)).toBeInTheDocument();
        expect(screen.getByText(`${mockHotelItem.city} - ${mockHotelItem.country}`)).toBeInTheDocument();
        expect(screen.getByText(SHOW_REVIEWS)).toBeInTheDocument();
        expect(screen.queryByTestId('mock-review')).not.toBeInTheDocument();
    });

    it('toggles reviews visibility when button is clicked', () => {
        render(<HotelCard item={mockHotelItem} />);
        const button = screen.getByText(SHOW_REVIEWS);
        fireEvent.click(button);
        expect(button).toHaveTextContent(HIDE_REVIEWS);
        expect(screen.getByTestId('mock-review')).toBeInTheDocument();
        fireEvent.click(button);
        expect(button).toHaveTextContent(SHOW_REVIEWS);
        expect(screen.queryByTestId('mock-review')).not.toBeInTheDocument();
    });
});