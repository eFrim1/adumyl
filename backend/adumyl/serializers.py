from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    # If you want to confirm passwords on registration, add a write-only field
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    email = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'is_owner', 'is_courier', 'address1',
                  'address2', 'address3', 'password', 'password_confirm']
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


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address1",
            "address2",
            "address3",
        ]

    def validate(self, data):
        if self.partial:
            # Skip checking required fields for partial updates
            return data

        # Enforce email validation only for full updates
        if "email" not in data or not data["email"]:
            raise serializers.ValidationError({"email": "This field may not be blank."})
        return data


class PasswordUpdateSerializer(serializers.Serializer):
    model = User

    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data


# Restaurant Serializer
class RestaurantSerializer(serializers.ModelSerializer):
    average_rating = serializers.ReadOnlyField()
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Mark user as read-only

    class Meta:
        model = Restaurant
        fields = [
            'id', 'user', 'name', 'address', 'phone_number', 'rating',
            'rating_count', 'average_rating', 'operating_hours', 'days', 'total_sales', 'total_orders', 'image_url'
        ]
        read_only_fields = ['rating', 'rating_count', 'average_rating']

    def create(self, validated_data):
        # Automatically associate the restaurant with the currently authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Courier Serializer
class CourierSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Automatically assigned

    class Meta:
        model = Courier
        fields = ['id', 'user', 'rating', 'current_location', 'vehicle']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# MenuItem Serializer
class MenuItemSerializer(serializers.ModelSerializer):
    restaurant = serializers.PrimaryKeyRelatedField(queryset=Restaurant.objects.all(), required=False)

    class Meta:
        model = MenuItem
        fields = ['id', 'restaurant', 'name', 'price', 'ingredients', 'prep_time', 'weight', 'image_url']

    def create(self, validated_data):
        # Automatically associate the menu item with the user's restaurant
        user = self.context['request'].user
        restaurant = Restaurant.objects.filter(user=user).first()
        if not restaurant:
            raise serializers.ValidationError({"restaurant": "No restaurant found for the authenticated user."})
        validated_data['restaurant'] = restaurant
        return super().create(validated_data)



# OrderItem Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())  # Reference to order
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())  # Reference to menu item

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'menu_item', 'quantity']


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    restaurant = serializers.PrimaryKeyRelatedField(queryset=Restaurant.objects.all())
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Make user read-only
    courier = serializers.PrimaryKeyRelatedField(queryset=Courier.objects.all(), allow_null=True, required=False)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'restaurant', 'user', 'courier', 'address', 'total_price',
            'payment_method', 'status', 'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Automatically set the user to the authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)



#Delivery Request Serializer
class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'
