from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings  # For linking with the custom User model

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(unique=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_owner = models.BooleanField(default=False)
    is_courier = models.BooleanField(default=False)
    address1 = models.CharField(max_length=255, blank=True, null=True)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    address3 = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()  # Assign custom manager

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Fields required for superuser creation

    def __str__(self):
        return self.email

class Restaurant(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="restaurants")
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    rating = models.PositiveIntegerField(default=0)  # Cumulative rating total
    rating_count = models.PositiveIntegerField(default=0)  # Total number of ratings
    operating_hours = models.TextField(blank=True, null=True)  # JSON field for open/close times, optional
    days = models.TextField(blank=True, null=True)  # JSON field for open/close times, optional
    phone_number = models.CharField(max_length=15)
    total_sales = models.IntegerField(default=0)
    total_orders = models.IntegerField(default=0)
    image_url = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.name

    def update_rating(self, new_rating):
        """
        Update the cumulative rating total and increment rating count.
        """
        # Add the new rating to the cumulative rating
        self.rating += new_rating
        # Increment the rating count
        self.rating_count += 1
        # Save the updated cumulative rating and count to the database
        self.save()

    @property
    def average_rating(self):
        """
        Calculate the average rating based on cumulative rating and count.
        """
        if self.rating_count == 0:
            return 0  # Avoid division by zero if no ratings
        return round(self.rating / self.rating_count, 2)  # Round to 2 decimal places for display

    def __str__(self):
        return f"Restaurant: {self.name}"


class Courier(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="couriers")
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    current_location = models.CharField(max_length=255)  # Optionally, could be GPS coordinates

    def __str__(self):
        return f"Courier: {self.user.email}"

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="menu_items")
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)  # e.g., 999.99
    ingredients = models.TextField()  # Could be a JSON or a many-to-many relationship
    prep_time = models.PositiveIntegerField(help_text="Preparation time in minutes")
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Weight in grams")
    image_url = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"

class Order(models.Model):
    PAYMENT_CHOICES = [
        ('card', 'Card'),
        ('cash', 'Cash'),
        ('paypal', 'PayPal'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('preparing', 'Preparing'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
    ]

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="orders")
    courier = models.ForeignKey(Courier, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    address = models.CharField(max_length=255)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.status}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.name} for Order {self.order.id}"
