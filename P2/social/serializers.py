from asyncio import run_coroutine_threadsafe
from rest_framework import serializers
from restaurant.models import MenuItem;
from restaurant.models import Restaurant
from social.models import LikeRest

from notifications.models import UserNotifications
from social.models import Follows

class LikeRestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikeRest
        fields = ['rid']

    # validated data is what the user sent
    def create(self, validated_data):
        return validated_data.get('rid')

class AddFollowSerializer(serializers.ModelSerializer):
    pass

    class Meta:
        model = Follows
        fields = ['rid']

    def create(self, validated_data):
        user =  self.context['request'].user
        rid = validated_data.get('rid')
        print(type(rid.id))
        # Check if restaurant exists
        restaurant = Restaurant.objects.filter(id = rid.id)
        if (bool(restaurant) == False):
            raise serializers.ValidationError({'error': 'restaurant does not exist'})

        # check if person already follows
        who_user_follows = Follows.objects.filter(uid = user, rid = restaurant[0])
        print(who_user_follows)
        if (bool(who_user_follows)):
            raise serializers.ValidationError({'error': 'you already follow this person'})
        
        print(user)
        notif = UserNotifications(rid=restaurant[0], uid = user, notif_type='f', description = user.username + " has followed you!")
        notif.save()
        follow = Follows(uid = user, rid = restaurant[0])
        follow.save()
        return follow