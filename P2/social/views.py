from importlib.resources import read_text
from django.http import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from blog.serializers import BlogSerializer
from restaurant.models import Restaurant
from restaurant.serializers import AddRestaurantSerializer
from social.models import Follows
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from social.serializers import AddFollowSerializer, FollowSerializer

from blog.models import Blog
from notifications.models import OwnerNotifications
from restaurant.models import Restaurant

from rest_framework.generics import CreateAPIView, DestroyAPIView

from restaurant.serializers import AddRestaurantSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from social.models import LikeBlog, LikeRest

# Views here:
class AddFollowView(CreateAPIView):
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        errors = {}
        if request.data.get('rid') == None:
            errors['rid'] = ['This field is required.']
        
        # Check errors
        if len(errors) > 0:
            print('HI')
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=request.data['rid'])
        print(restaurant, bool(restaurant))
        if not bool(restaurant):
            return Response({'error': 'Restaurant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if already following
        follow = Follows.objects.filter(uid=request.user, rid=restaurant[0])
        if bool(follow):
            return Response({'error': 'User already following restaurant.'}, status=status.HTTP_400_BAD_REQUEST)

        # Add new OwnerNotification object!
        user = request.user
        user_notif = OwnerNotifications(uid=user, rid=restaurant[0], notif_type='f', description=user.username + ' followed your restaurant: ' + restaurant[0].name)
        user_notif.save()

        # increment followers
        restaurant[0].followers += 1
        restaurant[0].save()

        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(uid=self.request.user)

class DeleteFollowView(DestroyAPIView):
    queryset = Follows.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=kwargs['rid'])
        if not bool(restaurant):
            return Response({'error': 'Restaurant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if following
        follow = Follows.objects.filter(uid=request.user, rid=restaurant[0])
        if not bool(follow):
            return Response({'error': 'User not following restaurant.'}, status=status.HTTP_400_BAD_REQUEST)

        # decrement followers
        restaurant[0].followers -= 1
        restaurant[0].save()
        follow.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class LikeRestView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        user = request.user
        rid = request.POST.get('rid')

        error = {}

        # Check errors
        if rid == None:
            error['rid'] = ['This field is required.']
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=rid)
        if not bool(restaurant):
            return Response({'error': 'Restaurant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user already liked the restaurant
        like_rest_q = LikeRest.objects.filter(uid=user, rid=restaurant[0])
        if bool(like_rest_q):
            return Response({'error': 'User already liked the restaurant.'}, status=status.HTTP_400_BAD_REQUEST)

        # Add new OnwerNotification object!
        user_notif = OwnerNotifications(uid=user, rid=restaurant[0], notif_type='l', description=user.username + ' liked your restaurant: ' + restaurant[0].name)
        user_notif.save()

        # increment restaurant likes count!
        restaurant[0].likes += 1
        restaurant[0].save()

        like_rest = LikeRest(uid=user, rid=restaurant[0])
        like_rest.save()

        return Response(status=status.HTTP_200_OK)

class UnlikeRestaurant(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):

        user = request.user
        rid = kwargs['rid'] # Got from url!

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=rid)
        if not bool(restaurant):
            return Response({'error': 'Restaurant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user has like the restaurant
        like_rest_query = LikeRest.objects.filter(uid=user, rid=restaurant[0])
        if not bool(like_rest_query):
            return Response({'error': 'User does not like the restaurant.'}, status=status.HTTP_400_BAD_REQUEST)

        # decrement restaurant likes count!
        restaurant[0].likes -= 1
        restaurant[0].save()

        like_rest_instance = like_rest_query[0]
        like_rest_instance.delete()

        return Response(status=status.HTTP_200_OK)

class LikeBlogView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        user = request.user
        bid = request.POST.get('bid')

        # Check if rid is provided!
        if bid == None:
            return Response({'bid': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)

        # Check if blog exists
        blog = Blog.objects.filter(id=bid)
        if not bool(blog):
            return Response({'error': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user already liked the restaurant
        like_rest_q = LikeBlog.objects.filter(uid=user, bid=blog[0])
        if bool(like_rest_q):
            return Response({'error': 'User already liked the blog.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create owner notification!
        restaurant = blog[0].rid
        user_notif = OwnerNotifications(uid=user, rid=restaurant, notif_type='l', description=user.username + ' liked your blog: ' + blog[0].title)
        user_notif.save()

        # increment blog likes count!
        blog[0].likes += 1
        blog[0].save()

        like_blog = LikeBlog(uid=user, bid=blog[0])
        like_blog.save()

        return Response(status=status.HTTP_200_OK)

class UnlikeBlogView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):

        user = request.user
        bid = kwargs['bid'] # Got from url!

        # Check if restaurant exists
        blog = Blog.objects.filter(id=bid)
        if not bool(blog):
            return Response({'error': 'Blog not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user has like the restaurant
        like_blog_query = LikeBlog.objects.filter(uid=user, bid=blog[0])
        if not bool(like_blog_query):
            return Response({'error': 'User did not like the blog'}, status=status.HTTP_400_BAD_REQUEST)

        # decrement blog likes count!
        blog[0].likes -= 1
        blog[0].save()

        like_blog_instance = like_blog_query[0]
        like_blog_instance.delete()

        return Response(status=status.HTTP_200_OK)

class FeedView(ListAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        user = self.request.user

        # queryset of all restaurant the user follows
        restaurants = Follows.objects.filter(uid=user)

        # Check if user follows any restaurants
        if len(restaurants) < 1:
            return restaurants

        feeds = Blog.objects.filter(rid=restaurants[0].rid)
        for i in range(1, len(restaurants)):
            feeds = feeds |  Blog.objects.filter(rid=restaurants[i].rid)

        order = feeds.order_by('-date')

        return order