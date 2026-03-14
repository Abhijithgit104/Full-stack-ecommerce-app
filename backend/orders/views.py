from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import CartItem, Order, OrderItem
from .serializers import CartItemSerializer, OrderSerializer
from products.models import Product



class CartView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartItemSerializer

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
            
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        return Response(CartItemSerializer(cart_items, many=True).data)

class CartItemDetail(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

class OrderList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    # Adding a checkout method for completeness
    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        if not cart_items:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        total_price = sum(item.product.price * item.quantity for item in cart_items)
        order = Order.objects.create(user=request.user, total_price=total_price)
        
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        
        cart_items.delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
