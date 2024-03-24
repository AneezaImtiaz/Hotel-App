import { render, screen, fireEvent } from '@testing-library/react';
import { MessageDialog } from '../components';

describe('MessageDialog', () => {
  test('renders MessageDialog with title and description', () => {
    const onButtonClick = jest.fn();
    render(<MessageDialog title="Test Title" description="Test Description" button="Click Me" onButtonClick={onButtonClick} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('renders a close button when closeButton prop is provided', () => {
    const onButtonClick = jest.fn();
    render(<MessageDialog title="Test Title" description="Test Description" button="Click Me" closeButton="Close" onButtonClick={onButtonClick} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('does not render a close button when closeButton prop is not provided', () => {
    const onButtonClick = jest.fn();
    render(<MessageDialog title="Test Title" description="Test Description" button="Click Me" onButtonClick={onButtonClick} />);
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  test('calls onButtonClick when the button is clicked', () => {
    const onButtonClick = jest.fn();
    render(<MessageDialog title="Test Title" description="Test Description" button="Click Me" onButtonClick={onButtonClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the close button is clicked', () => {
    const onButtonClick = jest.fn();
    const onClose = jest.fn();
    render(<MessageDialog title="Test Title" description="Test Description" button="Click Me" onButtonClick={onButtonClick} closeButton="Close" onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
