from email.policy import default
from django.db import models
from django.db.models import SET_NULL

from users.models import MyUser
from blog.models import Blog
from restaurant.models import Restaurant

user_notification_choices = (('l', 'like'), ('f', 'follow'), ('c', 'comment'))
rest_notification_choices = (('m', 'menu change'), ('n', 'new item'), ('b', 'blog added'))

# Create your models here.
# THIS IS BEING SENT TO THE RESTAURANT!!!!!
class UserNotifications(models.Model):
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True)
    # m(('l', 'like'), ('f', 'follow'), ('c', 'comment'))
    notif_type = models.CharField(max_length=1, choices=user_notification_choices)
    description = models.CharField(max_length=400)

# THIS IS BEING SENT TO THE USER!!!!!!
class RestNotifications(models.Model):
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True)
    # (('m', 'menu change'), ('n', 'new item'), ('b', 'blog added'))
    notif_type = models.CharField(max_length=1, choices=rest_notification_choices)
    description = models.CharField(max_length=100, default="")