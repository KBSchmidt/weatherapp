import React, { useEffect, useState } from 'react'
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

export const LocationContext = React.createContext<GeoCoordinates | undefined>(undefined)

type PlatformTypes = "ios" | "android" | "windows" | "macos" | "web"
type PermissionResults = "unavailable" | "denied" | "blocked" | "granted" | undefined

const permissionReq = (platform: PlatformTypes) =>{
    if(platform ==='ios') {
        return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else if(platform === 'android') {
        return  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
}

const LocationProvider: React.FC = ({ children }) => {
    const [coords, setCoords] = useState<GeoCoordinates>()
    const [permissions, setPermissions] = useState<PermissionResults>()

    useEffect(() => {
        (async function () {
            const res = await permissionReq(Platform.OS)
            setPermissions(res)
        }())
    }, [permissions])

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCoords(position.coords)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000, useSignificantChanges: true, forceRequestLocation: true }
        );
    }, [permissions])

    return (
        <LocationContext.Provider value={coords}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider