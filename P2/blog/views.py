from cgitb import lookup
from django.shortcuts import render
from blog.models import Blog
from blog.serializers import BlogSerializer
from notifications.serializers import UserNotificationSerializer
from restaurant.models import Restaurant
from rest_framework.views import APIView
from django.http import Http404
# from users.models import MyUser
# from users.serializers import ProfileSerializer
# from users.serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework import status
from social.models import Follows

class AddBlogView(CreateAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        restaurant = Restaurant.objects.get(owner=user)
        serializer.save(rid=restaurant)
        serializer.save(author=user)

class BlogView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'pk'

class EditBlogView(UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

class RemoveBlogView(DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

