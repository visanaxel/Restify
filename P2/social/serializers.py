from asyncio import run_coroutine_threadsafe
from rest_framework import serializers
from restaurant.models import MenuItem;
from restaurant.models import Restaurant
from social.models import LikeRest

class LikeRestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikeRest
        fields = ['rid']

    # validated data is what the user sent
    def create(self, validated_data):
        return validated_data.get('rid')
