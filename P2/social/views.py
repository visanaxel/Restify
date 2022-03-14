from django.shortcuts import render
from notifications.models import UserNotifications
from rest_framework.views import APIView
from restaurant.models import Restaurant
from restaurant.serializers import AddRestaurantSerializer
from social.models import Follows
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from social.serializers import AddFollowSerializer



# Create your views here.
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
        # make sure user is not already following
        
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
        
        # someone not already following
        