from django.http import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from restaurant.models import Restaurant
from restaurant.serializers import AddRestaurantSerializer
from social.models import Follows
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from social.serializers import AddFollowSerializer

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
class AddFollowView(APIView):
    serializer_class = AddFollowSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        print("entered post follow!")
        serializer = self.serializer_class(data=request.data, context = {'request': request})
        if serializer.is_valid():
            follow = serializer.save()
            
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteFollowApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Follows.objects.all()
    
    
    def delete(self, request, rid):
        user = request.user
        print(user)
        
        restaurant_found = Restaurant.objects.filter(id = rid)
        if (bool(restaurant_found) == False):
            return Response({'error': 'Aint a valid restaurant'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        follower = Follows.objects.filter(uid = user, rid = restaurant_found[0])
        if (bool(follower) == False):
            return Response({'error': 'You dont even follow dis dude stoopid'}, status=status.HTTP_400_BAD_REQUEST)
        
        follower.delete()
        return Response({"message": "You have unfollowed"})

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

        # Add new OnwerNotification object!
        user_notif = OwnerNotifications(uid=user, rid=restaurant[0], notif_type='l', description=user.username + ' liked your restaurant: ' + restaurant[0].name)
        user_notif.save()

        # increment restaurant likes count!
        restaurant[0].likes += 1
        restaurant[0].save()

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

        # decrement restaurant likes count!
        restaurant[0].likes -= 1
        restaurant[0].save()

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

        # Create owner notification!
        restaurant = blog[0].rid
        user_notif = OwnerNotifications(uid=user, rid=restaurant, notif_type='l', description=user.username + ' liked your blog: ' + blog[0].title)
        user_notif.save()

        # increment blog likes count!
        blog[0].likes += 1
        blog[0].save()

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

        # decrement blog likes count!
        blog[0].likes -= 1
        blog[0].save()

        like_blog_instance = like_blog_query[0]
        like_blog_instance.delete()

        return Response('Unliked blog', status=status.HTTP_200_OK)
