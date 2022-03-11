from django.shortcuts import render
from rest_framework.views import APIView
from users.models import MyUser
from users.serializers import ProfileSerializer
from users.serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView
from rest_framework import status

# Create your views here.
class RegisterAPIView(APIView):
    serialzer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        print("entered post!")
        serializer = self.serialzer_class(data=request.data)

        if serializer.is_valid():
            print("it is valid!")
            user = serializer.save()
            # now we want to generate token for the user, creating tokenss manually from the docs actually nah
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.error_messages)
            print("it is not valid!")

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProfileView(RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = MyUser.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

class EditProfileView(RetrieveAPIView, UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
