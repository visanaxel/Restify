from django.urls import path, include

from social.views import AddFollowView, DeleteFollowView, FeedView
from social.views import LikeRestView, UnlikeRestaurant, LikeBlogView, UnlikeBlogView

app_name = 'social'  
  
urlpatterns = [
    path('follow/', AddFollowView.as_view(), name='follow'),
    path('unfollow/<int:rid>/', DeleteFollowView.as_view(), name='unfollow'),
    path('like/restaurant/', LikeRestView.as_view(), name='like_rest'),
    path('unlike/restaurant/<int:rid>/', UnlikeRestaurant.as_view(), name='unlike_rest'),
    path('like/blog/', LikeBlogView.as_view(), name='like_blog'),
    path('unlike/blog/<int:bid>/', UnlikeBlogView.as_view(), name='unlike_blog'),
    path('feed/', FeedView.as_view(), name='feed')
    ]