from django.urls import path, include

from social.views import LikeRestView, UnlikeRestaurant, LikeBlogView, UnlikeBlogView

app_name = 'social'  
  
urlpatterns = [
    path('like/restaurant/', LikeRestView.as_view(), name='like_rest'),
    path('unlike/restaurant/<rid>', UnlikeRestaurant.as_view(), name='unlike_rest'),
    path('like/blog/', LikeBlogView.as_view(), name='like_blog'),
    path('unlike/blog/<bid>', UnlikeBlogView.as_view(), name='unlike_blog')
]