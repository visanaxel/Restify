
from django.urls import path, include
from restaurant.views import ViewMenu, AddItem, EditItem

app_name = 'restaurant'  


  
urlpatterns = [
    path('<restaurant_id>/menu/', ViewMenu.as_view(), name='menu'),
    path('<restaurant_id>/menu/add/', AddItem.as_view(), name='add'),
    path('<restaurant_id>/menu/<int:pk>/edit/', EditItem.as_view(), name='edit'),
] 