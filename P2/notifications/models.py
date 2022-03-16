from email.policy import default
from django.db import models
from django.db.models import SET_NULL

from users.models import MyUser
from blog.models import Blog
from restaurant.models import Restaurant

owner_notification_choices = (('l', 'like'), ('f', 'follow'), ('c', 'comment'))
user_notification_choices = (('m', 'menu change'), ('n', 'new item'), ('b', 'blog added'))

class OwnerNotifications(models.Model):
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True)
    notif_type = models.CharField(max_length=1, choices=owner_notification_choices)
    description = models.CharField(max_length=400)
    date = models.DateTimeField(auto_now_add=True)

class UserNotifications(models.Model):
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True)
    notif_type = models.CharField(max_length=1, choices=user_notification_choices)
    description = models.CharField(max_length=100, default="")
    date = models.DateTimeField(auto_now_add=True)