from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet 

router = DefaultRouter()
router.register('api/blogs',BlogViewSet)

urlpatterns = [
    # path('',home,name='home'),
    path('',include(router.urls)),
    
]
