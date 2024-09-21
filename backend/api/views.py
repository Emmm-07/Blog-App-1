from django.shortcuts import render
from rest_framework import viewsets
from .models import Blog
from .models import Heart
from .models import Comment
from .serializers import BlogSerializer, UserSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.authtoken.models import Token
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404



# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):
    queryset =  Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        return {'request':self.request}
    
    # Custom action to get blogs by the current user
    @action(detail=False, methods=['GET'], url_path='my_blogs')
    def my_blogs(self,request):
        user = request.user
        blogs = Blog.objects.filter(author=user)
        blogs = blogs.order_by('-created_at')
        serializer = self.get_serializer(blogs, many=True)
        return  Response(serializer.data)
    
    @action(detail=False, methods=['GET'], url_path='other_blogs')
    def other_blogs(self,request):
        user = request.user
        blogs = Blog.objects.exclude(author=user)
        blogs = blogs.order_by('-created_at')
        serializer = self.get_serializer(blogs, many=True)
        return  Response(serializer.data)
    
    def get_queryset(self):
        blogs = Blog.objects.all()
        blogs = blogs.order_by('-created_at')
        return blogs


@api_view(['POST'])
def signup (request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # user  = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])                         #Set a hashed password
        user.save()
        # token = Token.objects.create(user=user)

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    
    return Response({'detail':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login (request):
    user = get_object_or_404(User, username=request.data['username'])

    if not user.check_password(request.data['password']):                               #check if password is correct
         return Response({"detail":"Not Found"},status=status.HTTP_404_NOT_FOUND)
    
    # token,created = Token.objects.get_or_create(user=user)
    # serializer = UserSerializer(instance=user)

    refresh = RefreshToken.for_user(user)

    return Response({
        'refresh':str(refresh),
        'access': str(refresh.access_token),
    })


@api_view(['POST'])
def check_email(request):
    user = get_object_or_404(User,email=request.data['email'])
    
    refresh = RefreshToken.for_user(user)

    return Response({
        # 'refresh':str(refresh),
        'account': str(refresh.access_token),
    })

@api_view(['POST'])
# @authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    user.set_password(request.data['newPassword'])    
    user.save()  
    return Response(f"Successfully Changed password")



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_heart(request):
    user = request.user
    blog = get_object_or_404(Blog,id = request.data['blogId'])

    # Check if the user already hearted this blog
    heart = Heart.objects.filter(user=user, blog=blog).first()

    if heart:
         # If the heart exists, remove it (unheart)
        heart.delete()
        hearted = False
    else:
        # Otherwise, create a new heart reaction
        Heart.objects.create(user=user, blog=blog)
        hearted = True

    return Response({'total_hearts':blog.total_hearts(), 'hearted':hearted})



# @api_view(['GET'])
# @authentication_classes([SessionAuthentication,TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def test_token (request):
#     return Response(f"Passed for ")