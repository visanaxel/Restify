
from django.http import Http404
from django.shortcuts import render
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from notifications.models import UserNotifications, RestNotifications
from notifications.serializers import RestNotificationSerializer, UserNotificationSerializer
from restaurant.models import Restaurant
from rest_framework import status


# Create your views here.
class UserNotificationView(ListAPIView):
    serializer_class = UserNotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):

        user = self.request.user
        restaurant = Restaurant.objects.filter(owner=user)
        
        if (bool(restaurant) == False):
            return Response({'error': 'Yo dont got no restaurants'}, status=status.HTTP_400_BAD_REQUEST)

        ret = UserNotifications.objects.filter(rid=restaurant[0])

        for notif in ret:
            notif.delete()

        return ret


# NOTIFICATIONS IM GETTING FROM REST(NEW BLOG) SENDING TO USER
class RestNotificationView(ListAPIView):

    serializer_class = RestNotificationSerializer

    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        
        ret = RestNotifications.objects.filter(uid=user)
        for notif in ret:
            notif.delete()

        return ret


