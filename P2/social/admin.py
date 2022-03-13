from django.contrib import admin

from social.models import Follows, LikeBlog, LikeRest

# Register your models here.
admin.site.register(Follows)
admin.site.register(LikeRest)
admin.site.register(LikeBlog)