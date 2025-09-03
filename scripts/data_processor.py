import json
import pandas as pd
import numpy as np
from typing import Dict, List, Any
import statistics

class CollegeDataProcessor:
    """
    A comprehensive data processor for college admissions analysis.
    Handles data cleaning, validation, and statistical computations.
    """
    
    def __init__(self, data_file: str = 'college_admissions_data.json'):
        """Initialize with data file path."""
        self.data_file = data_file
        self.data = None
        self.df = None
        
    def load_data(self) -> Dict[str, Any]:
        """Load college data from JSON file."""
        try:
            with open(self.data_file, 'r') as f:
                self.data = json.load(f)
            print(f"Loaded data for {len(self.data)} colleges")
            return self.data
        except FileNotFoundError:
            print(f"Data file {self.data_file} not found. Please run generate_sample_data.py first.")
            return None
    
    def create_dataframe(self) -> pd.DataFrame:
        """Convert JSON data to pandas DataFrame for analysis."""
        if not self.data:
            self.load_data()
        
        # Flatten the nested structure
        flattened_data = []
        for college in self.data:
            row = {
                'name': college['name'],
                'acceptance_rate': college['acceptance_rate'],
                'tuition': college['tuition'],
                'sat_average': college['sat_average'],
                'enrollment': college['enrollment'],
                'state': college['location']['state'],
                'region': college['location']['region'],
                'white_percent': college['demographics']['white'],
                'asian_percent': college['demographics']['asian'],
                'hispanic_percent': college['demographics']['hispanic'],
                'black_percent': college['demographics']['black'],
                'other_percent': college['demographics']['other']
            }
            flattened_data.append(row)
        
        self.df = pd.DataFrame(flattened_data)
        return self.df
    
    def clean_data(self) -> pd.DataFrame:
        """Clean and validate the dataset."""
        if self.df is None:
            self.create_dataframe()
        
        # Remove any rows with missing critical data
        self.df = self.df.dropna(subset=['acceptance_rate', 'tuition', 'sat_average'])
        
        # Validate acceptance rates (should be 0-100)
        self.df = self.df[self.df['acceptance_rate'].between(0, 100)]
        
        # Validate SAT scores (should be 400-1600)
        self.df = self.df[self.df['sat_average'].between(400, 1600)]
        
        # Validate tuition (should be positive)
        self.df = self.df[self.df['tuition'] > 0]
        
        print(f"Data cleaned. {len(self.df)} colleges remain after validation.")
        return self.df
    
    def calculate_statistics(self) -> Dict[str, Any]:
        """Calculate comprehensive statistics for the dataset."""
        if self.df is None:
            self.clean_data()
        
        stats = {
            'acceptance_rate': {
                'mean': self.df['acceptance_rate'].mean(),
                'median': self.df['acceptance_rate'].median(),
                'std': self.df['acceptance_rate'].std(),
                'min': self.df['acceptance_rate'].min(),
                'max': self.df['acceptance_rate'].max()
            },
            'tuition': {
                'mean': self.df['tuition'].mean(),
                'median': self.df['tuition'].median(),
                'std': self.df['tuition'].std(),
                'min': self.df['tuition'].min(),
                'max': self.df['tuition'].max()
            },
            'sat_average': {
                'mean': self.df['sat_average'].mean(),
                'median': self.df['sat_average'].median(),
                'std': self.df['sat_average'].std(),
                'min': self.df['sat_average'].min(),
                'max': self.df['sat_average'].max()
            },
            'enrollment': {
                'mean': self.df['enrollment'].mean(),
                'median': self.df['enrollment'].median(),
                'std': self.df['enrollment'].std(),
                'min': self.df['enrollment'].min(),
                'max': self.df['enrollment'].max()
            }
        }
        
        return stats
    
    def analyze_by_region(self) -> Dict[str, Any]:
        """Analyze data grouped by geographic region."""
        if self.df is None:
            self.clean_data()
        
        regional_analysis = {}
        for region in self.df['region'].unique():
            region_data = self.df[self.df['region'] == region]
            regional_analysis[region] = {
                'count': len(region_data),
                'avg_acceptance_rate': region_data['acceptance_rate'].mean(),
                'avg_tuition': region_data['tuition'].mean(),
                'avg_sat': region_data['sat_average'].mean(),
                'total_enrollment': region_data['enrollment'].sum()
            }
        
        return regional_analysis
    
    def find_correlations(self) -> Dict[str, float]:
        """Find correlations between different metrics."""
        if self.df is None:
            self.clean_data()
        
        numeric_cols = ['acceptance_rate', 'tuition', 'sat_average', 'enrollment']
        correlation_matrix = self.df[numeric_cols].corr()
        
        correlations = {
            'tuition_vs_sat': correlation_matrix.loc['tuition', 'sat_average'],
            'acceptance_rate_vs_sat': correlation_matrix.loc['acceptance_rate', 'sat_average'],
            'tuition_vs_acceptance_rate': correlation_matrix.loc['tuition', 'acceptance_rate'],
            'enrollment_vs_acceptance_rate': correlation_matrix.loc['enrollment', 'acceptance_rate']
        }
        
        return correlations
    
    def export_processed_data(self, format_type: str = 'json') -> str:
        """Export processed data in specified format."""
        if self.df is None:
            self.clean_data()
        
        if format_type == 'json':
            output_file = 'processed_college_data.json'
            self.df.to_json(output_file, orient='records', indent=2)
        elif format_type == 'csv':
            output_file = 'processed_college_data.csv'
            self.df.to_csv(output_file, index=False)
        else:
            raise ValueError("Supported formats: 'json', 'csv'")
        
        print(f"Processed data exported to {output_file}")
        return output_file

# Main execution
if __name__ == "__main__":
    processor = CollegeDataProcessor()
    
    # Load and process data
    processor.load_data()
    processor.clean_data()
    
    # Calculate statistics
    stats = processor.calculate_statistics()
    print("\nDataset Statistics:")
    for metric, values in stats.items():
        print(f"\n{metric.replace('_', ' ').title()}:")
        for stat_name, value in values.items():
            if isinstance(value, float):
                print(f"  {stat_name}: {value:.2f}")
            else:
                print(f"  {stat_name}: {value}")
    
    # Regional analysis
    regional_data = processor.analyze_by_region()
    print("\nRegional Analysis:")
    for region, data in regional_data.items():
        print(f"\n{region}:")
        print(f"  Colleges: {data['count']}")
        print(f"  Avg Acceptance Rate: {data['avg_acceptance_rate']:.1f}%")
        print(f"  Avg Tuition: ${data['avg_tuition']:,.0f}")
        print(f"  Avg SAT: {data['avg_sat']:.0f}")
    
    # Correlations
    correlations = processor.find_correlations()
    print("\nKey Correlations:")
    for correlation, value in correlations.items():
        print(f"  {correlation.replace('_', ' ').title()}: {value:.3f}")
    
    # Export processed data
    processor.export_processed_data('json')
    processor.export_processed_data('csv')
