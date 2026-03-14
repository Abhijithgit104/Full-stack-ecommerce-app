from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'product_type', 'created_at')
    list_filter = ('category', 'style', 'product_type')
    search_fields = ('name', 'description')
