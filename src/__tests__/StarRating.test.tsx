import { render, screen } from '@testing-library/react';
import { StarRating } from '../components';

describe('StarRating', () => {
    test('renders five stars by default', () => {
        render(<StarRating rating={0} />);
        const stars = screen.getAllByText('☆');
        expect(stars).toHaveLength(5);
    });

    test('renders the correct number of filled stars based on rating', () => {
        const testRating = 3;
        render(<StarRating rating={testRating} />);
        const filledStars = screen.getAllByText('★');
        expect(filledStars).toHaveLength(testRating);
    });

    test('renders the correct number of empty stars based on rating', () => {
        const testRating = 3;
        render(<StarRating rating={testRating} />);
        const emptyStars = screen.getAllByText('☆');
        expect(emptyStars).toHaveLength(5 - testRating);
    });

    test('renders all stars filled when rating is the maximum', () => {
        render(<StarRating rating={5} />);
        const filledStars = screen.getAllByText('★');
        expect(filledStars).toHaveLength(5);
    });

    test('renders no filled stars when rating is the minimum', () => {
        render(<StarRating rating={0} />);
        const filledStars = screen.queryAllByText('★');
        expect(filledStars).toHaveLength(0);
    });
});