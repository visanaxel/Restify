from blog.models import Blog
from blog.serializers import BlogEditSerializer, BlogSerializer
from notifications.models import UserNotifications
from restaurant.models import Restaurant
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from social.models import Follows
from rest_framework import status
from rest_framework.response import Response

from rest_framework.response import Response

class AddBlogView(CreateAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        # Check if user has a restaurant
        if not request.user.is_owner:
            return Response({'error': 'User is not an owner.'}, status=status.HTTP_403_FORBIDDEN)

        return super().post(request, *args, **kwargs)


    def perform_create(self, serializer):
        user = self.request.user
        restaurant = Restaurant.objects.get(owner=user)
        
        
        
        serializer.save(rid=restaurant, author=user)

        # Add notifications for all user following this restaurant
        followers = Follows.objects.filter(rid=restaurant)
        for follower in followers:
            desc = serializer.data['title'].capitalize() + " blog was posted for " + restaurant.name + "!"
            UserNotifications.objects.create(uid=follower.uid, rid=restaurant, notif_type='b', description=desc)
    
    def create(self, request, *args, **kwargs):
        if (not request.user.is_owner):
            print("CHECKKKKKKK")
            return Response({'error': 'Not a restaurant owner'}, status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)
    
class BlogView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):

        # Check if Blog exists
        blog = Blog.objects.filter(id=kwargs['pk'])
        if not bool(blog):
            return Response({'error': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

        return super().get(request, *args, **kwargs)

class EditBlogView(UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogEditSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, *args, **kwargs): 
        user = self.request.user
        blog_id = self.kwargs.get('pk')
        blog = Blog.objects.filter(id = blog_id)
        
        
        if (bool(blog) == False):
            return Response({'error': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

        
        blog = blog[0]
        if (not user.is_owner):
            return Response({'error': 'User is not an owner'}, status=status.HTTP_403_FORBIDDEN)
        
        if (user != blog.author):
            return Response({'error': 'User does not own this blog'}, status=status.HTTP_403_FORBIDDEN)

        return super().patch(request, *args, **kwargs)

class RemoveBlogView(DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        
        user = self.request.user
        blog_id = self.kwargs.get('pk')
        blog = Blog.objects.filter(id = blog_id)
        
        
        if (bool(blog) == False):
            return Response({'error': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

        
        blog = blog[0]
        restaurant = Restaurant.objects.filter(owner = user.id)
        if (bool(restaurant) == False):
            return Response({'error': 'You do not own a restaurant'}, status=status.HTTP_403_FORBIDDEN)
        
        if (user != blog.author):
            print(restaurant[0].id)
            print(blog.rid)
            print("dude reestaurant != blog restauarant")
            return Response({'error': 'You do not own this blog'}, status=status.HTTP_403_FORBIDDEN)
        
        blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

