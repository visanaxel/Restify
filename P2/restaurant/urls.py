
from xml.etree.ElementTree import Comment
from django.urls import path, include
from restaurant.views import CommentRestaurantView, GetCommentsView
from restaurant.views import AddRestaurantView, EditRestaurantView, RestaurantView, ViewMenu, AddItem, EditItem

app_name = 'restaurant'  
  
urlpatterns = [
    path('<restaurant_id>/menu/', ViewMenu.as_view(), name='menu'),
    path('<restaurant_id>/menu/add/', AddItem.as_view(), name='add'),
    path('<restaurant_id>/menu/<int:pk>/edit/', EditItem.as_view(), name='edit'),
    path('view/<pk>', RestaurantView.as_view(), name='view_rest'),
    path('add/', AddRestaurantView.as_view(), name='add_restaurant'),
    path('edit/<pk>', EditRestaurantView.as_view(), name='edit_restaurant'),
    path('<restaurant_id>/comment/', CommentRestaurantView.as_view(), name='comment'),
    path('<pk>/view_comments/', GetCommentsView.as_view(), name='get_comments'),
]