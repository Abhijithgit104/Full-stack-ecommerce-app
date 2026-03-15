import os
import django

import sys
from pathlib import Path

# Add the project root to sys.path to resolve imports
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecomm.settings')
django.setup()

from products.models import Product

if Product.objects.exists():
    print("Database already has products. Skipping seeding.")
    sys.exit(0)

print("Seeding database...")



products_data = [
    # New Arrivals
    {
        "name": "T-shirt with Tape Details",
        "price": 120,
        "old_price": None,
        "rating": 4.5,
        "num_reviews": 120,
        "image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=500",
        "category": "new_arrival",
        "style": "casual",
        "product_type": "T-shirts",
        "sizes": "Small,Medium,Large,X-Large",
        "colors": "#000000,#FFFFFF,#FF0000"
    },
    {
        "name": "Skinny Fit Jeans",
        "price": 240,
        "old_price": 260,
        "rating": 3.5,
        "num_reviews": 85,
        "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500",
        "category": "new_arrival",
        "style": "casual",
        "product_type": "Jeans",
        "sizes": "Small,Medium,Large",
        "colors": "#0000FF,#000000"
    },
    {
        "name": "Checkered Shirt",
        "price": 180,
        "old_price": None,
        "rating": 4.5,
        "num_reviews": 150,
        "image": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500",
        "category": "new_arrival",
        "style": "formal",
        "product_type": "Shirts",
        "sizes": "Medium,Large,X-Large",
        "colors": "#00FF00,#FFFFFF"
    },
    {
        "name": "Sleeve Striped T-shirt",
        "price": 130,
        "old_price": 160,
        "rating": 4.5,
        "num_reviews": 210,
        "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500",
        "category": "new_arrival",
        "style": "casual",
        "product_type": "T-shirts",
        "sizes": "Small,Medium,Large",
        "colors": "#000000,#0000FF"
    },
    {
        "name": "Graphic Print T-shirt",
        "price": 95,
        "old_price": None,
        "rating": 4.2,
        "num_reviews": 95,
        "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500",
        "category": "new_arrival",
        "style": "party",
        "product_type": "T-shirts",
        "sizes": "Small,Medium,Large",
        "colors": "#FFFFFF,#000000"
    },
    {
        "name": "Linen Cargo Pants",
        "price": 190,
        "old_price": 210,
        "rating": 4.0,
        "num_reviews": 65,
        "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500",
        "category": "new_arrival",
        "style": "casual",
        "product_type": "Shorts",
        "sizes": "Small,Medium,Large",
        "colors": "#8B4513,#F5F5DC"
    },
    # Top Selling
    {
        "name": "Vertical Striped Shirt",
        "price": 212,
        "old_price": 232,
        "rating": 5.0,
        "num_reviews": 250,
        "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
        "category": "top_selling",
        "style": "formal",
        "product_type": "Shirts",
        "sizes": "Medium,Large,X-Large",
        "colors": "#0000FF,#FFFFFF"
    },
    {
        "name": "Courage Graphic T-shirt",
        "price": 145,
        "old_price": None,
        "rating": 4.0,
        "num_reviews": 180,
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500",
        "category": "top_selling",
        "style": "party",
        "product_type": "T-shirts",
        "sizes": "Small,Medium,Large",
        "colors": "#FF0000,#000000"
    },
    {
        "name": "Loose Fit Bermuda Shorts",
        "price": 80,
        "old_price": None,
        "rating": 3.0,
        "num_reviews": 90,
        "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500",
        "category": "top_selling",
        "style": "gym",
        "product_type": "Shorts",
        "sizes": "Small,Medium,Large",
        "colors": "#000000,#808080"
    },
    {
        "name": "Faded Skinny Jeans",
        "price": 210,
        "old_price": None,
        "rating": 4.5,
        "num_reviews": 320,
        "image": "https://americantall.com/cdn/shop/products/American-Tall-Men-Travis-Skinny-Jeans-Washed-Faded-Black-back.jpg?v=1666810609&width=1500",
        "category": "top_selling",
        "style": "casual",
        "product_type": "Jeans",
        "sizes": "Medium,Large,X-Large",
        "colors": "#000000,#4F4F4F"
    },
    {
        "name": "Classic Polo Shirt",
        "price": 125,
        "old_price": 150,
        "rating": 4.8,
        "num_reviews": 210,
        "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500",
        "category": "top_selling",
        "style": "formal",
        "product_type": "Shirts",
        "sizes": "Small,Medium,Large",
        "colors": "#FFFFFF,#000000,#0000FF"
    },
    {
        "name": "Running Shorts",
        "price": 65,
        "old_price": None,
        "rating": 4.4,
        "num_reviews": 145,
        "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=500",
        "category": "top_selling",
        "style": "gym",
        "product_type": "Shorts",
        "sizes": "Small,Medium,Large",
        "colors": "#000000,#FFFF00"
    }
]

for item in products_data:
    Product.objects.create(**item)

print(f"Successfully seeded database with {len(products_data)} products including types/sizes/colors!")
