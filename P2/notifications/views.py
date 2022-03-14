
from django.http import Http404
from django.shortcuts import render
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from notifications.models import UserNotifications, OwnerNotifications
from notifications.serializers import OwnerNotificationSerializer, UserNotificationSerializer
from restaurant.models import Restaurant
from rest_framework import status


# Create your views here.
class OwnerNotificationView(ListAPIView):
    serializer_class = OwnerNotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):

        user = request.user

        if not user.is_owner:
            return Response({'error': 'You do not own a restaurant'}, status=status.HTTP_400_BAD_REQUEST)

        restaurant = Restaurant.objects.filter(owner=user)

        ret = OwnerNotifications.objects.filter(rid=restaurant[0])

        for notif in ret:
            notif.delete()

        return ret



# NOTIFICATIONS IM GETTING FROM REST(NEW BLOG) SENDING TO USER
class UserNotificationView(ListAPIView):

    serializer_class = UserNotificationSerializer

    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        
        ret = UserNotifications.objects.filter(uid=user)
        for notif in ret:
            notif.delete()

        return ret


