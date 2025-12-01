#!/bin/bash

# QAQC Framework Validation Script
# This script validates all components of the QAQC framework

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 QAQC Framework Validation"
echo "=============================="
echo ""

# Track failures
FAILURES=0

# Function to print success
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}❌ $1${NC}"
    FAILURES=$((FAILURES + 1))
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        success "Found: $1"
    else
        error "Missing: $1"
    fi
}

# Check documentation files
echo "📚 Checking Documentation..."
echo ""

check_file "README.md"
check_file "QAQC_STANDARDS.md"
check_file "CODE_REVIEW_CHECKLIST.md"
check_file "SECURITY_GUIDE.md"
check_file "PROJECT_STRUCTURE.md"
check_file "CONTRIBUTING.md"
check_file "LICENSE"
check_file "CHANGELOG.md"

echo ""

# Check GitHub configuration
echo "⚙️  Checking GitHub Configuration..."
echo ""

check_file ".github/workflows/ci.yml"
check_file ".github/workflows/cd.yml"
check_file ".github/workflows/validate-framework.yml"
check_file ".github/PULL_REQUEST_TEMPLATE.md"
check_file ".github/ISSUE_TEMPLATE/bug_report.md"
check_file ".github/ISSUE_TEMPLATE/feature_request.md"
check_file ".github/ISSUE_TEMPLATE/documentation.md"
check_file ".github/ISSUE_TEMPLATE/security.md"
check_file ".github/CODEOWNERS"

echo ""

# Check templates
echo "📋 Checking Templates..."
echo ""

check_file "templates/jest.config.js"
check_file "templates/pytest.ini"
check_file "templates/.eslintrc.js"
check_file "templates/.prettierrc.js"
check_file "templates/.flake8"
check_file "templates/pyproject.toml"
check_file "templates/Dockerfile"
check_file "templates/docker-compose.yml"
check_file "templates/.pre-commit-config.yaml"

echo ""

# Check configuration files
echo "🔧 Checking Configuration Files..."
echo ""

check_file ".gitignore"
check_file ".editorconfig"
check_file ".markdownlint.json"

echo ""

# Validate YAML syntax
echo "📝 Validating YAML Files..."
echo ""

if command -v yamllint &> /dev/null; then
    if yamllint .github/workflows/*.yml 2>&1 | grep -q "error"; then
        error "YAML validation failed"
    else
        success "All YAML files are valid"
    fi
else
    warning "yamllint not installed, skipping YAML validation"
fi

echo ""

# Validate JSON syntax
echo "📄 Validating JSON Files..."
echo ""

for json_file in $(find . -name "*.json" -not -path "./node_modules/*" 2>/dev/null); do
    if python3 -m json.tool "$json_file" > /dev/null 2>&1; then
        success "Valid JSON: $json_file"
    else
        error "Invalid JSON: $json_file"
    fi
done

echo ""

# Validate JavaScript syntax
echo "🔍 Validating JavaScript Files..."
echo ""

if command -v node &> /dev/null; then
    for js_file in templates/*.js; do
        if [ -f "$js_file" ]; then
            if node --check "$js_file" 2>/dev/null; then
                success "Valid JavaScript: $js_file"
            else
                error "Invalid JavaScript: $js_file"
            fi
        fi
    done
else
    warning "Node.js not installed, skipping JavaScript validation"
fi

echo ""

# Check for broken links
echo "🔗 Checking for Broken Links..."
echo ""

if command -v markdown-link-check &> /dev/null; then
    for md_file in *.md; do
        if [ -f "$md_file" ]; then
            if markdown-link-check "$md_file" --config .github/markdown-link-check-config.json --quiet; then
                success "No broken links in: $md_file"
            else
                warning "Potential broken links in: $md_file"
            fi
        fi
    done
else
    warning "markdown-link-check not installed, skipping link validation"
fi

echo ""

# Summary
echo "=============================="
echo "📊 Validation Summary"
echo "=============================="
echo ""

if [ $FAILURES -eq 0 ]; then
    success "All validations passed! ✨"
    echo ""
    echo "The QAQC Framework is ready to use!"
    exit 0
else
    error "Found $FAILURES issue(s) ❗"
    echo ""
    echo "Please fix the issues above before using the framework."
    exit 1
fi
