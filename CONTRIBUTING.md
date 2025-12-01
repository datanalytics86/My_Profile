# Contributing to QAQC Framework

First off, thank you for considering contributing to the QAQC Framework! It's people like you that make this framework better for everyone.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How Can I Contribute?](#how-can-i-contribute)
4. [Development Process](#development-process)
5. [Coding Standards](#coding-standards)
6. [Commit Messages](#commit-messages)
7. [Pull Request Process](#pull-request-process)
8. [Documentation Guidelines](#documentation-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Git installed on your machine
- Basic knowledge of Markdown
- Familiarity with the technology stack you're contributing to

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/My_Profile.git
   cd My_Profile
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/datanalytics86/My_Profile.git
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting a bug, include:**
- Clear, descriptive title
- Detailed steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, versions, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**When suggesting enhancements, include:**
- Clear, descriptive title
- Detailed description of the proposed functionality
- Why this enhancement would be useful
- Possible implementation approach

### Contributing Documentation

Documentation improvements are always welcome!

**Areas for documentation contributions:**
- Fixing typos or grammatical errors
- Improving clarity and readability
- Adding examples or use cases
- Translating documentation
- Adding diagrams or visual aids

### Contributing Code Examples

When adding code examples:
- Ensure they follow security best practices
- Include both vulnerable and secure versions when applicable
- Add comments explaining the code
- Test that examples actually work
- Include multiple languages when possible

## Development Process

### Branch Strategy

```
main              # Production-ready code
├── develop       # Integration branch
│   ├── feature/add-new-template
│   ├── feature/improve-security-guide
│   ├── bugfix/fix-workflow-error
│   └── docs/update-contributing-guide
```

### Workflow

1. **Create a branch** from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clear, concise code/documentation
   - Follow existing patterns and conventions
   - Test your changes thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new security template"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** against `develop`

## Coding Standards

### General Principles

- **DRY (Don't Repeat Yourself)**: Avoid duplication
- **KISS (Keep It Simple, Stupid)**: Prefer simple solutions
- **YAGNI (You Aren't Gonna Need It)**: Don't add unnecessary features
- **Separation of Concerns**: Keep code modular and focused

### Documentation Standards

#### Markdown

- Use consistent heading hierarchy
- Include table of contents for long documents
- Use code blocks with language specification
- Keep lines under 100 characters when possible
- Use relative links for internal references

**Example:**
```markdown
## Main Section

### Subsection

Content here with [internal link](./OTHER_FILE.md).

\`\`\`python
# Code example
def example():
    pass
\`\`\`
```

#### Code Examples

All code examples must:
- Be syntactically correct
- Include comments explaining the concept
- Follow language-specific conventions
- Show best practices
- Include error handling where appropriate

**Good Example:**
```python
# ✅ SECURE - Using parameterized queries
def get_user(username: str) -> User:
    """
    Retrieve user by username using parameterized query.

    Args:
        username: The username to search for

    Returns:
        User object if found

    Raises:
        ValueError: If username is invalid
    """
    if not username or len(username) < 3:
        raise ValueError("Invalid username")

    query = "SELECT * FROM users WHERE username = ?"
    return db.execute(query, (username,)).fetchone()
```

**Bad Example:**
```python
# ❌ VULNERABLE - SQL injection risk
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query).fetchone()
```

### Configuration Files

- Use consistent indentation (2 spaces for YAML/JSON, 4 for Python)
- Include comments explaining configuration options
- Provide sensible defaults
- Document required vs optional settings

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```
feat(security): add CSRF protection examples

Add comprehensive examples showing CSRF vulnerabilities and
protection mechanisms for both frontend and backend.

Closes #123
```

```
fix(workflow): correct Python version in CI

The CI workflow was using Python 3.9 instead of 3.11
as specified in the documentation.
```

```
docs(readme): improve quick start section

- Add prerequisites section
- Clarify installation steps
- Include troubleshooting tips
```

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Documentation is updated
- [ ] All tests pass (if applicable)
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with `develop`
- [ ] No merge conflicts

### PR Template

Use this template when creating a PR:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Breaking change

## Changes Made
- Change 1
- Change 2

## Testing
How were these changes tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
```

### Review Process

1. **Automated checks** must pass:
   - Markdown linting
   - YAML validation
   - Security scans

2. **Manual review** by maintainers:
   - Code quality
   - Documentation accuracy
   - Adherence to standards

3. **Approval and merge**:
   - At least one approving review required
   - All comments addressed
   - CI/CD passing

### After Your PR is Merged

1. Delete your feature branch:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. Update your local repository:
   ```bash
   git checkout develop
   git pull upstream develop
   ```

## Documentation Guidelines

### Structure

- Start with a clear introduction
- Use hierarchical headings (H1 → H2 → H3)
- Include a table of contents for long documents
- Provide examples for complex concepts
- End with references/resources

### Writing Style

- **Be clear and concise**: Avoid jargon when possible
- **Use active voice**: "Configure the settings" vs "Settings should be configured"
- **Be specific**: Provide exact commands, file paths, etc.
- **Include context**: Explain the "why" not just the "how"
- **Use consistent terminology**: Don't switch between synonyms

### Code in Documentation

- Always specify the language in code blocks
- Include comments in code examples
- Show both good and bad examples
- Explain what makes it good or bad
- Provide complete, working examples when possible

### Links

- Use relative links for internal documents
- Check that all links work
- Provide context for external links
- Keep link text descriptive

**Good:**
```markdown
See the [Security Guide](./SECURITY_GUIDE.md) for details on OWASP Top 10.
```

**Bad:**
```markdown
Click [here](./SECURITY_GUIDE.md) for more info.
```

## Questions?

If you have questions:
- Check existing [documentation](./README.md)
- Search [existing issues](https://github.com/datanalytics86/My_Profile/issues)
- Open a [new issue](https://github.com/datanalytics86/My_Profile/issues/new) with the question label

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

Thank you for contributing! 🎉

---

**Last updated:** 2025-11-25
