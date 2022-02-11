import React, { useState, useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVjYXNhbmdlbGlubyIsImEiOiJja3ppcDlmOG8wMmFkMm9xa2RnNHVqbGw0In0.DsyXRtX1sdB1LeTh0iKOCQ";

export default function useMap({ initialPoint }) {
  const mapRef = useRef();
  const map = useRef();
  const setRef = useCallback((node) => {
    mapRef.current = node;
  }, []);
  const markers = useRef({});
  const [coords, setCoords] = useState(initialPoint);

  const markerMovement = useRef(new Subject());
  const newMarker = useRef(new Subject());

  const addMarker = useCallback((ev) => {
    const { lng, lat } = ev.lngLat;
    const marker = new mapboxgl.Marker();
    marker.id = v4();
    marker.setLngLat([lng, lat]).addTo(map.current).setDraggable(true);
    markers.current[marker.id] = marker;

    newMarker.current.next(marker);

    marker.on("dragend", (ev) => {
      const { id } = ev.target;
      const { lng, lat } = ev.target.getLngLat();
      markerMovement.current.next({ id, lng, lat });
    });
  }, []);

  useEffect(() => {
    const mapbox = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });
    map.current = mapbox;
  }, [initialPoint]);

  useEffect(() => {
    map.current?.on("move", () => {
      const { lng, lat } = map.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2),
      });
    });
  }, []);

  useEffect(() => {
    map.current?.on("click", addMarker);
  }, [addMarker]);

  return {
    addMarker,
    setRef,
    newMarker$: newMarker.current,
    markerMovement$: markerMovement.current,
    coords,
    markers,
  };
}
