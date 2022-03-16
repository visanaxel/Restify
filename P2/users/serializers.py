from statistics import mode
from rest_framework import serializers;
from users.models import MyUser

class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(required=True, write_only = True)
    password2 = serializers.CharField(required=True, write_only = True)
    
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    class Meta:
        model = MyUser
        fields = [
            'username',
            'profile_pic',
            'phone_number',
            'first_name',
            'last_name',
            'email',
            'password', 
            'password2',     
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }
    
    def create(self, validated_data):
        print("entered create method")
        username = validated_data.get('username')
        email = validated_data.get('email')
        profile_pic = validated_data.get('profile_pic')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        phone_number = validated_data.get('phone_number')
        print(last_name)
        password = validated_data.get('password')
        password2 = validated_data.get('password2')
        
        print(password)
        print(password2)
        if password == password2:
            user = MyUser(username=username, email=email, profile_pic=profile_pic, first_name = first_name, last_name=last_name, phone_number=phone_number)
            user.set_password(password)
            user.save()
            return user
        else:
            raise serializers.ValidationError({'error': 'Passwords don\'t match'})



class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = [
            'username',
            'profile_pic',
            'first_name',
            'last_name',
            'email',
            'phone_number'
        ]


class MyUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(required=True, write_only = True)
    password2 = serializers.CharField(required=True, write_only = True)
    
    class Meta:
        model = MyUser

        fields = [
            'username',
            'email',
            'password', 
            'password2',
            'description',
            'profile_pic',
            'is_owner'     
        ]

        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }