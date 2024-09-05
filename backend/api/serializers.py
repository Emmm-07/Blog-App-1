from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User



class BlogSerializer(serializers.ModelSerializer):
    author_first_name = serializers.CharField(source='author.first_name', read_only=True)
    author_last_name = serializers.CharField(source='author.last_name', read_only=True)
    created_at = serializers.DateTimeField(format='%b %d, %Y')
    class Meta:
        model = Blog
        fields = ['id', 'title', 'body', 'author_first_name', 'author_last_name', 'created_at']
        read_only_fields = ['author', 'created_at']
    def create(self, validated_data):               #This method is overridden to customize the creation of a Blog instance.
        request = self.context.get('request',None)
        
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username','password','email','first_name','last_name']