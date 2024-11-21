from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.template.context_processors import request
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

# Create your views here.

class LoginView(APIView):
    """
    Handle user login.
    """

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
    """
    Handle user signup.
    """

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