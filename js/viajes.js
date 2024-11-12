// js/viajes.js
class Viajes {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    setPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
        this.showDynamicMap();
    }

    showDynamicMap() {
        const mapOptions = {
            center: { lat: this.latitude, lng: this.longitude },
            zoom: 14
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        new google.maps.Marker({
            position: { lat: this.latitude, lng: this.longitude },
            map: map
        });
    }

    showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }
}