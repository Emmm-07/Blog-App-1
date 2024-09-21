from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    # id = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name='blogs') #allows you to access the blogs of a user using  'user.blogs.all()'
    created_at =  models.DateTimeField(auto_now_add=True)

    def total_hearts(self):
        return self.hearts.count()                  # method to get the total number of hearts of a blog

    def __str__(self):
        return self.title


class Heart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='hearts' )
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='hearts')
    created_at =  models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'blog')     # Prevents the same user from hearting the same blog multiple times

    def __str__(self):
        return f'{self.user.username} hearted {self.blog.title}'
    

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='comments' )
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} commented on {self.blog.title}'
    


