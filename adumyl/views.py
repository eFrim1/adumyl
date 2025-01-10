from django.contrib.auth import authenticate, login
from django.core.serializers import serialize
from django.shortcuts import render
from django.template.context_processors import request
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *


# Create your views here.

class LoginView(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({
                "message": "Login successful.",
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)


class SignUpView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response({
                "message": "Signup successful.",
                "user": UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)  # Partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        if request.user:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No restaurant found for the user."}, status=status.HTTP_404_NOT_FOUND)


class UpdatePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = PasswordUpdateSerializer(data=request.data)
        if serializer.is_valid():
            self.request.user.set_password(serializer.validated_data.get("password"))
            self.request.user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(user_orders, many=True)
        return Response(serializer.data, status=200)


class RestaurantsAllView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        restaurants = Restaurant.objects.all()
        if restaurants:
            serializer = RestaurantSerializer(restaurants, many=True)
            # if serializer.errors:
            #     return Response({"detail": "Request error"}, status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No restaurant found"}, status=status.HTTP_200_OK)


class RestaurantView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = RestaurantSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(user=request.user).first()
        if restaurant:
            serializer = RestaurantSerializer(restaurant)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No restaurant found for the user."}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        restaurant = Restaurant.objects.filter(user=request.user).first()
        if not restaurant:
            return Response({"detail": "No restaurant found for the user."}, status=status.HTTP_404_NOT_FOUND)

        serializer = RestaurantSerializer(restaurant, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MenuItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all orders for the authenticated user's restaurant
        restaurant = request.user.restaurants.first()
        if not restaurant:
            return Response({"detail": "No restaurant found for the authenticated user."}, status=status.HTTP_404_NOT_FOUND)

        items = MenuItem.objects.filter(restaurant=restaurant)
        serializer = MenuItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = MenuItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        menu_item_id = kwargs.get("pk")
        try:
            menu_item = MenuItem.objects.get(id=menu_item_id, restaurant__user=request.user)
            menu_item.delete()
            return Response({"detail": "Menu item deleted successfully."}, status=status.HTTP_200_OK)
        except MenuItem.DoesNotExist:
            return Response({"detail": "Menu item not found."}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        menu_item_id = kwargs.get("pk")
        try:
            menu_item = MenuItem.objects.get(id=menu_item_id, restaurant__user=request.user)
            serializer = MenuItemSerializer(menu_item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MenuItem.DoesNotExist:
            return Response({"detail": "Menu item not found."}, status=status.HTTP_404_NOT_FOUND)

class OrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all orders for the authenticated user's restaurant
        restaurant = request.user.restaurants.first()
        if not restaurant:
            return Response({"detail": "No restaurant found for the authenticated user."}, status=status.HTTP_404_NOT_FOUND)

        orders = Order.objects.filter(restaurant=restaurant).order_by('status', '-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        # Update the status of an order
        order_id = kwargs.get('pk')
        try:
            order = Order.objects.get(id=order_id, restaurant__user=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        status_to_update = request.data.get("status")
        if not status_to_update:
            return Response({"detail": "Status field is required."}, status=status.HTTP_400_BAD_REQUEST)

        order.status = status_to_update
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourierView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courier = Courier.objects.get(user= request.user)
        if courier:
            serializer = CourierSerializer(courier)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No courier found for the user."}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request):
        # Register a courier
        serializer = CourierSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            courier = serializer.save()
            return Response(CourierSerializer(courier).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeliveryRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch orders with status 'out_for_delivery' and no courier assigned
        orders = Order.objects.filter(status="out_for_delivery", courier__isnull=True)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        # Accept a delivery request
        try:
            courier = Courier.objects.get(user=request.user).first()
        except Courier.DoesNotExist:
            return Response({"detail": "Courier not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            order = Order.objects.get(id=pk, status="out_for_delivery", courier__isnull=True)
            order.courier = courier
            order.status = "accepted"
            order.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({"detail": "Order not available for delivery."}, status=status.HTTP_404_NOT_FOUND)

