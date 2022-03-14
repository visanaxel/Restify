from rest_framework import serializers
from notifications.models import RestNotifications
from restaurant.models import Restaurant

from users.models import MyUser

rest_notification_choices = (('a', 'item added'), ('e', 'item edited'))

class RestNotificationSerializer(serializers.ModelSerializer):
    uid = MyUser
    rid = Restaurant
    notif_type = serializers.CharField(max_length=1)
    description = serializers.CharField(max_length=100)

    class Meta:
        model = RestNotifications
        fields = [
            'uid',
            'rid',
            'notif_type',
            'description'
        ]

class UserNotificationSerializer(serializers.ModelSerializer):
    uid = MyUser
    rid = Restaurant
    notif_type = serializers.CharField(max_length=1)
    description = serializers.CharField(max_length=100)

    class Meta:
        model = RestNotifications
        fields = [
            'uid',
            'rid',
            'notif_type',
            'description'
        ]