from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    description = models.CharField(max_length=200, default='');
    profile_pic = models.ImageField(default='https://cbwc.ca/wp-content/uploads/2019/03/blank-profile-picture-973460_640.png') # Change to local pic
    # restauarant user or regular user
    is_owner = models.BooleanField(default=False)
# Create your models here.
