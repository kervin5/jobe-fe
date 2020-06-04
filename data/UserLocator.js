import axios from "axios";

class UserLocator {
  locationName = "Unavailable";

  constructor() {
    this.geoLocationIsVailable =
      typeof navigator !== "undefined" && "geolocation" in navigator;
  }

  getLocation = () => {
    return this.setLocationByLocalStorage();
    if (this.geoLocationIsVailable) {
      // navigator.geolocation.getCurrentPosition(this.setLocationByGeolocation, this.setLocationByIp);
      return this.setLocationByGeolocation();
    } else {
      return this.setLocationByIp();
    }
  };

  setLocationData = ({ name, lat, lon }) => {
    this.locationName = name;
    this.latitude = lat;
    this.longitude = lon;
  };

  setLocationByLocalStorage = () => {
    return new Promise((resolve, reject) => {
      const locationData = {
        lat: 0,
        lon: 0,
        name: ""
      };

      const location = localStorage.getItem("lastLocation");
      if (location) {
        locationData.name = location;
        return resolve(locationData);
      } else {
        return resolve(this.setLocationByIp());
      }
    });
  };

  setLocationByGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          axios
            .get(`/api/location/${longitude},${latitude}`)
            .then(res => {
              const locationData = {
                lat: latitude,
                lon: longitude,
                name: res.data.features[0].context[0].text,
                country: res.data.features[0].context.filter(loc =>
                  loc.id.includes("country")
                )[0].text
              };
              this.setLocationData(locationData);
              resolve(locationData);
            })
            .catch(err => {
              console.log(err);
              resolve(this.setLocationByIp());
            });
        },
        () => {
          resolve(this.setLocationByIp());
        }
      );
    });
  };

  setLocationByIp = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/iplocation`)
        .then(res => {
          const locationData = {
            lat: res.data.latitude,
            lon: res.data.longitude,
            name: res.data.city,
            country: res.data.country_name
          };

          this.setLocationData(locationData);
          resolve(locationData);
        })
        .catch(err => {
          resolve(this.setUnknownLocation());
        });
    });
  };

  setUnknownLocation = () => {
    const locationData = {
      lat: 0,
      lon: 0,
      name: ""
    };

    return new Promise((resolve, reject) => {
      resolve(locationData);
    });
  };
}

export default UserLocator;
