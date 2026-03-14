from django.urls import path
from .views import ProductList, NewArrivalsList, TopSellingList, ProductDetail

urlpatterns = [
    path('', ProductList.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('new-arrivals/', NewArrivalsList.as_view(), name='new-arrivals'),
    path('top-selling/', TopSellingList.as_view(), name='top-selling'),
]
