import {fromAddress, setDefaults} from "react-geocode";

export default async function getCoords(address) {
    setDefaults({
        key: "AIzaSyDsiA5juM_mFN2zVywsvZV-wqFqa4HfCRE", // Your API key here.
        language: "en", // Default language for responses.
        region: "ro", // Default region for responses.
    });

    let lat = 0;
    let lng = 0;

    await fromAddress(address)
        .then(({results}) => {
            lat = results[0].geometry.location.lat;
            lng = results[0].geometry.location.lng;
        })
    return {lat, lng}
}