# Colab Contract - Founding Contributor Engagement Agreement

A comprehensive web application for managing and understanding the Founding Contributor Engagement Agreement template. This tool provides interactive calculators, forms, and detailed contract information to help startups establish clear terms with their founding teams.

## Features

### 🎯 Core Functionality
- **Interactive Vesting Calculator**: Visualize equity vesting schedules with logarithmic acceleration
- **Deferred Compensation Calculator**: Calculate pro-rata wage distributions based on available profit
- **Contract Overview**: Clear explanation of the twofold principles (Protections & Compensations)
- **Professional UI**: Modern, responsive design with dark/light theme support

### 📊 Interactive Tools

#### Vesting Equity Calculator
- Adjustable equity percentage (1-50%)
- Configurable vesting period (1-10 years)
- Real-time chart visualization using MUI X Charts
- Detailed vesting schedule table
- 6-month cliff period visualization
- Logarithmic vesting formula: `Vested Equity = Total Equity × ((Days Worked - Cliff Days) / (Total Vesting Days - Cliff Days))²`

#### Deferred Compensation Calculator
- Input hourly rates and accrued hours for contributors and founders
- Calculate pro-rata payment distribution
- Visual pie chart showing payment breakdown
- Payment condition validation (expenses paid, reserves maintained)
- Real-time calculation updates

### 🎨 Design Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Theme Support**: Light and dark mode toggle
- **Professional Styling**: Clean, modern interface using Material-UI
- **Interactive Elements**: Sliders, charts, and real-time calculations
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Technology Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library and theming
- **MUI X Charts** - Interactive data visualization
- **Vite** - Fast build tool and development server

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd colab-contract
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── SimpleVestingCalculator.tsx      # Interactive vesting calculator
│   ├── SimpleDeferredCompensationCalculator.tsx  # Wage calculation tool
│   ├── VestingCalculator.tsx            # Full vesting calculator (with Grid issues)
│   ├── DeferredCompensationCalculator.tsx  # Full compensation calculator
│   ├── ContractDetails.tsx              # Complete contract details
│   ├── FounderForm.tsx                  # Founder information form
│   ├── CollaboratorForm.tsx             # Collaborator information form
│   └── index.ts                         # Component exports
├── contexts/
│   └── ThemeContext.tsx                 # Theme management
├── App.tsx                              # Main application component
├── main.tsx                             # Application entry point
└── index.css                           # Global styles
```

## Contract Template Overview

The Founding Contributor Engagement Agreement is built on two core principles:

### 1. Protections
- **IP Ownership**: Clear definition of company vs. personal intellectual property
- **Mutual Commitment**: Quarterly performance reviews and accountability
- **Non-Solicitation**: 12-month restrictions on poaching employees/customers
- **Code Reuse**: 12-month restrictions on competitive use of company code

### 2. Compensations
- **Accelerating Equity Vesting**: Logarithmic schedule rewarding long-term commitment
- **Deferred Wages**: Pro-rata payment system when company becomes profitable
- **6-Month Cliff**: No equity vests before completing 180 days of work
- **Transparent Tracking**: Shared digital time logs with dispute resolution

## Key Formulas

### Vesting Calculation
```
Vested Equity = Total Equity × ((Days Worked - Cliff Days) / (Total Vesting Days - Cliff Days))²
```

### Deferred Wage Distribution
```
Distribution Percentage = Available Profit / Total Accrued Wages
Individual Payment = Individual Accrued Wages × Distribution Percentage
```

## Usage Examples

### For Founders
1. Use the **Vesting Calculator** to determine appropriate equity grants
2. Set up **Deferred Compensation** terms for fair wage accrual
3. Review **Contract Details** to understand all protections and terms

### For Contributors
1. Use calculators to understand potential equity and compensation
2. Review contract terms to ensure alignment with expectations
3. Understand the 6-month cliff and vesting acceleration

## Customization

The application is designed to be easily customizable:

- **Themes**: Modify colors and styling in `ThemeContext.tsx`
- **Calculations**: Update formulas in calculator components
- **Contract Terms**: Modify contract details in `ContractDetails.tsx`
- **Forms**: Customize form fields and validation in form components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Note**: This application is a template and tool for understanding the Founding Contributor Engagement Agreement. Always consult with legal professionals before using any contract template in actual business situations.