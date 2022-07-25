from django.contrib import admin

from restaurant.models import Comment, ImageModel, Restaurant, MenuItem
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Restaurant)
admin.site.register(ImageModel)
admin.site.register(MenuItem)
admin.site.register(Comment)
