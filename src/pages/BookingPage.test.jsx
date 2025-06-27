import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookingPage from './BookingPage';
import accommodationsData from '../data/accommodations.json';

// Mock react-router-dom hooks
const mockNavigate = jest.fn();
let mockParams = { id: '1' }; // Default mock params

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams, // Use a variable that can be changed per test
  useLocation: () => ({
    state: {
      checkIn: '2024-08-01',
      checkOut: '2024-08-03'
    }
  }),
}));

// Mock accommodations data - take the first one for testing
const mockAccommodation = accommodationsData[0];

describe('BookingPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockNavigate.mockClear();
    // Mock console.log to prevent output during tests and to assert on it if needed
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log
    console.log.mockRestore();
  });

  test('renders accommodation details, allows booking, and shows confirmation', () => {
    render(
      <MemoryRouter initialEntries={['/booking/1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if accommodation details are displayed
    // Use a regex for text matching to be more resilient to small text changes
    // For the name in the details section, be more specific by querying within its container or by role if possible
    // Here, we'll assume the first h4 within the "Accommodation Details" section is the name.
    const detailsSection = screen.getByText('Accommodation Details').closest('section');
    expect(within(detailsSection).getByRole('heading', { name: new RegExp(mockAccommodation.name, 'i'), level: 4 })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockAccommodation.type, 'i'))).toBeInTheDocument();
    // expect(screen.getByText(/\$25\s*\/ night/i)).toBeInTheDocument(); // Price of the first accommodation, allow flexible space
    expect(screen.getByText((content, element) => {
      const normalizedText = element.textContent.replace(/\s+/g, ' ').trim();
      // Check if the text is within a P tag that also has the specific classes, to be very specific
      const isPriceParagraph = element.tagName.toLowerCase() === 'p' && element.classList.contains('text-[#b2d7e5]');
      return isPriceParagraph && normalizedText === `$${mockAccommodation.price} / night`;
    })).toBeInTheDocument();
    // expect(screen.getByText(/You're booking.*from.*2024-08-01.*to.*2024-08-03.*\(2 nights\)/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      const normalizedText = element.textContent.replace(/\s+/g, ' ').trim();
      const testCheckIn = '2024-08-01'; // From useLocation mock
      const testCheckOut = '2024-08-03'; // From useLocation mock
      const dIn = new Date(testCheckIn);
      const dOut = new Date(testCheckOut);
      const diffTime = Math.abs(dOut - dIn);
      const calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const expectedText = `You're booking ${mockAccommodation.name} from ${testCheckIn} to ${testCheckOut} (${calculatedNights} night${calculatedNights === 1 ? '' : 's'}).`;
      return element.tagName.toLowerCase() === 'p' && element.classList.contains('text-gray-600') && normalizedText === expectedText;
    })).toBeInTheDocument();

    // Check total price (25 * 2 nights = 50)
    const testCheckIn = '2024-08-01';
    const testCheckOut = '2024-08-03';
    const dIn = new Date(testCheckIn);
    const dOut = new Date(testCheckOut);
    const diffTime = Math.abs(dOut - dIn);
    const calculatedNightsForTotal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const testTotalPrice = mockAccommodation.price * calculatedNightsForTotal;

    // Find the "Total" label, then look for the price nearby.
    // This assumes "Total" and the price are within the same "Price Summary" section.
    const priceSummarySection = screen.getByRole('heading', { name: /Price Summary/i }).closest('section');
    const totalLabelElement = within(priceSummarySection).getByText('Total');
    expect(totalLabelElement).toBeInTheDocument();

    // Find the parent div of "Total" label and its sibling price
    const totalRowDiv = totalLabelElement.closest('div.flex.justify-between');
    expect(within(totalRowDiv).getByText(`$${testTotalPrice}`, { selector: 'p.text-\\[\\#19abe5\\]' })).toBeInTheDocument();


    // Fill in user details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });

    // Click confirm and book button
    fireEvent.click(screen.getByRole('button', { name: /Confirm and Book/i }));

    // Check if confirmation screen is displayed
    expect(screen.getByText(/Booking Confirmed!/i)).toBeInTheDocument();
    // expect(screen.getByText(new RegExp(`Thank you for booking ${mockAccommodation.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      const normalizedText = element.textContent.replace(/\s+/g, ' ').trim();
      return normalizedText === `Thank you for booking ${mockAccommodation.name}.`;
    })).toBeInTheDocument();
    expect(screen.getByText(/Check-in: 2024-08-01/i)).toBeInTheDocument();
    expect(screen.getByText(/Check-out: 2024-08-03/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price: \$50/i)).toBeInTheDocument();
    expect(screen.getByText(/A confirmation email has been sent to john.doe@example.com/i)).toBeInTheDocument();

    // Check for QR code (presence of img alt text)
    expect(screen.getByAltText(/Booking QR Code/i)).toBeInTheDocument();
  });

  test('shows loading message if accommodation data is not yet available', () => {
    // Temporarily make accommodationsData empty or mock useParams to an ID not in the list
    // For simplicity, we'll rely on the initial state of accommodation being null
    // and use a different route that won't match an ID, forcing accommodation to be null initially.
    // This test is a bit tricky without directly controlling the useEffect fetch.
    // A more robust way would be to mock accommodationsData to be empty or undefined.

    const originalMockParams = { ...mockParams }; // Save original
    mockParams = { id: '999' }; // Set params for this test

    render(
      <MemoryRouter initialEntries={['/booking/999']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading accommodation details\.\.\./i)).toBeInTheDocument();
    mockParams = originalMockParams; // Restore original mock params
  });

  test('requires name and email before confirming booking', () => {
    render(
      <MemoryRouter initialEntries={['/booking/1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock window.alert

    // Attempt to book without filling details
    fireEvent.click(screen.getByRole('button', { name: /Confirm and Book/i }));

    expect(window.alert).toHaveBeenCalledWith('Please fill in your name and email.');
    // Ensure confirmation screen is not shown
    expect(screen.queryByText(/Booking Confirmed!/i)).not.toBeInTheDocument();

    window.alert.mockRestore(); // Restore alert
  });
});
