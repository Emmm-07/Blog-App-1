from django.shortcuts import render
from rest_framework import viewsets
from .models import Blog
from .serializers import BlogSerializer, UserSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404



# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):
    queryset =  Blog.objects.all()
    serializer_class = BlogSerializer




@api_view(['POST'])
def signup (request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user  = User.objects.get(username   =request.data['username'])
        user.set_password(request.data['password'])                         #Set a hashed password
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token":token.key, "user":serializer.data})
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login (request):
    user = get_object_or_404(User, username=request.data['username'])
    # print(User)
    if not user.check_password(request.data['password']):                               #check if password is correct
         return Response({"detail":"Not Found"},status=status.HTTP_404_NOT_FOUND)
    token,created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response({"token":token.key , "user":serializer.data})



@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token (request):
    return Response(f"Passed for {request.user.email}")