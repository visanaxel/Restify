from django.http import Http404
from django.shortcuts import render
from blog.models import Blog
from restaurant.models import Restaurant

from rest_framework.generics import CreateAPIView, DestroyAPIView

from restaurant.serializers import AddRestaurantSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from social.models import LikeBlog, LikeRest
from social.serializers import LikeRestSerializer

# Create your views here.

class LikeRestView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        user = request.user
        rid = request.POST.get('rid')

        # Check if rid is provided!
        if rid == None:
            return Response('Missing rid in body.', status=status.HTTP_400_BAD_REQUEST)

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=rid)
        if not bool(restaurant):
            return Response('Restaurant not found.', status=status.HTTP_404_NOT_FOUND)

        # Check if user already liked the restaurant
        like_rest_q = LikeRest.objects.filter(uid=user, rid=restaurant[0])
        if bool(like_rest_q):
            return Response('User already liked the restaurant.', status=status.HTTP_400_BAD_REQUEST)

        like_rest = LikeRest(uid=user, rid=restaurant[0])
        like_rest.save()

        return Response('Liked restaurant.', status=status.HTTP_200_OK)

class UnlikeRestaurant(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):

        user = request.user
        rid = kwargs['rid'] # Got from url!

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=rid)
        if not bool(restaurant):
            return Response('Restaurant not found.', status=status.HTTP_404_NOT_FOUND)

        # Check if user has like the restaurant
        like_rest_query = LikeRest.objects.filter(uid=user, rid=restaurant[0])
        if not bool(like_rest_query):
            return Response('User does not like the restaurant.', status=status.HTTP_400_BAD_REQUEST)

        like_rest_instance = like_rest_query[0]
        like_rest_instance.delete()

        return Response('Unliked restaurant', status=status.HTTP_200_OK)

class LikeBlogView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        user = request.user
        bid = request.POST.get('bid')

        # Check if rid is provided!
        if bid == None:
            return Response('Missing bid in body.', status=status.HTTP_400_BAD_REQUEST)

        # Check if blog exists
        blog = Blog.objects.filter(id=bid)
        if not bool(blog):
            return Response('Blog not found.', status=status.HTTP_404_NOT_FOUND)

        # Check if user already liked the restaurant
        like_rest_q = LikeBlog.objects.filter(uid=user, bid=blog[0])
        if bool(like_rest_q):
            return Response('User already liked the blog.', status=status.HTTP_400_BAD_REQUEST)

        like_blog = LikeBlog(uid=user, bid=blog[0])
        like_blog.save()

        return Response('Liked blog.', status=status.HTTP_200_OK)

class UnlikeBlogView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):

        user = request.user
        bid = kwargs['bid'] # Got from url!

        # Check if restaurant exists
        blog = Blog.objects.filter(id=bid)
        if not bool(blog):
            return Response('Blog not found.', status=status.HTTP_404_NOT_FOUND)

        # Check if user has like the restaurant
        like_blog_query = LikeBlog.objects.filter(uid=user, bid=blog[0])
        if not bool(like_blog_query):
            return Response('User did not like the blog.', status=status.HTTP_400_BAD_REQUEST)

        like_blog_instance = like_blog_query[0]
        like_blog_instance.delete()

        return Response('Unliked blog', status=status.HTTP_200_OK)