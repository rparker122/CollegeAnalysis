# Contributing to College Admissions Analysis Dashboard

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   \`\`\`bash
   git clone https://github.com/your-username/college-admissions-analysis.git
   cd college-admissions-analysis
   \`\`\`
3. **Install dependencies**:
   \`\`\`bash
   npm install
   pip install pandas numpy  # For Python scripts
   \`\`\`
4. **Create a branch** for your feature:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

## Development Workflow

### Frontend Development
- Use TypeScript for all new components
- Follow the existing component structure in `components/`
- Use shadcn/ui components when possible
- Implement proper loading states and error handling
- Test components with different data scenarios

### Data Processing
- Add comprehensive error handling to Python scripts
- Include data validation for new data sources
- Document any new data fields or transformations
- Test with various dataset sizes

### Styling Guidelines
- Use semantic design tokens from `globals.css`
- Follow the established color palette (red primary, amber secondary)
- Ensure responsive design (mobile-first approach)
- Use Tailwind CSS classes consistently
- Test in both light and dark modes

## Code Standards

### TypeScript/React
\`\`\`typescript
// Use proper TypeScript interfaces
interface CollegeData {
  name: string
  acceptance_rate: number
  tuition: number
}

// Use proper error handling
const { data, loading, error } = useDashboardData()
if (error) return <ErrorComponent message={error} />
\`\`\`

### Python
\`\`\`python
# Use type hints
def process_data(data: List[Dict[str, Any]]) -> pd.DataFrame:
    """Process college data with proper validation."""
    pass

# Include comprehensive error handling
try:
    result = process_data(data)
except ValidationError as e:
    logger.error(f"Data validation failed: {e}")
    raise
\`\`\`

## Testing

### Frontend Testing
- Test components with mock data
- Verify responsive behavior
- Check accessibility compliance
- Test loading and error states

### Data Processing Testing
- Validate with various dataset sizes
- Test edge cases (missing data, invalid values)
- Verify statistical calculations
- Test export functionality

## Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples in docstrings

### README Updates
- Update installation instructions if adding dependencies
- Document new features or configuration options
- Include screenshots for UI changes

## Submitting Changes

### Before Submitting
1. **Test your changes** thoroughly
2. **Run the linter**: `npm run lint`
3. **Build the project**: `npm run build`
4. **Validate data processing**: Run Python scripts with test data
5. **Update documentation** as needed

### Pull Request Process
1. **Create a descriptive title**: "Add SAT score trend analysis chart"
2. **Write a clear description**:
   - What changes were made
   - Why they were necessary
   - How to test the changes
3. **Include screenshots** for UI changes
4. **Reference related issues** if applicable

### Pull Request Template
\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Verified responsive design
- [ ] Checked accessibility

## Screenshots (if applicable)
[Include screenshots of UI changes]
\`\`\`

## Feature Requests

### Before Requesting
- Check existing issues for similar requests
- Consider if the feature fits the project scope
- Think about implementation complexity

### Creating Feature Requests
Use the feature request template:
\`\`\`markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Implementation
How should this feature work?

## Additional Context
Any other relevant information
\`\`\`

## Bug Reports

### Information to Include
- **Environment**: OS, browser, Node.js version
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

## Development Setup

### Environment Variables
Create a `.env.local` file for local development:
\`\`\`bash
# Add any required environment variables
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
\`\`\`

### Database Setup (if applicable)
\`\`\`bash
# If adding database functionality
npm install prisma
npx prisma init
npx prisma migrate dev
\`\`\`

## Release Process

### Version Numbering
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Test deployment
- [ ] Create GitHub release
- [ ] Update documentation

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the project goals

### Communication
- Use clear, descriptive commit messages
- Be responsive to feedback
- Ask questions if unclear about requirements
- Share knowledge and best practices

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [pandas Documentation](https://pandas.pydata.org/docs/)

Thank you for contributing to make this project better!
