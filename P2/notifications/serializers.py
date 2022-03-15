from rest_framework import serializers
from notifications.models import UserNotifications, OwnerNotifications
from restaurant.models import Restaurant
from restaurant.serializers import MyUserSerializer, RestaurantSerializer

from users.models import MyUser

rest_notification_choices = (('a', 'item added'), ('e', 'item edited'))

class UserNotificationSerializer(serializers.ModelSerializer):
    uid = MyUserSerializer
    rid = RestaurantSerializer
    
    class Meta:
        model = UserNotifications
        fields = [
            'uid', 
            'rid', 
            'notif_type',
            'description'
        ]

class OwnerNotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OwnerNotifications
        fields = ['id', 'uid', 'description']