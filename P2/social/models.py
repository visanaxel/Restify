from django.db import models
from django.db.models import SET_NULL
from restaurant.models import Restaurant
from blog.models import Blog

from users.models import MyUser

# Create your models here.
# follows, likes
class Follows(models.Model):
    uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
    rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL,  null=True)

class LikeBlog(models.Model):
     uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
     bid = models.ForeignKey(to=Blog, on_delete=SET_NULL, null=True)
     
class LikeRest(models.Model):
     uid = models.ForeignKey(to=MyUser, on_delete=SET_NULL, null=True)
     rid = models.ForeignKey(to=Restaurant, on_delete=SET_NULL, null=True)