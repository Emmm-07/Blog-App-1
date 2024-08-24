from django.db import models


# Create your models here.
class Blog(models.Model):
    # id = models.CharField(max_length=200)
    title = models.CharField(max_length=500)
    body = models.TextField()
    author = models.CharField(max_length=200)

    def __str__(self):
        return self.title



    