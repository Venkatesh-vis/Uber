import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY } from "../../constants";

const DEFAULT_CENTER = { lat: 17.385044, lng: 78.486671 };

const MapView = ({ trip }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const directionsRenderer = useRef(null);
    const directionsService = useRef(null);


    useEffect(() => {
        let cancelled = false;

        async function initMap() {
            setOptions({
                apiKey: GOOGLE_MAPS_API_KEY,
                version: "weekly",
            });

            const { Map } = await importLibrary("maps");
            const { DirectionsRenderer, DirectionsService } =
                await importLibrary("routes");

            if (cancelled) return;

            map.current = new Map(mapRef.current, {
                center: DEFAULT_CENTER,
                zoom: 13,
                disableDefaultUI: true,
                zoomControl: true,
            });

            directionsRenderer.current = new DirectionsRenderer();
            directionsService.current = new DirectionsService();

            directionsRenderer.current.setMap(map.current);
        }

        initMap();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!trip.searched || !trip.pickup || !trip.drop) return;
        if (!directionsService.current) return;

        directionsService.current.route(
            {
                origin: trip.pickup,
                destination: trip.drop,
                travelMode: "DRIVING",
            },
            (result, status) => {
                if (status === "OK") {
                    directionsRenderer.current.setDirections(result);
                }
            }
        );
    }, [trip.searched, trip.pickup, trip.drop]);

    return <div ref={mapRef} className="w-full h-full" />;
};

export default MapView;
