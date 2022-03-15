from rest_framework import serializers
from notifications.models import UserNotifications, OwnerNotifications
from restaurant.models import Restaurant

from users.models import MyUser

rest_notification_choices = (('a', 'item added'), ('e', 'item edited'))

class UserNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserNotifications
        fields = [
            'id', 
            'rid', 
            'notif_type',
            'description'
        ]

class OwnerNotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OwnerNotifications
        fields = ['id', 'uid', 'description']