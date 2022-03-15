from django.urls import include, path

from blog.views import AddBlogView, BlogView, EditBlogView, RemoveBlogView
app_name = 'blog'


urlpatterns = [
    path('add/', AddBlogView.as_view(), name='add'),
    path('<int:pk>/view/', BlogView.as_view(), name='view'),
    path('<int:pk>/edit/', EditBlogView.as_view(), name='edit'),
    path('<int:pk>/remove/', RemoveBlogView.as_view(), name='delete'),
]