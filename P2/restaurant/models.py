from django.db import models

# Create your models here.

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    logo = models.ImageField()
    postal_code = models.CharField(max_length=7) 
    phone_number = models.CharField(max_length=20) 


class ImageModel(models.Model):
    main_image = models.ImageField()
    image = models.ForeignKey(Restaurant)