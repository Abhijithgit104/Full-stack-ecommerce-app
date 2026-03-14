from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity', 'product_details')

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'price', 'product_details')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'total_price', 'status', 'created_at', 'items')
