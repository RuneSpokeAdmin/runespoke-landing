#!/bin/bash

# Load environment variables from .env.local
export $(grep -v '^#' .env.local | xargs)

# Run the comprehensive test suite
echo "Running comprehensive API tests with proper environment..."
node test-api-complete.js