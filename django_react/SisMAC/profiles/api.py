from .models import ProfileUser
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer

# Profile Viewset
class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.request.user.profileUsers.all()
    
    def perform_create(self, serializer):
        serializer.save(account=self.request.user)