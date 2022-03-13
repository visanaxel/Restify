from django.contrib import admin

from notifications.models import RestNotifications, UserNotifications

# Register your models here.
admin.site.register(UserNotifications)
admin.site.register(RestNotifications)