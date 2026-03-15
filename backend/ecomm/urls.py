from django.contrib import admin
from django.urls import path, include, re_path
from orders.views import CartView, OrderList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', include('products.urls')),
    path('auth/', include('accounts.urls')),
    path('cart/', CartView.as_view(), name='cart'),
    path('orders/', OrderList.as_view(), name='orders'),
]
