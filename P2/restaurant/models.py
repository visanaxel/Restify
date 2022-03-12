from django.db import models
from django.db.models import SET_NULL
from users.models import MyUser

# Create your models here.

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    logo = models.ImageField()
    postal_code = models.CharField(max_length=7) 
    phone_number = models.CharField(max_length=20) 
    owner = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True, related_name='owner')

class ImageModel(models.Model):
    image = models.ImageField()
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True, related_name='restaurant')

class MenuItem(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField()
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True, related_name='restaurant')
