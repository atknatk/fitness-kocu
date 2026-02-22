#!/bin/bash
set -e

FUNCTION_NAME="fitness-telegram-bot"
REGION="${AWS_REGION:-eu-central-1}"

echo "Building TypeScript..."
npm run build

echo "Creating deployment package..."
rm -f function.zip
zip -r function.zip dist/ node_modules/ -x "node_modules/.cache/*" "node_modules/typescript/*" "node_modules/tsx/*"

echo "Deploying to Lambda ($FUNCTION_NAME in $REGION)..."
aws lambda update-function-code \
  --function-name "$FUNCTION_NAME" \
  --zip-file fileb://function.zip \
  --region "$REGION"

echo "Cleaning up..."
rm -f function.zip

echo "Deploy complete!"
