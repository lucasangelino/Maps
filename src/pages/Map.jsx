import React, { useState, useEffect, useRef } from "react";

// css framework
import { Container, Row, Col, Collapse, Text } from "@nextui-org/react";
import useMap from "../components/hooks/useMap";

const initialPoint = {
  lng: -58.4764,
  lat: -34.5849,
  zoom: 13,
};

export default function Map() {
  const { coords, setRef, newMarker$, markerMovement$ } = useMap({
    initialPoint,
  });

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      console.log(marker);
    });
  }, [newMarker$]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      console.log("move", marker);
    });
  }, [markerMovement$]);

  return (
    <>
      <Collapse
        shadow
        title={
          <Text h4 color="white">
            Maps
          </Text>
        }
        subtitle={<Text color="white">Lista de Marcadores</Text>}
        css={{
          width: "400px",
          margin: "10px",
          background: "linear-gradient(to right, #9c27b0, #2196f3)",
          border: "none",
        }}
      >
        <Text>Marcadores</Text>
        <Text>Marcadores</Text>
        <Text>Marcadores</Text>
        <Text>Marcadores</Text>
      </Collapse>

      <Collapse
        shadow
        title={
          <Text h4 color="white">
            Lugares
          </Text>
        }
        subtitle={<Text color="white">Lugares destacados</Text>}
        css={{
          width: "400px",
          margin: "10px",
          background: "#111111",
          border: "none",
        }}
      >
        <Text>New York</Text>
        <Text>Las Vegas</Text>
        <Text>Rio de Janeiro</Text>
        <Text>Marcadores</Text>
      </Collapse>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
}
