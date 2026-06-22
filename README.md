# Simple Retirement Calculator

A web-based retirement savings projection calculator that helps you plan your financial future.

## Features

- **Easy-to-use interface**: Input your personal financial information
- **Comprehensive projections**: Year-by-year savings breakdown
- **Visual charts**: See your savings growth over time with interactive charts
- **Detailed metrics**: Track contributions, investment gains, and projections
- **Inflation adjustment**: Account for inflation in your annual contributions

## How to Use

1. Open `index.html` in your web browser
2. Fill in your information:
   - **Current Age**: Your age today
   - **Retirement Age**: The age at which you want to retire
   - **Current Retirement Savings**: How much you've already saved
   - **Annual Income**: Your yearly gross income
   - **Annual Savings Rate**: Percentage of income you'll save for retirement
   - **Expected Annual Return**: Average investment return (typically 6-8% for diversified portfolios)
   - **Expected Inflation Rate**: Expected yearly inflation (typically 2-3%)
3. Click "Calculate Projection"
4. View your results:
   - Summary cards with key metrics
   - Interactive chart showing savings growth
   - Detailed year-by-year breakdown table

## Key Metrics Explained

- **Years Until Retirement**: How many years until your target retirement age
- **Projected Balance at Retirement**: Your estimated savings at retirement age
- **Annual Contribution**: How much you'll save per year (adjusted for inflation)
- **Total Contributed**: Sum of all your contributions over time

## Assumptions

The calculator makes the following assumptions:
- Contributions are adjusted annually for inflation
- Investment returns are consistent throughout the period
- No withdrawals or additional lump-sum deposits during the projection period
- Calculations are made at the end of each year

## Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling and responsive design
- **JavaScript**: Calculations and interactivity
- **Chart.js**: Data visualization

## Calculator Formula

The year-by-year balance is calculated as:

```
New Balance = Previous Balance × (1 + Expected Return) + Annual Contribution
```

Where Annual Contribution is adjusted each year for inflation.

## Disclaimer

This calculator is for educational and planning purposes only. It does not constitute financial advice. Please consult with a financial advisor for personalized retirement planning.