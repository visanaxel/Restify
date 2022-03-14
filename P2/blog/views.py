from django.shortcuts import render
from blog.models import Blog
from blog.serializers import BlogRegisterSerializer, BlogViewSerializer
from notifications.serializers import RestNotificationSerializer
from restaurant.models import Restaurant
from rest_framework.views import APIView
from django.http import Http404
# from users.models import MyUser
# from users.serializers import ProfileSerializer
# from users.serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import status
from social.models import Follows

# Create your views here.
# Anyone should be allowed to view a blog, no need for authentication
class RegisterAPIView(APIView):
    serializer_class = BlogRegisterSerializer
    permission_classes = [IsAuthenticated]
    
    # axel stuff i dunno
    notif_serializer_class = RestNotificationSerializer



    def post(self, request, *args, **kwargs):
        print("entered post!")
        # By here the user is valid, I want to see if this user is a restauarant owner, and if they own a restaurant first!
        user = request.user
        
        if (not user.is_owner):
            return Response({'error': 'not restauarant user'}, status=status.HTTP_400_BAD_REQUEST)

        # for now go through restuarant table, if this userid does not own a restuarant error
        # could just change to owner
        print("HEY!")
        restaurant = Restaurant.objects.filter(owner = user.id)
        print(restaurant)
        print("BYE!")
        
        if (bool(restaurant) == False):
            return Response({'error': 'Yo dont got no restaurants'}, status=status.HTTP_400_BAD_REQUEST)

        
        
        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            print("it is valid!")
            blog = serializer.save()
            blog.rid = restaurant[0]
            blog.author = user
            blog.save()
            # ============================================================
            followers = Follows.objects.filter(rid=restaurant[0])
            for follower in followers:
                qset_keys = list(self.request.data)
                qset_vals = list(self.request.data.values())
                
                name = blog.title
                desc = name.capitalize() + " blog was posted for " + restaurant[0].name + "!"
                c = {'uid': follower.uid.id, 'rid': restaurant[0].id, 'notif_type': 'b', 'description': desc}
                notif_serializer = self.notif_serializer_class(data=c)

                if notif_serializer.is_valid():
                    notif_serializer.save()
                else:
                    return Response(notif_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # =================================================================
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.error_messages)
            print("it is not valid!")

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ViewBlogAPIView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogViewSerializer
    look_field = 'pk'
    
class EditBlogAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogViewSerializer
    look_field = 'pk'
    
    def get_object(self):
        print("ENTERED GET OBJECT!")
        user = self.request.user
        blog_id = self.kwargs.get('pk')
        blog = Blog.objects.filter(id = blog_id)
        
        if (bool(blog) == False):
            print("Couldnt find blog")
            raise Http404
            # return Response({'error': 'DIS aint a blog dawg!'}, status=status.HTTP_400_BAD_REQUEST)
        
        blog = blog[0]
        restaurant = Restaurant.objects.filter(owner = user.id)
        if (bool(restaurant) == False):
            print("dis dude dont even own a restuarant wtf")

            # return Response({'error': 'YOU DONT EVEN OWN A RESTAURANT!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404
        if (restaurant[0] != blog.rid):
            print(restaurant[0].id)
            print(blog.rid)
            print("dude reestaurant != blog restauarant")

            # return Response({'error': 'YOU DONT OWN THIS BLOG!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404
        return blog
        
    
class DeleteBlogApiView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogViewSerializer
    lookup_field = 'pk'
    
    def delete(self, request, pk):
        print("ENTERED delete OBJECT!")
        user = self.request.user
        blog_id = self.kwargs.get('pk')
        blog = Blog.objects.filter(id = blog_id)
        
        if (bool(blog) == False):
            print("Couldnt find blog")
            raise Http404
            # return Response({'error': 'DIS aint a blog dawg!'}, status=status.HTTP_400_BAD_REQUEST)
        
        blog = blog[0]
        restaurant = Restaurant.objects.filter(owner = user.id)
        if (bool(restaurant) == False):
            print("dis dude dont even own a restuarant wtf")
            # return Response({'error': 'YOU DONT EVEN OWN A RESTAURANT!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404
        if (restaurant[0] != blog.rid):
            print(restaurant[0].id)
            print(blog.rid)
            print("dude reestaurant != blog restauarant")

            # return Response({'error': 'YOU DONT OWN THIS BLOG!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404
        blog.delete()
        return Response({"message": "blog has been deleted"})

