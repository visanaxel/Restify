from pdb import post_mortem
from statistics import mode
from rest_framework import serializers
from restaurant.models import Restaurant;
from users.models import MyUser
from blog.models import Blog

class BlogViewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'likes',
            'image',
            'rid',
            'author'      
        ]

class BlogRegisterSerializer(serializers.ModelSerializer):
    # youtube dude didnt have to import but he didnt extend so I dunno tbh nvm he did

    
    class Meta:
        model = Blog
        fields = [
            'title',
            'content',
            'image',      
        ]
        
    # Every serelizer over rides this function I guess to save changes to the model i dunno
    # validated data is what the user sent
    def create(self, validated_data):
        print("entered create method")
        title = validated_data.get('title')
        content = validated_data.get('content')
        image = validated_data.get('image')
        # print(username)
        # print(password)
        # check if password and password2 ask on piazza if we want check here or on the backend
        print(title)
        print(content)
        
        
        blog = Blog(title=title, content=content, image=image)
        
        blog.save()
        return blog
        
        # why return user I dont know youtube dude it
        # return 
    
        # else:
        #     raise serializers.ValidationError({'error': 'Yo passwords dont match'})

        # might need to uncomment this
        # return super().create(validated_data)