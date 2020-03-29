import React, { useEffect, useState } from 'react'
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

export const LocationContext = React.createContext<GeoCoordinates | undefined>(undefined)

const LocationProvider: React.FC = ({ children }) => {
    const [coords, setCoords] = useState<GeoCoordinates>()
    
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCoords(position.coords)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [])

    return (
        <LocationContext.Provider value={coords}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider