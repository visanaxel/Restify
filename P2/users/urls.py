
from django.urls import path, include   
  
app_name = 'users'  

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
  
  
urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
] 