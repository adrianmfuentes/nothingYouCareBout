class Viajes {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.error = null;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.setPosition.bind(this),
                this.handleError.bind(this)
            );
        } else {
            this.error = "Geolocation is not supported by this browser.";
        }
    }

    setPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.showStaticMap();
        this.showDynamicMap();
    }

    handleError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.error = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                this.error = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                this.error = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                this.error = "An unknown error occurred.";
                break;
        }
    }

    showStaticMap() {
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitude}&zoom=14&size=400x400&key=YOUR_API_KEY`;
        document.getElementById('staticMap').src = mapUrl;
    }

    showDynamicMap() {
        const map = new google.maps.Map(document.getElementById('dynamicMap'), {
            center: { lat: this.latitude, lng: this.longitude },
            zoom: 14
        });
        new google.maps.Marker({
            position: { lat: this.latitude, lng: this.longitude },
            map: map
        });
    }
}