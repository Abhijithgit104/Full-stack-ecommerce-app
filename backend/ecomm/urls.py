from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from orders.views import CartView, OrderList
from .views import health_check

from django.http import HttpResponse

def render_react(request):
    try:
        from django.shortcuts import render
        return render(request, 'index.html')
    except Exception:
        return HttpResponse("Building frontend... Please refresh in a moment.")

urlpatterns = [
    path('health/', health_check, name='health'),
    path('admin/', admin.site.urls),
    path('products/', include('products.urls')),
    path('auth/', include('accounts.urls')),
    path('cart/', CartView.as_view(), name='cart'),
    path('orders/', OrderList.as_view(), name='orders'),
    
    # Catch-all route for React (SPA)
    # This must be the last route in urlpatterns
    re_path(r'^.*$', render_react, name='home'),
]
