from django.urls import path
from .views import CartView, OrderList

app_name = 'orders' # To match the namespace in main urls.py if needed

urlpatterns = [
    # Both cart and orders can share this file or depend on the path prefix
    path('', CartView.as_view(), name='cart_list'), # Matches /cart/ if called from /cart/
    path('history/', OrderList.as_view(), name='order_list'), # Matches /orders/history/ or similar
]
