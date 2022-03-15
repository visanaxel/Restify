from ast import Delete
from codecs import lookup
from ctypes import addressof
import json
import re
from django.http import Http404, HttpResponseForbidden
from django.http import Http404
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
from notifications.models import OwnerNotifications
from restaurant.models import Comment, ImageModel
from restaurant.serializers import CommentSerializer, ImageSerializer, ViewCommentSerializer
from notifications.serializers import UserNotificationSerializer
from social.models import Follows
from restaurant.models import MenuItem
from restaurant.models import Restaurant
from notifications.models import UserNotifications
from restaurant.serializers import AddRestaurantSerializer, MenuItemSerializer, RestaurantViewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from itertools import chain

# Create your views here.

class ViewMenu(ListAPIView):
    serializer_class = MenuItemSerializer
    model = MenuItem
    context_object_name = 'menu'
    queryset = MenuItem.objects.all()

    def get_queryset(self):

        all = self.queryset

        menu = all.filter(rid=self.kwargs['restaurant_id'])


        return menu
    
    # def get(self, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     print(queryset)
    #     obj = queryset.filter(rid=kwargs['restaurant_id'])
    #     return Response(list(obj.values()))

class AddItem(APIView):
    serializer_class = MenuItemSerializer
    notif_serializer_class = UserNotificationSerializer
    model = MenuItem
    context_object_name = 'add_item'
    queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        user = request.user

        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']

        restaurant = Restaurant.objects.filter(owner = user.id)

        if not bool(restaurant): 
            return Http404
        
        if (int(restaurant[0].id) != int(kwargs['restaurant_id'])):
            return Response("Forbidden", status=403)

        serializer = self.serializer_class(data=d)
        if serializer.is_valid():
            serializer.save()
            # restaurant was found and valid
            # now find followers
            followers = Follows.objects.filter(rid=d['rid'])
            for follower in followers:
                qset_keys = list(self.request.data)
                qset_vals = list(self.request.data.values())
                name = qset_vals[qset_keys.index('name')]
                desc = name.capitalize() + " was added to the restaurant " + restaurant[0].name + "!"
                c = {'uid': follower.uid.id, 'rid': kwargs['restaurant_id'], 'notif_type': 'n', 'description': desc}
                notif_serializer = self.notif_serializer_class(data=c)

                if notif_serializer.is_valid():
                    notif_serializer.save()
                else:
                    return Response(notif_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # notifs done
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditItem(RetrieveAPIView, UpdateAPIView):
    serializer_class = MenuItemSerializer
    model = MenuItem
    context_object_name = 'edit_item'
    queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]
    notif_serializer_class = UserNotificationSerializer

    def patch(self, request, *args, **kwargs):
        
        instance = self.get_object()
        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']
        d['id'] = kwargs['pk']
        user = request.user
        restaurant = Restaurant.objects.filter(owner = user.id)
        if not bool(restaurant): 
            return Http404
        
        if (int(restaurant[0].id) != int(kwargs['restaurant_id'])):
            return Response("Forbidden", status=403)

        # restaurant was found and valid
        # now find followers
        followers = Follows.objects.filter(rid=d['rid'])
        for follower in followers:
            item = MenuItem.objects.get(id=kwargs['pk'])
            desc = item.name.capitalize() + " was modified within the restaurant " + restaurant[0].name + "!"
            c = {'uid': follower.uid.id, 'rid': kwargs['restaurant_id'], 'notif_type': 'm', 'description': desc}
            notif_serializer = self.notif_serializer_class(data=c)

            if notif_serializer.is_valid():
                notif_serializer.save()
            else:
                return Response(notif_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RestaurantView(RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantViewSerializer
    look_field = 'pk'

class AddRestaurantView(APIView):
    serializer_class = AddRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("entered post!")
        # By here the user is valid, I want to see if this user is a restauarant owner, and if they own a restaurant first!
        user = request.user

        if (user.is_owner):
            return Response({'error': 'already have restaurant registered'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            rest = serializer.save()
            rest.owner = user
            rest.save()

            user.is_owner = True
            user.save()
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.error_messages)
            print("it is not valid!")

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditRestaurantView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantViewSerializer
    look_field = 'pk'

    def get_object(self):
        print("ENTERED GET OBJECT!")
        user = self.request.user
        rid = self.kwargs.get('pk')
        rest = Restaurant.objects.filter(id = rid)

        if (bool(rest) == False):
            print("Couldnt find blog")
            raise Http404
            # return Response({'error': 'DIS aint a blog dawg!'}, status=status.HTTP_400_BAD_REQUEST)

        rest = rest[0]
        
        if (rest.owner != user):
            print("dis dude dont even own a restuarant wtf")

            # return Response({'error': 'YOU DONT EVEN OWN A RESTAURANT!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404

        return rest

class CommentRestaurantView(APIView):
    serializer_class = CommentSerializer
    # notif_serializer_class = UserNotificationSerializer
    model = Comment
    context_object_name = 'add_comment'
    #queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        print(request.user.id)
        user = request.user

        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']

        restaurant = Restaurant.objects.filter(id=d['rid'])

        if not bool(restaurant): 
            return Response("Not Found", status=404)

        # restaurant was found

        # now find followers
        OwnerNotifications.objects.create(rid=restaurant[0], uid = request.user, notif_type='c', \
            description = user.username + " commented on your page: " + "\"" +  d['comment'] + "\".") 

        # notifs done
        
        d['uid'] = request.user.id
        serializer = self.serializer_class(data=d)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetCommentsView(ListAPIView):

    serializer_class = ViewCommentSerializer
    model = Comment
    # context_object_name = 'restaurant_id'
    look_field = 'pk'
    
    
    
    def get_queryset(self):
        
        restaurant = Restaurant.objects.filter(id = self.kwargs.get('pk'))
        if (bool(restaurant) == False):
            restaurant = [-1]
        
        return Comment.objects.filter(rid=restaurant[0])
    
    def get(self, *args, **kwargs):
        
        restaurant = Restaurant.objects.filter(id = self.kwargs.get('pk'))
        if (bool(restaurant) == False):
            raise Http404
        
        comments = Comment.objects.filter(rid=restaurant[0])
        
        all = []
        for comment in comments:
            d = {}
            d['username'] = comment.uid.username
            d['restaurant'] = comment.rid.name
            d['comment'] = comment.comment
            all.append(d)

        return Response(all)
        
class SearchView(ListAPIView):
    serializer_class = RestaurantViewSerializer
    model = Restaurant
    context_object_name = 'search'

    def get_queryset(self):
        queryset = Restaurant.objects.all()
        item_queryset = MenuItem.objects.all()

        obj_name = queryset.filter(name__contains=self.kwargs['search_query'])
        obj_address = queryset.filter(address__contains=self.kwargs['search_query'])
        obj_item = item_queryset.filter(name__contains=self.kwargs['search_query'])

        combined = obj_name | obj_address

        for i in obj_item:
            combined = combined | queryset.filter(id=i.rid.id)
        
        distinct = combined.distinct()

        order = distinct.order_by('-likes')

        return order

class AddImageView(CreateAPIView):
    
    serializer_class = ImageSerializer
    model = ImageModel
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['rid'] = kwargs['restaurant_id']
        return super().create(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):

        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id=kwargs['restaurant_id'])
        if not bool(restaurant):
            error = {'error': 'restaurant not found.'}
            return Response(error, status=status.HTTP_404_NOT_FOUND)

        return super().post(request, *args, **kwargs)

class RemoveImageView(DestroyAPIView):

    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]
    queryset = ImageModel.objects.all()
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):

        # Check if image exists
        image = ImageModel.objects.filter(id=kwargs['pk'])
        if not bool(image):
            error = {'error': 'image not found.'}
            return Response(error, status=status.HTTP_404_NOT_FOUND)

        # Check if user is owner of rest
        if image[0].rid.owner != request.user:
            error = {'error': 'you are not the owner.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)

        return super().delete( request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

