from codecs import lookup
from django.http import Http404, HttpResponseForbidden
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from restaurant.models import MenuItem
from restaurant.models import Restaurant
from restaurant.serializers import MenuItemSerializer
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
        user = request.user
        instance = self.get_object()
        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']
        d['id'] = kwargs['pk']

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
        
