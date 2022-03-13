from asyncio import run_coroutine_threadsafe
from rest_framework import serializers
from restaurant.models import MenuItem;
from restaurant.models import Restaurant

class MenuItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    price = serializers.FloatField()
    description = serializers.CharField(max_length=400)
    image = serializers.ImageField()
    rid = Restaurant

    class Meta:
        model = MenuItem
        fields = [
            'name',
            'price',
            'description',
            'image',
            'rid'
        ]