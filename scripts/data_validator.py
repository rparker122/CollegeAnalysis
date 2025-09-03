import json
import sys
from typing import Dict, List, Any, Tuple

class DataValidator:
    """
    Validates college admissions data for consistency and accuracy.
    """
    
    def __init__(self, data_file: str = 'college_admissions_data.json'):
        self.data_file = data_file
        self.errors = []
        self.warnings = []
    
    def validate_college_entry(self, college: Dict[str, Any], index: int) -> Tuple[List[str], List[str]]:
        """Validate a single college entry."""
        errors = []
        warnings = []
        
        # Required fields
        required_fields = ['name', 'acceptance_rate', 'tuition', 'sat_average', 'enrollment', 'demographics', 'location']
        for field in required_fields:
            if field not in college:
                errors.append(f"College {index}: Missing required field '{field}'")
        
        # Validate acceptance rate
        if 'acceptance_rate' in college:
            rate = college['acceptance_rate']
            if not isinstance(rate, (int, float)) or rate < 0 or rate > 100:
                errors.append(f"College {index} ({college.get('name', 'Unknown')}): Invalid acceptance rate {rate}")
        
        # Validate tuition
        if 'tuition' in college:
            tuition = college['tuition']
            if not isinstance(tuition, (int, float)) or tuition < 0:
                errors.append(f"College {index} ({college.get('name', 'Unknown')}): Invalid tuition {tuition}")
            elif tuition > 80000:
                warnings.append(f"College {index} ({college.get('name', 'Unknown')}): Very high tuition ${tuition:,}")
        
        # Validate SAT scores
        if 'sat_average' in college:
            sat = college['sat_average']
            if not isinstance(sat, (int, float)) or sat < 400 or sat > 1600:
                errors.append(f"College {index} ({college.get('name', 'Unknown')}): Invalid SAT score {sat}")
        
        # Validate enrollment
        if 'enrollment' in college:
            enrollment = college['enrollment']
            if not isinstance(enrollment, (int, float)) or enrollment < 0:
                errors.append(f"College {index} ({college.get('name', 'Unknown')}): Invalid enrollment {enrollment}")
        
        # Validate demographics
        if 'demographics' in college:
            demographics = college['demographics']
            if isinstance(demographics, dict):
                total_percent = sum(demographics.values())
                if abs(total_percent - 100) > 1:  # Allow 1% tolerance for rounding
                    warnings.append(f"College {index} ({college.get('name', 'Unknown')}): Demographics don't sum to 100% (sum: {total_percent:.1f}%)")
                
                for demo_key, percent in demographics.items():
                    if not isinstance(percent, (int, float)) or percent < 0 or percent > 100:
                        errors.append(f"College {index} ({college.get('name', 'Unknown')}): Invalid demographic percentage for {demo_key}: {percent}")
        
        return errors, warnings
    
    def validate_dataset(self) -> Dict[str, Any]:
        """Validate the entire dataset."""
        try:
            with open(self.data_file, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            return {
                'valid': False,
                'errors': [f"Data file {self.data_file} not found"],
                'warnings': [],
                'summary': {}
            }
        except json.JSONDecodeError as e:
            return {
                'valid': False,
                'errors': [f"Invalid JSON format: {str(e)}"],
                'warnings': [],
                'summary': {}
            }
        
        if not isinstance(data, list):
            return {
                'valid': False,
                'errors': ["Data should be a list of college entries"],
                'warnings': [],
                'summary': {}
            }
        
        all_errors = []
        all_warnings = []
        
        # Validate each college entry
        for i, college in enumerate(data):
            errors, warnings = self.validate_college_entry(college, i)
            all_errors.extend(errors)
            all_warnings.extend(warnings)
        
        # Check for duplicate college names
        names = [college.get('name', f'College_{i}') for i, college in enumerate(data)]
        duplicates = [name for name in set(names) if names.count(name) > 1]
        if duplicates:
            all_warnings.extend([f"Duplicate college name: {name}" for name in duplicates])
        
        # Generate summary statistics
        summary = {
            'total_colleges': len(data),
            'colleges_with_errors': len(set(error.split(':')[0] for error in all_errors if ':' in error)),
            'colleges_with_warnings': len(set(warning.split(':')[0] for warning in all_warnings if ':' in warning)),
            'total_errors': len(all_errors),
            'total_warnings': len(all_warnings)
        }
        
        return {
            'valid': len(all_errors) == 0,
            'errors': all_errors,
            'warnings': all_warnings,
            'summary': summary
        }
    
    def print_validation_report(self):
        """Print a formatted validation report."""
        result = self.validate_dataset()
        
        print("=" * 60)
        print("COLLEGE ADMISSIONS DATA VALIDATION REPORT")
        print("=" * 60)
        
        print(f"\nDataset Summary:")
        print(f"  Total Colleges: {result['summary'].get('total_colleges', 0)}")
        print(f"  Total Errors: {result['summary'].get('total_errors', 0)}")
        print(f"  Total Warnings: {result['summary'].get('total_warnings', 0)}")
        print(f"  Colleges with Errors: {result['summary'].get('colleges_with_errors', 0)}")
        print(f"  Colleges with Warnings: {result['summary'].get('colleges_with_warnings', 0)}")
        
        if result['valid']:
            print(f"\n✅ VALIDATION PASSED - Dataset is valid!")
        else:
            print(f"\n❌ VALIDATION FAILED - {len(result['errors'])} errors found")
        
        if result['errors']:
            print(f"\nERRORS:")
            for error in result['errors']:
                print(f"  ❌ {error}")
        
        if result['warnings']:
            print(f"\nWARNINGS:")
            for warning in result['warnings']:
                print(f"  ⚠️  {warning}")
        
        print("\n" + "=" * 60)
        
        return result

# Main execution
if __name__ == "__main__":
    validator = DataValidator()
    result = validator.print_validation_report()
    
    # Exit with error code if validation failed
    if not result['valid']:
        sys.exit(1)
