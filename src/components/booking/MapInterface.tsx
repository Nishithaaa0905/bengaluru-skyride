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
  onStartPointChange: (point: LatLng) => void;
  onEndPointChange: (point: LatLng) => void;
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

function MapClickHandler({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
}: MapInterfaceProps) {
  useMapEvents({
    click: (e) => {
      const point: LatLng = [e.latlng.lat, e.latlng.lng];
      if (!startPoint) {
        onStartPointChange(point);
      } else if (!endPoint) {
        onEndPointChange(point);
      } else {
        // Reset and start over
        onStartPointChange(point);
        onEndPointChange([0, 0]);
      }
    },
  });
  return null;
}

export function MapInterface({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
}: MapInterfaceProps) {
  // Bengaluru coordinates
  const defaultCenter: LatLngExpression = [12.9716, 77.5946];

  return (
    <Card className="overflow-hidden shadow-card">
      <div className="bg-gradient-hero p-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Select Your Route</h3>
            <p className="text-sm opacity-90">
              Click to set {!startPoint ? "pickup" : !endPoint ? "destination" : "new route"}
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
          />
          {startPoint && <Marker position={startPoint} icon={startIcon} />}
          {endPoint && endPoint[0] !== 0 && <Marker position={endPoint} icon={endIcon} />}
          {startPoint && endPoint && endPoint[0] !== 0 && (
            <Polyline
              positions={[startPoint, endPoint]}
              color="#3b82f6"
              weight={3}
              dashArray="10, 10"
            />
          )}
        </MapContainer>
      </div>
    </Card>
  );
}
