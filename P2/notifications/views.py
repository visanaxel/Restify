
from django.http import Http404
from django.shortcuts import render
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from notifications.models import UserNotifications, OwnerNotifications
from notifications.serializers import OwnerNotificationSerializer, UserNotificationSerializer
from restaurant.models import Restaurant
from rest_framework import status

from rest_framework.filters import SearchFilter


# Create your views here.
class OwnerNotificationView(ListAPIView):
    queryset = OwnerNotifications.objects.all()
    serializer_class = OwnerNotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        # This contains all owner notifications
        all = self.queryset

        # Get user restaurant
        restaurant = Restaurant.objects.get(owner=self.request.user)

        # Current owner notifications
        owner_notif = all.filter(rid=restaurant)

        #TODO: delete

        return owner_notif

    def get(self, request, *args, **kwargs):

        user = request.user

        if not user.is_owner:
            return Response({'error': 'You do not own a restaurant'}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().get(request, *args, **kwargs)
    

class UserNotificationView(ListAPIView):
    queryset = UserNotifications.objects.all()
    serializer_class = UserNotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        # This contains all user notifications
        all = self.queryset

        # Current user notifications
        user_notif = all.filter(uid=self.request.user)

        #TODO: delete

        return user_notif
    

