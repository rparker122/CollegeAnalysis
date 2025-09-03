# API Documentation

## Data Processing Scripts

### generate_sample_data.py

Generates realistic college admissions data for testing and demonstration.

**Usage:**
\`\`\`bash
python scripts/generate_sample_data.py
\`\`\`

**Output:**
- `college_admissions_data.json` - Raw college data

**Data Structure:**
\`\`\`json
{
  "name": "Harvard University",
  "acceptance_rate": 5.2,
  "tuition": 54002,
  "sat_average": 1520,
  "enrollment": 23000,
  "demographics": {
    "white": 45.2,
    "asian": 25.1,
    "hispanic": 12.3,
    "black": 8.7,
    "other": 8.7
  },
  "location": {
    "state": "MA",
    "region": "Northeast"
  }
}
\`\`\`

### data_processor.py

Comprehensive data processing and analysis toolkit.

**Class: CollegeDataProcessor**

#### Methods

**`__init__(data_file: str)`**
- Initialize processor with data file path
- Default: `'college_admissions_data.json'`

**`load_data() -> Dict[str, Any]`**
- Load college data from JSON file
- Returns: Dictionary of college data

**`create_dataframe() -> pd.DataFrame`**
- Convert JSON data to pandas DataFrame
- Flattens nested structure for analysis

**`clean_data() -> pd.DataFrame`**
- Remove invalid entries
- Validate acceptance rates (0-100%)
- Validate SAT scores (400-1600)
- Validate positive tuition values

**`calculate_statistics() -> Dict[str, Any]`**
- Calculate mean, median, std dev, min, max
- For: acceptance_rate, tuition, sat_average, enrollment

**`analyze_by_region() -> Dict[str, Any]`**
- Group data by geographic region
- Calculate regional averages and totals

**`find_correlations() -> Dict[str, float]`**
- Calculate correlation coefficients between metrics
- Returns key relationships (tuition vs SAT, etc.)

**`export_processed_data(format_type: str) -> str`**
- Export cleaned data
- Formats: 'json', 'csv'

### data_validator.py

Data quality validation and error reporting.

**Class: DataValidator**

#### Methods

**`validate_college_entry(college: Dict, index: int) -> Tuple[List[str], List[str]]`**
- Validate single college entry
- Returns: (errors, warnings)

**`validate_dataset() -> Dict[str, Any]`**
- Validate entire dataset
- Check for duplicates, missing fields, invalid values

**`print_validation_report()`**
- Generate formatted validation report
- Print summary statistics and issues

### export_for_dashboard.py

Format data specifically for dashboard consumption.

**Function: prepare_dashboard_data()**

**Returns:**
\`\`\`json
{
  "acceptance_rates": [...],      // Top 15 colleges by acceptance rate
  "tuition_analysis": [...],      // Tuition vs SAT scatter data
  "sat_distribution": [...],      // SAT score histogram bins
  "demographics": [...],          // Regional demographic averages
  "summary_stats": {...},         // Key metrics for overview cards
  "regional_analysis": {...}      // Detailed regional breakdown
}
\`\`\`

## Frontend Hooks

### useDashboardData()

Custom React hook for data management.

**Returns:**
\`\`\`typescript
{
  data: DashboardData | null,     // Chart data
  loading: boolean,               // Loading state
  error: string | null            // Error message
}
\`\`\`

**Data Types:**
\`\`\`typescript
interface DashboardData {
  acceptance_rates: Array<{
    name: string
    acceptance_rate: number
  }>
  tuition_analysis: Array<{
    name: string
    tuition: number
    sat_average: number
    acceptance_rate: number
  }>
  sat_distribution: Array<{
    range: string
    count: number
    midpoint: number
  }>
  demographics: Array<{
    region: string
    white: number
    asian: number
    hispanic: number
    black: number
    other: number
  }>
  summary_stats: {
    avg_acceptance_rate: number
    total_applications: string
    avg_tuition: number
    avg_sat: number
  }
}
\`\`\`

## Error Handling

### Data Validation Errors
- **Invalid acceptance rate**: Must be 0-100%
- **Invalid SAT score**: Must be 400-1600
- **Invalid tuition**: Must be positive number
- **Missing required fields**: name, acceptance_rate, tuition, sat_average

### Processing Warnings
- **High tuition**: Above $80,000
- **Demographics sum**: Not equal to 100% (±1% tolerance)
- **Duplicate names**: Multiple colleges with same name

## Performance Considerations

### Data Processing
- Use pandas for large datasets (>1000 colleges)
- Implement chunking for memory efficiency
- Cache processed results

### Frontend
- Implement data pagination for large datasets
- Use React.memo for chart components
- Lazy load chart libraries
- Implement virtual scrolling for large lists

## Integration Examples

### Adding New Data Source
\`\`\`python
# In generate_sample_data.py
def load_external_data(source_url):
    # Fetch from API or load from file
    # Transform to standard format
    # Validate and clean
    return processed_data
\`\`\`

### Custom Chart Component
\`\`\`typescript
// New chart component
export function CustomChart() {
  const { data, loading } = useDashboardData()
  
  if (loading) return <LoadingSkeleton />
  
  return (
    <ResponsiveContainer>
      <YourChart data={data?.custom_data} />
    </ResponsiveContainer>
  )
}
