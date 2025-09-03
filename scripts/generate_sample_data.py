import json
import random
from datetime import datetime

# Generate sample college admissions data
def generate_college_data():
    colleges = [
        "Harvard University", "Stanford University", "MIT", "Yale University",
        "Princeton University", "Columbia University", "University of Chicago",
        "University of Pennsylvania", "Northwestern University", "Duke University",
        "Johns Hopkins University", "Dartmouth College", "Brown University",
        "Vanderbilt University", "Rice University", "Washington University",
        "Cornell University", "University of Notre Dame", "UCLA", "UC Berkeley",
        "Georgetown University", "Carnegie Mellon", "University of Virginia",
        "University of Michigan", "Wake Forest University"
    ]
    
    data = []
    
    for college in colleges:
        # Generate realistic data ranges
        acceptance_rate = random.uniform(5, 85)  # 5% to 85%
        tuition = random.randint(25000, 60000)  # $25k to $60k
        sat_avg = random.randint(1200, 1580)    # SAT scores
        enrollment = random.randint(5000, 45000) # Student enrollment
        
        # Demographics (percentages that sum to 100)
        white = random.uniform(30, 70)
        asian = random.uniform(10, 40)
        hispanic = random.uniform(5, 25)
        black = random.uniform(3, 20)
        other = 100 - (white + asian + hispanic + black)
        
        college_data = {
            "name": college,
            "acceptance_rate": round(acceptance_rate, 1),
            "tuition": tuition,
            "sat_average": sat_avg,
            "enrollment": enrollment,
            "demographics": {
                "white": round(white, 1),
                "asian": round(asian, 1),
                "hispanic": round(hispanic, 1),
                "black": round(black, 1),
                "other": round(other, 1)
            },
            "location": {
                "state": random.choice(["CA", "MA", "NY", "CT", "PA", "IL", "NC", "TX", "VA", "MD"]),
                "region": random.choice(["Northeast", "Southeast", "Midwest", "West"])
            }
        }
        
        data.append(college_data)
    
    return data

# Generate the data
college_data = generate_college_data()

# Save to JSON file
with open('college_admissions_data.json', 'w') as f:
    json.dump(college_data, f, indent=2)

print(f"Generated data for {len(college_data)} colleges")
print("Sample data saved to college_admissions_data.json")

# Print first few entries as preview
print("\nSample entries:")
for i, college in enumerate(college_data[:3]):
    print(f"{i+1}. {college['name']}: {college['acceptance_rate']}% acceptance, ${college['tuition']:,} tuition")
