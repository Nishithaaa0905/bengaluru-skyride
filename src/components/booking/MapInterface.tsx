import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

// Fix for default marker icons in react-leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

type LatLng = [number, number];

interface MapInterfaceProps {
  startPoint: LatLng | null;
  endPoint: LatLng | null;
  stops: LatLng[];
  onStartPointChange: (point: LatLng) => void;
  onEndPointChange: (point: LatLng) => void;
  onAddStop: (point: LatLng) => void;
}

const startIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: markerShadow,
});

const endIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: markerShadow,
});

const stopIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [20, 34],
  iconAnchor: [10, 34],
  shadowUrl: markerShadow,
  className: "hue-rotate-90",
});

function MapClickHandler({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
  onAddStop,
}: {
  startPoint: LatLng | null;
  endPoint: LatLng | null;
  onStartPointChange: (point: LatLng) => void;
  onEndPointChange: (point: LatLng) => void;
  onAddStop: (point: LatLng) => void;
}) {
  useMapEvents({
    click: (e) => {
      const point: LatLng = [e.latlng.lat, e.latlng.lng];
      if (!startPoint) {
        onStartPointChange(point);
      } else if (!endPoint) {
        onEndPointChange(point);
      } else {
        onAddStop(point);
      }
    },
  });
  return null;
}

export function MapInterface({
  startPoint,
  endPoint,
  stops,
  onStartPointChange,
  onEndPointChange,
  onAddStop,
}: MapInterfaceProps) {
  // Bengaluru coordinates
  const defaultCenter: LatLngExpression = [12.9716, 77.5946];

  const routePoints = [startPoint, ...stops, endPoint].filter(
    (p): p is LatLng => p !== null && p[0] !== 0
  );

  return (
    <Card className="overflow-hidden shadow-card">
      <div className="bg-gradient-hero p-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Select Your Route</h3>
            <p className="text-sm opacity-90">
              Click to set{" "}
              {!startPoint
                ? "pickup"
                : !endPoint
                ? "destination"
                : "an intermediate stop"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative h-[500px]">
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler
            startPoint={startPoint}
            endPoint={endPoint}
            onStartPointChange={onStartPointChange}
            onEndPointChange={onEndPointChange}
            onAddStop={onAddStop}
          />
          {startPoint ? <Marker position={startPoint} icon={startIcon} /> : null}
          {endPoint && endPoint[0] !== 0 ? (
            <Marker position={endPoint} icon={endIcon} />
          ) : null}
          {stops.map((stop, index) => (
            <Marker key={index} position={stop} icon={stopIcon} />
          ))}
          {routePoints.length > 1 ? (
            <Polyline
              positions={routePoints}
              color="#3b82f6"
              weight={3}
              dashArray="10, 10"
            />
          ) : null}
        </MapContainer>
      </div>
    </Card>
  );
}
