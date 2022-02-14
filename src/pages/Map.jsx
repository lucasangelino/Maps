import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
// css framework
import { Collapse, Text } from "@nextui-org/react";
import useMap from "../components/hooks/useMap";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.8010,
  zoom: 13.5
}

export default function Map() {
  const { setRef, coords, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizarPosicion } = useMap( puntoInicial );
    const { socket } = useContext( SocketContext );

    // Escuchar los marcadores existentes
    useEffect(() => {
        socket.on( 'marcadores-activos', (marcadores) => {
            for( const key of Object.keys( marcadores ) ) {
                agregarMarcador( marcadores[key], key );
            }
        });
    }, [ socket, agregarMarcador ])

    // Nuevo marcador
    useEffect(() => {
        nuevoMarcador$.subscribe( marcador => {
            socket.emit( 'marcador-nuevo', marcador );
        });
    }, [nuevoMarcador$, socket]);

    // Movimiento de Marcador
    useEffect(() => {
        movimientoMarcador$.subscribe( marcador => {
            socket.emit( 'marcador-actualizado', marcador );
        });
    }, [socket, movimientoMarcador$]);

    // Mover marcador mediante sockets
    useEffect( () => {
        socket.on( 'marcador-actualizado', ( marcador) => {
            actualizarPosicion( marcador );
        })
    },[ socket, actualizarPosicion ])
    
    // Escuchar nuevos marcadores
    useEffect(() => {
        
        socket.on('marcador-nuevo', ( marcador ) => {
            agregarMarcador( marcador, marcador.id );
        });

    }, [socket, agregarMarcador])

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
      </Collapse>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
}
