'use client'
import { BASE_URL } from "@/helpers/services/api";
import Fingerprint2 from 'fingerprintjs2';
import { usePathname } from "next/navigation";
import nookies from "nookies";
import { publicIpv4 } from "public-ip";
import { useEffect } from 'react';
import io from "socket.io-client";

const IncreaseVisitor = ({ data }: { data: any }) => {
    const pathname = usePathname()

    useEffect(() => {
        const socket = io(`${BASE_URL}`, {
            reconnectionDelay: 1000,
            reconnection: true,
            timeout: 20000,
        });

        socketIO(socket)

        return () => {
            socket.close();
        };
    }, [pathname]);

    const socketIO = async (socket: any) => {
        const visitorDetails = await getVisitorDetails();
        const { uniqueID } = nookies.get();
        let userUniqueID = uniqueID;

        if (!userUniqueID) {
            userUniqueID = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            nookies.set(null, 'uniqueID', userUniqueID, { path: '/' });
        }
        const stringWithBearer = data?.access_token || ""

        const token = stringWithBearer.replace("Bearer ", "");

        const dataToStore = { token, visitorDetails, userUniqueID };

        socket.emit('clientData', { clientId: socket.id, dataToStore, });

        socket.on('connect', async () => {
            console.log('Connected to the server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
            socket.emit('clientData', { clientId: socket.id, dataToStore });
        });

        socket.on('connect_error', (error: any) => {
            console.log('Connection error:', error);
        });
    }

    async function getVisitorDetails() {
        const details: any = {};

        details.url = pathname;
        // Browser Info
        details.userAgent = navigator.userAgent;

        // Platform
        details.platform = navigator.platform;


        try {
            const ip = await publicIpv4();
            details.ip = ip;
        } catch (error) {
            console.error('Error fetching public IP:', error);
            details.ip = null;
        }

        // Online status
        details.isOnline = navigator.onLine;

        // Fingerprint information
        const fingerprint = await getFingerprint();
        details.fingerprint = fingerprint;

        // Screen Info
        details.screenWidth = screen.width;
        details.screenHeight = screen.height;
        details.availWidth = screen.availWidth;
        details.availHeight = screen.availHeight;
        details.colorDepth = screen.colorDepth;

        // Language
        details.language = navigator.language || navigator.language;

        // Location
        if ("geolocation" in navigator) {
            try {
                const position: any = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const locationService = getLocation();
                details.location = await locationService.getLocations({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })

            } catch (error: any) {
                // details.geolocationError = error;
                details.location = {
                    display_name: '',
                    address: ''
                }

                if (error.code === error.PERMISSION_DENIED) {
                    const permission = await requestNotificationPermission();
                    if (permission === "granted") {
                        new Notification("Location Required", {
                            body: "Please allow location access for a better experience.",
                            icon: "/path-to-your-app-icon.png" // Optional
                        });
                    }
                }
            }
        } else {
            details.geolocationSupported = false;
            details.location = {
                display_name: '',
                address: ''
            }
        }


        return details;
    }

    const getLocation = () => {
        const locationCache: any = {};

        async function getLocations(obj: any) {
            const key = `${obj.latitude},${obj.longitude}`;


            if (locationCache[key]) {
                return locationCache[key];
            } else {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${obj.latitude}&lon=${obj.longitude}`);
                    if (response.ok) {
                        const data = await response.json();
                        locationCache[key] = data; // Cache the location data
                        return data;
                    } else {
                        return {
                            display_name: '',
                            address: ''
                        }
                    }
                } catch (error) {
                    return {
                        display_name: '',
                        address: ''
                    }
                }
            }
        }

        return {
            getLocations
        };
    }

    async function requestNotificationPermission() {
        const permission = await Notification.requestPermission();
        return permission;
    }

    function getFingerprint() {
        return new Promise((resolve) => {
            Fingerprint2.get((components) => {
                const values = components.map(component => component.value);
                const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
                resolve(fingerprint);
            });
        });
    }

    return (
        <>

        </>
    );
};

export default IncreaseVisitor;