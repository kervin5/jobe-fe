import axios from "axios";

class UserLocator {
  locationName = "Unavailable";

  constructor() {
    this.geoLocationIsVailable =
      typeof navigator !== "undefined" && "geolocation" in navigator;
  }

  getLocation = () => {
    return this.setLocationByIp();
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

  setLocationByGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          axios
            .get(`/location/${longitude},${latitude}`)
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
        .get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=1503b8dbdf444bb786093ea0bbbd39fb`
        )
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
          console.log("Geolocation Error");
          console.log(err);
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
