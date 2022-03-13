from django.contrib import admin

from restaurant.models import Restaurant, MenuItem
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Restaurant)
admin.site.register(MenuItem)
