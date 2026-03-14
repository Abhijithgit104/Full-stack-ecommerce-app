from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        style = self.request.query_params.get('style')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        limit = self.request.query_params.get('limit')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        product_type = self.request.query_params.get('product_type')
        size = self.request.query_params.get('size')
        color = self.request.query_params.get('color')
        
        if search:
            queryset = queryset.filter(name__icontains=search)
            
        if style:
            queryset = queryset.filter(style=style.lower())
        
        if category:
            cat_search = category.lower().replace('-', '_')
            if cat_search.endswith('s'):
                cat_search = cat_search[:-1]
            queryset = queryset.filter(category=cat_search)
            
        if product_type:
            queryset = queryset.filter(product_type__iexact=product_type)
            
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        if size:
            queryset = queryset.filter(sizes__icontains=size)
            
        if color:
            queryset = queryset.filter(colors__icontains=color)
            
        if limit:
            try:
                queryset = queryset[:int(limit)]
            except ValueError:
                pass
        
        # Log counts for debugging
        count = queryset.count()
        print(f"DEBUG: ProductList request - filters active, results={count}")
        return queryset

class NewArrivalsList(generics.ListAPIView):
    queryset = Product.objects.filter(category='new_arrival')
    serializer_class = ProductSerializer

class TopSellingList(generics.ListAPIView):
    queryset = Product.objects.filter(category='top_selling')
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
