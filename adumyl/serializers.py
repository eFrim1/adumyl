from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    # If you want to confirm passwords on registration, add a write-only field
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'is_owner', 'is_courier', 'address1', 'address2', 'address3', 'password', 'password_confirm']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """
        Ensure passwords match during validation.
        """
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        """
        Remove password_confirm field and create a new user with the provided password.
        """
        validated_data.pop('password_confirm')  # Remove password_confirm as it's not a User model field
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Use set_password to hash the password
        user.save()
        return user

# Restaurant Serializer
class RestaurantSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()  # Read-only field to display average rating
    user = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())

    class Meta:
        model = Restaurant
        fields = ['id', 'user', 'name', 'address', 'rating', 'rating_count', 'average_rating', 'schedule', 'phone_number']
        read_only_fields = ['rating', 'rating_count', 'average_rating']  # Make these fields read-only


# Courier Serializer
class CourierSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())  # Primary key reference for the user

    class Meta:
        model = Courier
        fields = ['id', 'user', 'rating', 'current_location']


# MenuItem Serializer
class MenuItemSerializer(serializers.ModelSerializer):
    restaurant = serializers.PrimaryKeyRelatedField(queryset=Restaurant.objects.all())  # Reference to restaurant

    class Meta:
        model = MenuItem
        fields = ['id', 'restaurant', 'name', 'price', 'ingredients', 'prep_time', 'weight']


# OrderItem Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())  # Reference to order
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())  # Reference to menu item

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'menu_item', 'quantity']


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    restaurant = serializers.PrimaryKeyRelatedField(queryset=Restaurant.objects.all())  # Reference to restaurant
    courier = serializers.PrimaryKeyRelatedField(queryset=Courier.objects.all(), allow_null=True)  # Optional courier reference

    class Meta:
        model = Order
        fields = ['id', 'restaurant', 'courier', 'address', 'total_price', 'payment_method', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']