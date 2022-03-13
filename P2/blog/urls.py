from django.urls import include, path

from blog.views import DeleteBlogApiView, EditBlogAPIView, RegisterAPIView, ViewBlogAPIView
app_name = 'blog'


urlpatterns = [
    path('add/', RegisterAPIView.as_view(), name='add'),
    path('view/<pk>', ViewBlogAPIView.as_view(), name='view'),
    path('edit/<pk>', EditBlogAPIView.as_view(), name='edit'),
    path('delete/<pk>', DeleteBlogApiView.as_view(), name='delete'),
]