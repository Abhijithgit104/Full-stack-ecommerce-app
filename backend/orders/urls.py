from django.urls import path
from .views import CartView, OrderList, CartItemDetail

app_name = 'orders' # To match the namespace in main urls.py if needed

urlpatterns = [
    path('', CartView.as_view(), name='cart_list'),
    path('history/', OrderList.as_view(), name='order_list'),
    path('item/<int:pk>/', CartItemDetail.as_view(), name='cart_item_detail'),
]
