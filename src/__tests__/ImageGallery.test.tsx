import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery } from '../components';

describe('ImageGallery', () => {
    const mockImages = [
        { url: 'http://example.com/image1.png' },
        { url: 'http://example.com/image2.png' },
        { url: 'http://example.com/image3.png' },
    ];

    test('initially displays the first image', () => {
        render(<ImageGallery images={mockImages} />);
        const backgroundImage = screen.getByTestId('imageGallery').style.backgroundImage;
        expect(backgroundImage).toContain(mockImages[0].url);
    });

    test('displays the next image when forward icon is clicked', () => {
        render(<ImageGallery images={mockImages} />);
        fireEvent.click(screen.getByAltText('forwardIcon'));
        const backgroundImageAfter = screen.getByTestId('imageGallery').style.backgroundImage;
        expect(backgroundImageAfter).toContain(mockImages[1].url);
    });

    test('displays the previous image when back icon is clicked', () => {
        render(<ImageGallery images={mockImages} />);
        // Move forward first to the second image
        fireEvent.click(screen.getByAltText('forwardIcon'));
        // Then click the back icon to go back to the first image
        fireEvent.click(screen.getByAltText('backIcon'));
        const backgroundImageAfter = screen.getByTestId('imageGallery').style.backgroundImage;
        expect(backgroundImageAfter).toContain(mockImages[0].url);
    });

    test('loops to the last image when back icon is clicked on the first image', () => {
        render(<ImageGallery images={mockImages} />);
        // Click the back icon to go to the last image
        fireEvent.click(screen.getByAltText('backIcon'));
        const backgroundImageAfter = screen.getByTestId('imageGallery').style.backgroundImage;
        expect(backgroundImageAfter).toContain(mockImages[mockImages.length - 1].url);
    });

    test('loops to the first image when forward icon is clicked on the last image', () => {
        render(<ImageGallery images={mockImages} />);
        const forwardButton = screen.getByAltText('forwardIcon');

        // Click the forward icon enough times to loop back to the first image
        for (let i = 0; i < mockImages.length; i++) {
            fireEvent.click(forwardButton);
        }

        // After cycling through all images, we should be back at the first image
        const backgroundImageStyle = screen.getByTestId('imageGallery').style.backgroundImage;
        expect(backgroundImageStyle).toContain(mockImages[0].url);
    });
});
