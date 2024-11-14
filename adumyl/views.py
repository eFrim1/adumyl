from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.

class SignUpView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
