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

        # why return user I dont know youtube dude it
        # return 

        # else:
        #     raise serializers.ValidationError({'error': 'Yo passwords dont match'})

        # might need to uncomment this
        # return super().create(validated_data)
