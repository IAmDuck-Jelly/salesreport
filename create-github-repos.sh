#!/bin/bash

echo "🚀 Creating GitHub repositories for Sales Report App..."
echo "=================================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it first: https://cli.github.com/"
    echo "Or create the repositories manually on GitHub.com"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is available and authenticated."

# Create client repository
echo ""
echo "📱 Creating client repository..."
cd client
gh repo create sales-report-client --public --description "Frontend for Sales Report App - React/TypeScript application for sales agents" --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo "✅ Client repository created successfully!"
    echo "🔗 Repository URL: https://github.com/$(gh api user --jq .login)/sales-report-client"
else
    echo "❌ Failed to create client repository"
fi

# Create server repository
echo ""
echo "🖥️  Creating server repository..."
cd ../server
gh repo create sales-report-server --public --description "Backend for Sales Report App - Node.js/Express API server" --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo "✅ Server repository created successfully!"
    echo "🔗 Repository URL: https://github.com/$(gh api user --jq .login)/sales-report-server"
else
    echo "❌ Failed to create server repository"
fi

echo ""
echo "🎉 Repository creation complete!"
echo "=================================================="
echo "📱 Client: https://github.com/$(gh api user --jq .login)/sales-report-client"
echo "🖥️  Server: https://github.com/$(gh api user --jq .login)/sales-report-server"
echo ""
echo "📋 Next steps:"
echo "1. Clone each repository to separate directories"
echo "2. Set up environment variables in each project"
echo "3. Install dependencies and run the applications" 