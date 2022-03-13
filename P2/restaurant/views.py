from codecs import lookup
from django.http import Http404, HttpResponseForbidden
from django.http import Http404
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from restaurant.models import MenuItem
from restaurant.models import Restaurant
from restaurant.serializers import AddRestaurantSerializer, MenuItemSerializer, RestaurantViewSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ViewMenu(ListAPIView):
    serializer_class = MenuItemSerializer
    model = MenuItem
    context_object_name = 'menu'
    queryset = MenuItem.objects.all()
    
    def get(self, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        print(queryset)
        obj = queryset.filter(rid=kwargs['restaurant_id'])
        return Response(list(obj.values()))

class AddItem(APIView):
    serializer_class = MenuItemSerializer
    model = MenuItem
    context_object_name = 'add_item'
    queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        user = request.user

        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']

        restaurant = Restaurant.objects.filter(owner = user.id)

        if not bool(restaurant): 
            return Http404
        
        if (int(restaurant[0].id) != int(kwargs['restaurant_id'])):
            return Response("Forbidden", status=403)

        serializer = self.serializer_class(data=d)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditItem(RetrieveAPIView, UpdateAPIView):
    serializer_class = MenuItemSerializer
    model = MenuItem
    context_object_name = 'edit_item'
    queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        
        instance = self.get_object()
        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']
        d['id'] = kwargs['pk']
        user = request.user
        restaurant = Restaurant.objects.filter(owner = user.id)
        if not bool(restaurant): 
            return Http404
        
        if (int(restaurant[0].id) != int(kwargs['restaurant_id'])):
            return Response("Forbidden", status=403)

        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RestaurantView(RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantViewSerializer
    look_field = 'pk'

class AddRestaurantView(APIView):
    serializer_class = AddRestaurantSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("entered post!")
        # By here the user is valid, I want to see if this user is a restauarant owner, and if they own a restaurant first!
        user = request.user

        if (user.is_owner):
            return Response({'error': 'already have restaurant registered'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            rest = serializer.save()
            rest.owner = user
            rest.save()

            user.is_owner = True
            user.save()
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.error_messages)
            print("it is not valid!")

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditRestaurantView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantViewSerializer
    look_field = 'pk'

    def get_object(self):
        print("ENTERED GET OBJECT!")
        user = self.request.user
        rid = self.kwargs.get('pk')
        rest = Restaurant.objects.filter(id = rid)

        if (bool(rest) == False):
            print("Couldnt find blog")
            raise Http404
            # return Response({'error': 'DIS aint a blog dawg!'}, status=status.HTTP_400_BAD_REQUEST)

        rest = rest[0]
        
        if (rest.owner != user):
            print("dis dude dont even own a restuarant wtf")

            # return Response({'error': 'YOU DONT EVEN OWN A RESTAURANT!'}, status=status.HTTP_400_BAD_REQUEST)
            raise Http404

        return rest