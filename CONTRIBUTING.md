# Contributing to ONE Calendar

Thank you for your interest in contributing to ONE Calendar! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs or request features
- Include detailed information about your environment and steps to reproduce
- Check existing issues before creating new ones
- Use appropriate issue labels

### Suggesting Features
- Open a feature request issue
- Describe the feature and its benefits
- Consider if it aligns with the project's goals
- Be specific about implementation details

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- Git

### Local Development
1. **Clone and setup**
   ```bash
   git clone https://github.com/yourusername/ONE-Calendar.git
   cd ONE-Calendar
   npm run install-all
   ```

2. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   source backend-venv/bin/activate
   python app.py
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 Code Style Guidelines

### Frontend (React/TypeScript)
- Use TypeScript for all new code
- Follow React functional component patterns
- Use hooks for state management
- Follow ESLint rules
- Use Tailwind CSS for styling
- Write meaningful component and function names

### Backend (Python/Flask)
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Write docstrings for functions
- Handle exceptions properly
- Use meaningful variable names

### General
- Write clear, descriptive commit messages
- Keep functions small and focused
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation when needed

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
python -m pytest
```

### Manual Testing
- Test all calendar integration features
- Verify touch interactions work correctly
- Test on different screen sizes
- Verify error handling works properly

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for TypeScript functions
- Add docstrings for Python functions
- Update README.md for new features
- Update relevant guide files

### User Documentation
- Update setup guides for new features
- Add troubleshooting information
- Update screenshots if UI changes
- Keep documentation in sync with code

## 🔧 Common Development Tasks

### Adding a New Calendar Service
1. Update the CalDAV wizard in `frontend/src/App.tsx`
2. Add service configuration to the `services` array
3. Update backend validation in `backend/app.py`
4. Add connection testing logic
5. Update documentation

### Adding New API Endpoints
1. Add route in `backend/app.py`
2. Add proper error handling
3. Update frontend API calls
4. Add TypeScript interfaces
5. Update documentation

### UI Changes
1. Use Tailwind CSS classes
2. Test on mobile and desktop
3. Verify touch interactions
4. Check accessibility
5. Update screenshots in docs

## 🐛 Bug Fixes

### Before Fixing
1. Reproduce the bug consistently
2. Identify the root cause
3. Check if it's a known issue
4. Consider the impact of the fix

### During Fixing
1. Make minimal changes
2. Add tests if possible
3. Test the fix thoroughly
4. Consider edge cases

### After Fixing
1. Update documentation if needed
2. Add regression tests
3. Update changelog
4. Test on different environments

## 🚀 Release Process

### Version Bumping
- Follow semantic versioning
- Update version in `package.json`
- Update `CHANGELOG.md`
- Tag releases in Git

### Release Checklist
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is updated
- [ ] Version numbers are bumped
- [ ] Release notes are written
- [ ] Tag is created

## 📞 Getting Help

### Questions and Support
- Check existing documentation
- Search existing issues
- Ask in GitHub discussions
- Contact maintainers directly

### Development Questions
- Check the codebase for examples
- Review existing pull requests
- Ask in the development channel
- Schedule a call if needed

## 🎯 Project Goals

### Primary Goals
- Easy family calendar management
- Reliable calendar synchronization
- Touch-friendly interface
- Comprehensive documentation

### Technical Goals
- Clean, maintainable code
- Good test coverage
- Performance optimization
- Security best practices

## 📋 Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows style guidelines
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No console errors
- [ ] All features work as expected
- [ ] No breaking changes (or documented)
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame
- GitHub contributors page

Thank you for contributing to ONE Calendar! 🎉 