# Currency Converter App

A modern, interactive currency converter built with React.js based on the provided Figma design.

## Features

- **Interactive Currency Selection**: Click on currency dropdowns to select from multiple currencies (CAD, USD, EUR, GBP, JPY)
- **Real-time Conversion**: Amounts update automatically when currencies or values change
- **Editable Amount Fields**: Click on any amount to edit it directly
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal design matching the Figma specifications

## Available Currencies

- CAD - Canadian Dollar
- USD - United State Dollar
- EUR - Euro
- GBP - British Pound
- JPY - Japanese Yen

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. **Select Source Currency**: Click on the "From" dropdown to select the currency you want to convert from
2. **Select Target Currency**: Click on the "To" dropdown to select the currency you want to convert to
3. **Enter Amount**: Click on either amount field to edit the value
4. **View Results**: The conversion happens automatically and shows the result at the bottom

## Technical Details

- Built with React.js 18
- Uses CSS custom properties for consistent theming
- Responsive design with mobile-first approach
- Interactive dropdowns and editable input fields
- Dummy exchange rate data for demonstration

## Project Structure

```
src/
  components/
    CurrencyConverter.js    # Main converter component
    CurrencyField.js        # Individual currency input field
    ConversionResult.js     # Bottom result display
    ChevronDown.js         # Dropdown arrow icon
  App.js                   # Main app component
  index.js                 # React entry point
  *.css                    # Component styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Browser Support

This app works in all modern browsers including:
- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest) 