from rest_framework import serializers
from .models import Country, State, District, Registration

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'


class RegistrationSerializer(serializers.ModelSerializer):
    country = serializers.CharField()
    state = serializers.CharField()
    district = serializers.CharField()

    class Meta:
        model = Registration
        fields = ['firstName', 'lastName', 'address', 'country', 'state', 'district']

    def create(self, validated_data):
        country_name = validated_data.pop('country')
        state_name = validated_data.pop('state')
        district_name = validated_data.pop('district')

        country = Country.objects.get(name=country_name)
        state = State.objects.get(name=state_name, country=country)
        district = District.objects.get(name=district_name, state=state)

        registration = Registration.objects.create(
            country=country, state=state, district=district, **validated_data
        )
        return registration