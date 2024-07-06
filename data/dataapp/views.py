from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Country, State, District, Registration
from .serializers import CountrySerializer, StateSerializer, DistrictSerializer, RegistrationSerializer

class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class StateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

    def get_queryset(self):
        country_id = self.kwargs.get('country')
        if country_id:
            return self.queryset.filter(country_id=country_id)
        return self.queryset

class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

    def get_queryset(self):
        state_id = self.kwargs.get('state')
        if state_id:
            return self.queryset.filter(state_id=state_id)
        return self.queryset

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

