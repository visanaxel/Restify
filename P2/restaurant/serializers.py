from asyncio import run_coroutine_threadsafe
import datetime
from rest_framework import serializers
from restaurant.models import Comment
from users.models import MyUser
from restaurant.models import MenuItem;
from restaurant.models import Restaurant

class MenuItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=200)
    price = serializers.FloatField()
    description = serializers.CharField(max_length=400)
    image = serializers.ImageField(required=False)
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

class RestaurantViewSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Restaurant
        fields = ['name', 
                'address', 
                'logo', 
                'postal_code', 
                'phone_number', 
                'owner'
        ]


class AddRestaurantSerializer(serializers.ModelSerializer):
    # youtube dude didnt have to import but he didnt extend so I dunno tbh nvm he did
    class Meta:
        model = Restaurant
        fields = ['name', 
                'address', 
                'logo', 
                'postal_code', 
                'phone_number', 
        ]

    # Every serelizer over rides this function I guess to save changes to the model i dunno
    # validated data is what the user sent
    def create(self, validated_data):
        print("entered create method")
        name = validated_data.get('name')
        address = validated_data.get('address')
        logo = validated_data.get('logo')
        postal_code = validated_data.get('postal_code')
        phone_number = validated_data.get('phone_number')

        # print(username)
        # print(password)
        # check if password and password2 ask on piazza if we want check here or on the backend

        rest = Restaurant(name=name, address=address, logo=logo, postal_code=postal_code, 
        phone_number=phone_number)

        rest.save()
        return rest

class CommentSerializer(serializers.ModelSerializer):
    uid = MyUser
    rid = Restaurant
    comment = serializers.CharField(max_length=400)


    class Meta:
        model = Comment
        fields = [
            'uid',
            'rid',
            'comment',
            'date'
        ]
