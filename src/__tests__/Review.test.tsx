import { render, screen, waitFor } from '@testing-library/react';
import { Review } from '../components';
import { MockedProvider } from '@apollo/client/testing';
import { reviewList } from '../graphql/queries';
import { ERROR_DIALOG, NO_REVIEW_DIALOG } from '../utils/Constants';

describe('Review', () => {
    it('renders loader while loading', () => {
        const dismissReviewClick = jest.fn();
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <Review specificSysId="some-specific-sys-id" dismissReviewContainer={dismissReviewClick} />
            </MockedProvider>
        );
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders error dialog on error', async () => {
        const dismissReviewClick = jest.fn();
        const errorMock = {
            request: {
                query: reviewList,
                variables: { id: 'some-specific-sys-id' },
            },
            error: new Error('An error occurred'),
        };

        render(
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                <Review specificSysId="some-specific-sys-id" dismissReviewContainer={dismissReviewClick} />
            </MockedProvider>
        );

        await waitFor(() => screen.getByText(ERROR_DIALOG.description));
        expect(screen.getByText(ERROR_DIALOG.description)).toBeInTheDocument();
    });

    it('renders no reviews dialog when there are no reviews', async () => {
        const dismissReviewClick = jest.fn();
        const noReviewsMock = {
            request: {
                query: reviewList,
                variables: { id: 'some-specific-sys-id' },
            },
            result: {
                data: {
                    reviewCollection: {
                        items: [],
                    },
                },
            },
        };

        render(
            <MockedProvider mocks={[noReviewsMock]} addTypename={false}>
                <Review specificSysId="some-specific-sys-id" dismissReviewContainer={dismissReviewClick} />
            </MockedProvider>
        );

        await waitFor(() => screen.getByText(NO_REVIEW_DIALOG.description));
        expect(screen.getByText(NO_REVIEW_DIALOG.description)).toBeInTheDocument();
    });
});