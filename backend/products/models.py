from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('new_arrival', 'New Arrival'),
        ('top_selling', 'Top Selling'),
    ]
    
    STYLE_CHOICES = [
        ('casual', 'Casual'),
        ('formal', 'Formal'),
        ('party', 'Party'),
        ('gym', 'Gym'),
    ]
    
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    num_reviews = models.IntegerField(default=0)
    image = models.URLField(max_length=500)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='new_arrival')
    style = models.CharField(max_length=20, choices=STYLE_CHOICES, default='casual')
    product_type = models.CharField(max_length=50, default='T-shirts')
    sizes = models.CharField(max_length=255, default='Small,Medium,Large,X-Large')
    colors = models.CharField(max_length=255, default='Black,White,Blue')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
