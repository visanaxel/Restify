from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (                      # new fieldset added on to the bottom
            'Custom Field Heading',  # group heading of your choice; set to None for a blank space instead of a header
            {
                'fields': (
                    'description',
                    'profile_pic',
                    'is_owner',
                    'phone_number'
                ),
            },
        ),
    )

# Register your models here.
admin.site.register(MyUser, CustomUserAdmin)
