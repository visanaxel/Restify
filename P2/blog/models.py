from turtle import mode
from django.db import models
from django.db.models import SET_NULL
from users.models import MyUser
from restaurant.models import Restaurant

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    likes = models.IntegerField(default=0)
    image = models.ImageField()
    date = models.DateTimeField(auto_now_add=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True, related_name='restaurant')
    author = models.ForeignKey(to=MyUser, on_delete=SET_NULL,  null=True, related_name='author')

