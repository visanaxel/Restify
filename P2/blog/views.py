from blog.models import Blog
from blog.serializers import BlogSerializer
from notifications.models import UserNotifications
from restaurant.models import Restaurant
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from social.models import Follows
from rest_framework.response import Response

class AddBlogView(CreateAPIView):
    serializer_class = BlogSerializer
    model = Blog
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        # Check if user has a restaurant
        if not request.user.is_owner:
            return Response()

        return super().post(request, *args, **kwargs)


    def perform_create(self, serializer):
        user = self.request.user
        restaurant = Restaurant.objects.get(owner=user)
        serializer.save(rid=restaurant, author=user)

        # Add notifications for all user following this restaurant
        followers = Follows.objects.filter(rid=restaurant)
        for follower in followers:
            desc = serializer.data['title'].capitalize() + " blog was posted for " + restaurant.name + "!"
            UserNotifications.objects.create(uid=follower.uid, rid=restaurant, notif_type='b', description=desc)
        
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

