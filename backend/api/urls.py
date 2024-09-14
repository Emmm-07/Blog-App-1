from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from . import views
from .views import BlogViewSet 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register('api/blogs',BlogViewSet)

urlpatterns = [
    # path('',home,name='home'),
    path('',include(router.urls)),
    
    re_path('login',views.login),
    re_path('signup',views.signup),
    re_path('check_email',views.check_email),
    # re_path('test_token',views.test_token),

    path('api/token', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh')
    
]
