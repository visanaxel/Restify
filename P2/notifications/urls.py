from django.urls import path, include

from notifications.views import UserNotificationView, OwnerNotificationView

app_name = 'notifications'  
  
urlpatterns = [
    path('user/', UserNotificationView.as_view(), name='user_notif' ),
    path('owner/',  OwnerNotificationView.as_view(), name='owner_notif'),
]