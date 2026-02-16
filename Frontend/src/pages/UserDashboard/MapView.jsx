import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useSelector} from "react-redux";

const FALLBACK_CENTER = [17.385044, 78.486671];

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// 🔹 Auto-fit map to route bounds
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


const MapView = () => {
    const trip = useSelector(state => state.userRide);
    const [route, setRoute] = useState([]);
    const [animatedRoute, setAnimatedRoute] = useState([]);

    const pickup = trip.pickupCoords;
    const drop = trip.dropCoords;

    // 🔹 Fetch route
    useEffect(() => {
        if (!pickup || !drop) {
            setRoute([]);
            setAnimatedRoute([]);
            return;
        }

        async function fetchRoute() {
            const url = `https://router.project-osrm.org/route/v1/driving/${pickup[0]},${pickup[1]};${drop[0]},${drop[1]}?overview=full&geometries=geojson`;

            const res = await fetch(url);
            const data = await res.json();

            if (!data.routes?.length) return;

            const coordinates =
                data.routes[0].geometry.coordinates
                    .map(([lng, lat]) => {
                        if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) {
                            return null;
                        }

                        return [lat, lng];
                    })
                    .filter(Boolean);


            setRoute(coordinates);
        }

        fetchRoute();
    }, [pickup, drop]);

    // 🔹 Animate route drawing
    useEffect(() => {
        if (!route.length) return;

        let index = 0;

        const interval = setInterval(() => {
            index += 8; // controls animation speed

            if (index >= route.length) {
                setAnimatedRoute(route);
                clearInterval(interval);
                return;
            }

            setAnimatedRoute(route.slice(0, index));
        }, 16); // ~60fps

        return () => clearInterval(interval);
    }, [route]);


    const center =
        pickup
            ? [pickup[1], pickup[0]]
            : trip.userLocation || FALLBACK_CENTER;

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

            <FitBounds route={route} />

            {trip.userLocation && !pickup && (
                <Marker position={trip.userLocation} />
            )}

            {pickup && (
                <Marker position={[pickup[1], pickup[0]]} />
            )}

            {drop && (
                <Marker position={[drop[1], drop[0]]} />
            )}

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
