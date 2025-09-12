import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { iconMap } from "@config";

const MapWithMarker = ({ proveedor }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Crear el mapa solo la primera vez
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [0, 0], // inicializa en 0,0
        zoom: 13,
        zoomControl: false,
      });

      const myAPIKey = "a7104ef1a4314122976b32b3f589f44b";
      const isRetina = L.Browser.retina;

      const baseUrl =
        "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
      const retinaUrl =
        "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

      L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution:
          'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap contributors',
        apiKey: myAPIKey,
        maxZoom: 20,
      }).addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (!proveedor || proveedor.latitud == null || proveedor.longitud == null) return;

    const myAPIKey = "a7104ef1a4314122976b32b3f589f44b";

    // Crear el icono
    const markerIcon = L.icon({
      iconUrl: `https://api.geoapify.com/v2/icon/?type=awesome&color=%23FFFFFF&size=50&icon=${iconMap[proveedor.tipo]}&contentSize=19&contentColor=%23007BFF&noWhiteCircle&scaleFactor=2&apiKey=${myAPIKey}`,
      iconSize: [45, 66],
      iconAnchor: [22.5, 60],
      popupAnchor: [0, -62],
    });

    // Si el marcador ya existe, moverlo
    if (markerRef.current) {
      markerRef.current.setLatLng([proveedor.latitud, proveedor.longitud]);
    } else {

      markerRef.current = L.marker([proveedor.latitud, proveedor.longitud], {
        icon: markerIcon,
      })
        .addTo(mapInstance.current)
        .openPopup();
    }

    // Centrar el mapa en la nueva posición
    mapInstance.current.setView([proveedor.latitud, proveedor.longitud], 13);
  }, [proveedor]);

  return (
    <div
      ref={mapRef}
      id="map"
      className="rounded outline-none max-h-93 overflow-y-hidden z-10"
    />
  );
};

export default MapWithMarker;
