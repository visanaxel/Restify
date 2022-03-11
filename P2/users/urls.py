
from django.urls import path, include
from users.views import ProfileView, EditProfileView   
from users.views import RegisterAPIView
app_name = 'users'  

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
  
  
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('edit/', EditProfileView.as_view(), name='edit')
] 