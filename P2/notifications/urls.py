from django.urls import path, include

from notifications.views import UserNotificationView, RestNotificationView

app_name = 'notifications'  
  
urlpatterns = [
    path('user/', UserNotificationView.as_view(), name='user_notif' ),
    path('restaurant/',  RestNotificationView.as_view(), name='rest_notif'),
]