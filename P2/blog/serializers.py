from pdb import post_mortem
from statistics import mode
from rest_framework import serializers
from restaurant.models import Restaurant
from restaurant.serializers import MyUserSerializer, RestaurantSerializer;
from users.models import MyUser
from blog.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    rid = RestaurantSerializer
    author = MyUserSerializer

    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'image',
            'rid',
            'likes',
            'author',
            'date'
        ]
        
class BlogEditSerializer(serializers.ModelSerializer):
    rid = RestaurantSerializer
    author = MyUserSerializer

    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'image',
               
        ]
