import json
import pandas as pd
from data_processor import CollegeDataProcessor

def prepare_dashboard_data():
    """
    Prepare and export data specifically formatted for the dashboard components.
    """
    processor = CollegeDataProcessor()
    processor.load_data()
    df = processor.clean_data()
    
    # Prepare data for different chart components
    dashboard_data = {}
    
    # 1. Acceptance Rate Chart Data
    acceptance_data = df.nlargest(15, 'acceptance_rate')[['name', 'acceptance_rate']].to_dict('records')
    dashboard_data['acceptance_rates'] = acceptance_data
    
    # 2. Tuition Analysis Data (scatter plot: tuition vs SAT)
    tuition_data = df[['name', 'tuition', 'sat_average', 'acceptance_rate']].to_dict('records')
    dashboard_data['tuition_analysis'] = tuition_data
    
    # 3. SAT Score Distribution (histogram data)
    sat_bins = pd.cut(df['sat_average'], bins=8, precision=0)
    sat_distribution = sat_bins.value_counts().sort_index()
    sat_data = []
    for interval, count in sat_distribution.items():
        sat_data.append({
            'range': f"{int(interval.left)}-{int(interval.right)}",
            'count': int(count),
            'midpoint': int((interval.left + interval.right) / 2)
        })
    dashboard_data['sat_distribution'] = sat_data
    
    # 4. Demographics Data (average by region)
    demographics_by_region = df.groupby('region')[['white_percent', 'asian_percent', 'hispanic_percent', 'black_percent', 'other_percent']].mean()
    demographics_data = []
    for region in demographics_by_region.index:
        demographics_data.append({
            'region': region,
            'white': round(demographics_by_region.loc[region, 'white_percent'], 1),
            'asian': round(demographics_by_region.loc[region, 'asian_percent'], 1),
            'hispanic': round(demographics_by_region.loc[region, 'hispanic_percent'], 1),
            'black': round(demographics_by_region.loc[region, 'black_percent'], 1),
            'other': round(demographics_by_region.loc[region, 'other_percent'], 1)
        })
    dashboard_data['demographics'] = demographics_data
    
    # 5. Summary Statistics for Metrics Overview
    stats = processor.calculate_statistics()
    dashboard_data['summary_stats'] = {
        'avg_acceptance_rate': round(stats['acceptance_rate']['mean'], 1),
        'total_applications': "2.1M",  # Simulated total
        'avg_tuition': int(stats['tuition']['mean']),
        'avg_sat': int(stats['sat_average']['mean'])
    }
    
    # 6. Regional Analysis
    regional_analysis = processor.analyze_by_region()
    dashboard_data['regional_analysis'] = regional_analysis
    
    # Export to JSON file for dashboard consumption
    with open('dashboard_data.json', 'w') as f:
        json.dump(dashboard_data, f, indent=2)
    
    print("Dashboard data exported to dashboard_data.json")
    print(f"Data includes:")
    print(f"  - {len(dashboard_data['acceptance_rates'])} colleges for acceptance rate chart")
    print(f"  - {len(dashboard_data['tuition_analysis'])} colleges for tuition analysis")
    print(f"  - {len(dashboard_data['sat_distribution'])} SAT score ranges")
    print(f"  - {len(dashboard_data['demographics'])} regions for demographics")
    
    return dashboard_data

if __name__ == "__main__":
    prepare_dashboard_data()
