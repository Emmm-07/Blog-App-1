from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    # id = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name='blogs') #allows you to access the blogs of a user using  'user.blogs.all()'
    created_at =  models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title



    