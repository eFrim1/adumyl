"""
URL configuration for adumylSite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from adumyl import views
from adumyl.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    path('user/', UserView.as_view(), name='update-profile'),
    path('change_password/', UpdatePasswordView.as_view(), name='change-password'),
    path('order_history/', OrderHistoryView.as_view(), name='order-history'),
    path('restaurant/', RestaurantView.as_view(), name='restaurant-create'),
    path('restaurants_all/', RestaurantsAllView.as_view(), name='restaurants-all'),
    path('menu_item/', MenuItemView.as_view(), name='add-menu-item'),
    path('menu-items-all/', MenuItemsAllView.as_view(), name='menu-items-all'),
    path('menu_item/<int:pk>/', MenuItemView.as_view(), name='manage-menu-item'),
    path('orders-all/', OrdersAllView.as_view(), name='orders-list'),  # Fetch all orders
    path('orders/', OrdersView.as_view(), name='orders-list'),  # Fetch all orders
    path('orders/<int:pk>/', OrdersView.as_view(), name='order-update'),  # Update order status
    path('courier/', CourierView.as_view(), name='courier-register'),
    path('delivery-requests/', DeliveryRequestsView.as_view(), name='delivery-requests'),
    path('delivery-requests/<int:pk>/', DeliveryRequestsView.as_view(), name='accept-delivery'),
    path("order-items/", OrderItemCreateView.as_view(), name="create-order-item"),

]
