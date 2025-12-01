#!/bin/bash

# QAQC Framework Setup Script
# Helps set up QAQC framework in a new project

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 QAQC Framework Setup${NC}"
echo "=============================="
echo ""

# Check if target directory is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-project.sh <target-project-directory> [type]"
    echo ""
    echo "Types:"
    echo "  nodejs    - Node.js/TypeScript project"
    echo "  python    - Python project"
    echo "  react     - React/Next.js project"
    echo "  minimal   - Minimal setup (just CI/CD and docs)"
    echo ""
    exit 1
fi

TARGET_DIR="$1"
PROJECT_TYPE="${2:-minimal}"

if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${YELLOW}Target directory does not exist. Create it? (y/n)${NC}"
    read -r response
    if [[ "$response" == "y" ]]; then
        mkdir -p "$TARGET_DIR"
    else
        exit 1
    fi
fi

echo "📦 Setting up QAQC framework in: $TARGET_DIR"
echo "📝 Project type: $PROJECT_TYPE"
echo ""

# Copy GitHub workflows
echo "Copying CI/CD workflows..."
mkdir -p "$TARGET_DIR/.github/workflows"
cp .github/workflows/ci.yml "$TARGET_DIR/.github/workflows/"
cp .github/workflows/cd.yml "$TARGET_DIR/.github/workflows/"
echo -e "${GREEN}✅ Workflows copied${NC}"
echo ""

# Copy issue templates
echo "Copying issue templates..."
mkdir -p "$TARGET_DIR/.github/ISSUE_TEMPLATE"
cp .github/ISSUE_TEMPLATE/*.md "$TARGET_DIR/.github/ISSUE_TEMPLATE/"
cp .github/ISSUE_TEMPLATE/config.yml "$TARGET_DIR/.github/ISSUE_TEMPLATE/"
cp .github/PULL_REQUEST_TEMPLATE.md "$TARGET_DIR/.github/"
echo -e "${GREEN}✅ Templates copied${NC}"
echo ""

# Copy configuration files
echo "Copying configuration files..."
cp .gitignore "$TARGET_DIR/" 2>/dev/null || true
cp .editorconfig "$TARGET_DIR/"
cp .markdownlint.json "$TARGET_DIR/"
echo -e "${GREEN}✅ Config files copied${NC}"
echo ""

# Copy documentation
echo "Copying documentation..."
cp CONTRIBUTING.md "$TARGET_DIR/"
cp LICENSE "$TARGET_DIR/" 2>/dev/null || true

# Create basic README if it doesn't exist
if [ ! -f "$TARGET_DIR/README.md" ]; then
    cat > "$TARGET_DIR/README.md" << 'EOF'
# Project Name

## Description

Brief description of your project.

## Setup

\`\`\`bash
# Installation steps
\`\`\`

## Development

\`\`\`bash
# Development commands
\`\`\`

## Testing

\`\`\`bash
# Testing commands
\`\`\`

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

See [LICENSE](./LICENSE)
EOF
    echo -e "${GREEN}✅ Created basic README${NC}"
else
    echo -e "${YELLOW}⚠️  README.md already exists, skipping${NC}"
fi
echo ""

# Project type specific setup
case $PROJECT_TYPE in
    nodejs)
        echo "Setting up Node.js configuration..."
        cp templates/.eslintrc.js "$TARGET_DIR/"
        cp templates/.prettierrc.js "$TARGET_DIR/"
        cp templates/jest.config.js "$TARGET_DIR/"
        cp templates/.pre-commit-config.yaml "$TARGET_DIR/"
        echo -e "${GREEN}✅ Node.js configs copied${NC}"
        ;;

    python)
        echo "Setting up Python configuration..."
        cp templates/.flake8 "$TARGET_DIR/"
        cp templates/pytest.ini "$TARGET_DIR/"
        cp templates/pyproject.toml "$TARGET_DIR/"
        cp templates/.pre-commit-config.yaml "$TARGET_DIR/"
        echo -e "${GREEN}✅ Python configs copied${NC}"
        ;;

    react)
        echo "Setting up React configuration..."
        cp templates/.eslintrc.js "$TARGET_DIR/"
        cp templates/.prettierrc.js "$TARGET_DIR/"
        cp templates/jest.config.js "$TARGET_DIR/"
        cp templates/.pre-commit-config.yaml "$TARGET_DIR/"
        echo -e "${GREEN}✅ React configs copied${NC}"
        ;;

    minimal)
        echo "Minimal setup - CI/CD and docs only"
        ;;

    *)
        echo -e "${YELLOW}⚠️  Unknown project type: $PROJECT_TYPE${NC}"
        echo "Continuing with minimal setup..."
        ;;
esac

echo ""

# Create basic directory structure
echo "Creating directory structure..."
mkdir -p "$TARGET_DIR/docs"
mkdir -p "$TARGET_DIR/tests"

echo -e "${GREEN}✅ Directory structure created${NC}"
echo ""

echo "=============================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=============================="
echo ""
echo "Next steps:"
echo "1. Review and customize the copied files"
echo "2. Update README.md with your project details"
echo "3. Configure GitHub secrets for CI/CD:"
echo "   - SNYK_TOKEN (for security scanning)"
echo "   - SONAR_TOKEN (for code quality)"
echo "   - SLACK_WEBHOOK_URL (for notifications)"
echo "4. Set up branch protection rules"
echo "5. Install pre-commit hooks: cd $TARGET_DIR && pre-commit install"
echo ""
echo "For more information, see the QAQC Framework documentation."
