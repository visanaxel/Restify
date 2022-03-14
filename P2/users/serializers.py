from statistics import mode
from rest_framework import serializers;
from users.models import MyUser

class UserRegisterSerializer(serializers.ModelSerializer):
    # youtube dude didnt have to import but he didnt extend so I dunno tbh nvm he did

    password = serializers.CharField(required=True, write_only = True)
    password2 = serializers.CharField(required=True, write_only = True)
    class Meta:
        model = MyUser
        fields = [
            'username',
            'email',
            'password', 
            'password2',     
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True}
        }
    
    # Every serelizer over rides this function I guess to save changes to the model i dunno
    # validated data is what the user sent
    def create(self, validated_data):
        print("entered create method")
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')
        # print(username)
        # print(password)
        # check if password and password2 ask on piazza if we want check here or on the backend
        print(password)
        print(password2)
        if password == password2:
            user = MyUser(username=username, email=email)
            user.set_password(password)
            user.save()
            # why return user I dont know youtube dude it
            return user
        else:
            raise serializers.ValidationError({'error': 'Yo passwords dont match'})

        # might need to uncomment this
        # return super().create(validated_data)


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = [
            'username',
            'email',
            # 'profile_pic'
        ]


    # def update(self, instance, validated_data):
    #     print("enter uodae")
    #     instance.username = validated_data.get('username', instance.username)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.save()
    #     return instance
