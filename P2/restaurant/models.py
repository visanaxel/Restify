from users.models import MyUser
from django.db import models
from django.db.models import SET_NULL

# Create your models here.

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    logo = models.ImageField()
    postal_code = models.CharField(max_length=7) 
    phone_number = models.CharField(max_length=20) 
    owner = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    likes = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)

class ImageModel(models.Model):
    image = models.ImageField()
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True)


class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(default='../media/koala.jpg', blank=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True)

class Comment(models.Model):
    comment = models.CharField(max_length=400) # or maybe change to textfield
    date = models.DateTimeField(auto_now_add=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True)
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL,  null=True)

