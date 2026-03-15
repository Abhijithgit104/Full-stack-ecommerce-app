from django.http import JsonResponse
from django.db import connection

def home(request):
    return JsonResponse({
        "message": "Welcome to the E-commerce API",
        "docs": "Access /products/, /auth/, /cart/, or /orders/"
    })

def health_check(request):
    try:
        # Perform a simple DB query to ensure connection is live
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return JsonResponse({"status": "ready", "database": "connected"})
    except Exception as e:
        return JsonResponse({"status": "starting", "error": str(e)}, status=503)
