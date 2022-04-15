from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import SET_NULL

class MyUser(AbstractUser):
    description = models.CharField(max_length=200, default='')
    profile_pic = models.ImageField(default='https://cbwc.ca/wp-content/uploads/2019/03/blank-profile-picture-973460_640.png') # Change to local pic
    # restauarant user or regular user
    is_owner = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20) 




