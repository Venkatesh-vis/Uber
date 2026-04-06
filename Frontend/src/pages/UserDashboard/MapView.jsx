import { useEffect, useState } from "react";
import {MapContainer, TileLayer, Marker, Polyline, useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader.jsx";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function FitBounds({ route }) {
    const map = useMap();

    useEffect(() => {
        if (!route || route.length === 0) return;

        const bounds = L.latLngBounds(route);
        map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 1.5,
        });
    }, [route, map]);

    return null;
}


function Recenter({ center, shouldRecenter }) {
    const map = useMap();

    useEffect(() => {
        if (!center || !shouldRecenter) return;

        map.flyTo(center, map.getZoom(), { duration: 1.2 });
    }, [center, shouldRecenter, map]);

    return null;
}


const MapView = () => {
    const trip = useSelector(state => state.userRide);

    const [route, setRoute] = useState([]);
    const [animatedRoute, setAnimatedRoute] = useState([]);

    const pickup = trip.pickupCoords;
    const drop = trip.dropCoords;
    const userLocation = trip.userLocation;

    useEffect(() => {
        if (!pickup || !drop) {
            setRoute([]);
            setAnimatedRoute([]);
            return;
        }

        async function fetchRoute() {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${pickup[0]},${pickup[1]};${drop[0]},${drop[1]}?overview=full&geometries=geojson`;

                const res = await fetch(url);
                const data = await res.json();

                if (!data.routes?.length) return;

                const coordinates =
                    data.routes[0].geometry.coordinates
                        .map(([lng, lat]) => {
                            if (
                                typeof lat !== "number" ||
                                typeof lng !== "number" ||
                                isNaN(lat) ||
                                isNaN(lng)
                            ) return null;

                            return [lat, lng];
                        })
                        .filter(Boolean);

                setRoute(coordinates);
            } catch (err) {
                console.error("Route fetch failed:", err);
            }
        }

        fetchRoute();
    }, [pickup, drop]);


    useEffect(() => {
        if (!route.length) return;

        let index = 0;

        const interval = setInterval(() => {
            index += 8;

            if (index >= route.length) {
                setAnimatedRoute(route);
                clearInterval(interval);
                return;
            }

            setAnimatedRoute(route.slice(0, index));
        }, 16);

        return () => clearInterval(interval);
    }, [route]);


    const center = pickup ? [pickup[1], pickup[0]] : userLocation;


    if (!center) {
        return (
            <Loader/>
        );
    }


    return (
        <MapContainer
            center={center}
            zoom={13}
            className="w-full h-full"
        >
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Recenter
                center={center}
                shouldRecenter={!!pickup}
            />

            <FitBounds route={route} />

            {userLocation && !pickup && (<Marker position={userLocation} />)}

            {pickup && (<Marker position={[pickup[1], pickup[0]]} />)}

            {drop && (<Marker position={[drop[1], drop[0]]} />)}

            {animatedRoute.length > 0 && (
                <Polyline
                    positions={animatedRoute}
                    pathOptions={{ color: "blue", weight: 6 }}
                />
            )}
        </MapContainer>
    );
};

export default MapView;