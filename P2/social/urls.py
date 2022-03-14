from django.urls import path, include

from social.views import AddFollowView, DeleteFollowApiView

app_name = 'social'  
  
urlpatterns = [
    path('follow/', AddFollowView.as_view(), name='follow'),
    path('unfollow/<rid>', DeleteFollowApiView.as_view(), name='unfollow')
]