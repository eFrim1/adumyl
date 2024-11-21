from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User,Restaurant, Courier, MenuItem, Order, OrderItem

class UserAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model in the admin site
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name', 'phone_number')}),
        (_('Address'), {'fields': ('address1', 'address2', 'address3')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_owner', 'is_courier', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    # Fields to show in the "add user" form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_owner', 'is_courier', 'is_active', 'is_staff', 'is_superuser')
        }),
    )
    # Fields to display in the list view
    list_display = ('email', 'first_name', 'last_name', 'is_owner', 'is_courier', 'is_staff', 'is_active')
    list_filter = ('is_owner', 'is_courier', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'phone_number')
    ordering = ('email',)

# Register the custom User model and the custom UserAdmin class
admin.site.register(User, UserAdmin)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'address', 'average_rating', 'rating_count', 'phone_number')
    search_fields = ('name', 'user__email', 'address')
    list_filter = ('rating',)
    readonly_fields = ('average_rating',)

@admin.register(Courier)
class CourierAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'current_location')
    search_fields = ('user__email', 'current_location')
    list_filter = ('rating',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'price', 'prep_time', 'weight')
    search_fields = ('name', 'restaurant__name')
    list_filter = ('restaurant', 'price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'restaurant', 'courier', 'total_price', 'status', 'created_at', 'updated_at')
    search_fields = ('restaurant__name', 'courier__user__email', 'status')
    list_filter = ('status', 'payment_method', 'created_at')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'menu_item', 'quantity')
    search_fields = ('order__id', 'menu_item__name')
    list_filter = ('menu_item__restaurant',)