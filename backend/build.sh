#!/usr/bin/env bash
# exit on error
set -o errexit

# Build frontend
echo "Building frontend..."
cd ../frontend
npm install
npm run build
cd ../backend

# Install backend dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
python seed_data.py
