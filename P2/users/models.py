from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    description = models.CharField(max_length=200, default='');
    profile_pic = models.ImageField(default='https://cbwc.ca/wp-content/uploads/2019/03/blank-profile-picture-973460_640.png');
# Create your models here.
