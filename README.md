# College Admissions Analysis Dashboard

A comprehensive interactive dashboard for analyzing college admissions data, including acceptance rates, tuition costs, SAT scores, and demographic distributions across different regions.

## Features

- **Interactive Data Visualization**: Dynamic charts showing acceptance rates, tuition analysis, SAT score distributions, and demographics
- **Real-time Statistics**: Key metrics overview with trend indicators
- **Regional Analysis**: Breakdown of college data by geographic regions
- **Data Processing Pipeline**: Robust Python scripts for data validation, cleaning, and analysis
- **Responsive Design**: Mobile-first design that works across all devices
- **Professional UI**: Clean, trustworthy interface optimized for academic data

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Charts**: Recharts for interactive data visualization
- **Data Processing**: Python with pandas, numpy
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd college-admissions-analysis
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Generate sample data**
   \`\`\`bash
   # Generate initial dataset
   python scripts/generate_sample_data.py
   
   # Process and validate data
   python scripts/data_processor.py
   python scripts/data_validator.py
   
   # Export data for dashboard
   python scripts/export_for_dashboard.py
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
college-admissions-analysis/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles and design tokens
├── components/                   # React components
│   ├── ui/                      # shadcn/ui base components
│   ├── dashboard-header.tsx     # Header with search and navigation
│   ├── metrics-overview.tsx     # Key statistics cards
│   ├── acceptance-rate-chart.tsx # Bar chart for acceptance rates
│   ├── tuition-analysis.tsx     # Scatter plot for tuition vs SAT
│   ├── sat-score-distribution.tsx # Histogram for SAT scores
│   └── demographics-chart.tsx   # Stacked bar chart for demographics
├── hooks/                       # Custom React hooks
│   └── use-dashboard-data.ts    # Data fetching and state management
├── scripts/                     # Python data processing scripts
│   ├── generate_sample_data.py  # Generate realistic college data
│   ├── data_processor.py        # Data cleaning and analysis
│   ├── data_validator.py        # Data validation and quality checks
│   └── export_for_dashboard.py  # Format data for dashboard consumption
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities (cn function, etc.)
└── README.md                    # This file
\`\`\`

## Data Processing Pipeline

### 1. Data Generation
\`\`\`bash
python scripts/generate_sample_data.py
\`\`\`
Generates realistic college admissions data including:
- College names and locations
- Acceptance rates (5-85%)
- Tuition costs ($25k-$60k)
- SAT averages (1200-1580)
- Student enrollment numbers
- Demographic breakdowns by race/ethnicity

### 2. Data Processing & Analysis
\`\`\`bash
python scripts/data_processor.py
\`\`\`
- Cleans and validates data
- Calculates statistical summaries
- Performs correlation analysis
- Groups data by geographic regions
- Exports processed data in multiple formats

### 3. Data Validation
\`\`\`bash
python scripts/data_validator.py
\`\`\`
- Validates data integrity and consistency
- Checks for missing or invalid values
- Ensures demographic percentages sum to 100%
- Identifies potential data quality issues

### 4. Dashboard Data Export
\`\`\`bash
python scripts/export_for_dashboard.py
\`\`\`
- Formats data specifically for dashboard consumption
- Creates optimized datasets for each chart component
- Generates summary statistics for metrics overview

## Dashboard Components

### Metrics Overview
Displays key statistics:
- Average acceptance rate across all colleges
- Total applications (simulated)
- Average tuition costs
- Average SAT scores

### Acceptance Rate Chart
Interactive bar chart showing the top 15 colleges with highest acceptance rates.

### Tuition Analysis
Scatter plot exploring the relationship between tuition costs and SAT score requirements.

### SAT Score Distribution
Histogram showing the distribution of average SAT scores across all colleges in the dataset.

### Demographics Chart
Stacked bar chart displaying demographic composition by geographic region.

## Customization

### Adding New Data Sources
1. Modify `scripts/generate_sample_data.py` to include your data source
2. Update the data validation rules in `scripts/data_validator.py`
3. Adjust the processing logic in `scripts/data_processor.py`
4. Update dashboard components to handle new data fields

### Styling and Theming
The project uses a semantic design token system defined in `app/globals.css`:
- Primary color: Red (#dc2626) for academic/institutional feel
- Secondary color: Amber (#f59e0b) for highlights and accents
- Neutral colors: Grays and whites for backgrounds and text
- Typography: Playfair Display for headings, Geist Sans for body text

### Adding New Charts
1. Create a new component in `components/`
2. Use Recharts for consistency with existing charts
3. Add the component to `app/page.tsx`
4. Update `hooks/use-dashboard-data.ts` if new data is needed

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Manual Deployment
1. Build the project: `npm run build`
2. Start the production server: `npm start`
3. Deploy the `.next` folder to your hosting provider

## Data Sources

This project uses simulated data for demonstration purposes. In a production environment, you could integrate with:

- **College Scorecard API**: Official U.S. Department of Education data
- **IPEDS Database**: Integrated Postsecondary Education Data System
- **Kaggle Datasets**: Various college admissions datasets
- **University APIs**: Direct integration with institutional data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data visualization powered by [Recharts](https://recharts.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Data processing with [pandas](https://pandas.pydata.org/) and [NumPy](https://numpy.org/)
\`\`\`

```json file="" isHidden
