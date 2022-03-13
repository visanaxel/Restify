from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from restaurant.models import MenuItem
from restaurant.models import Restaurant
from restaurant.serializers import MenuItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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


    def post(self, request, *args, **kwargs):
        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']
        serializer = self.serializer_class(data=d)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditItem(RetrieveAPIView, UpdateAPIView):
    serializer_class = MenuItemSerializer

    def patch(self, request, *args, **kwargs):
        print("H")
        instance = self.get_object()
        d = request.data.dict()
        d['rid'] = kwargs['restaurant_id']
        d['id'] = kwargs['item']
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
