from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from . import views
from .views import BlogViewSet 


router = DefaultRouter()
router.register('api/blogs',BlogViewSet)

urlpatterns = [
    # path('',home,name='home'),
    path('',include(router.urls)),
    
    re_path('login',views.login),
    re_path('signup',views.signup),
    re_path('test_token',views.test_token),
]
