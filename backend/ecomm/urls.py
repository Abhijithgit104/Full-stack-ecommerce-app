from django.contrib import admin
from django.urls import path, include
from orders.views import CartView, OrderList
from .views import health_check

urlpatterns = [
    path('health/', health_check, name='health'),
    path('admin/', admin.site.urls),
    path('products/', include('products.urls')),
    path('auth/', include('accounts.urls')),
    path('cart/', CartView.as_view(), name='cart'),
    path('orders/', OrderList.as_view(), name='orders'),
]
