const MarkerList = require('./markerList');
class Sockets {

    constructor( io ) {

        this.io = io;

        this.markers = new MarkerList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            socket.emit( 'marcadores-activos' , this.markers.activos );

            socket.on( 'marcador-nuevo', ( marcador ) => {  // { id, lng, lat }
                this.markers.agregarMarcador( marcador );
                
                socket.broadcast.emit( 'marcador-nuevo', marcador )
            });

            socket.on( 'marcador-actualizado', (marcador) => {
                this.markers.actualizarMarcador( marcador );
                socket.broadcast.emit( 'marcador-actualizado', marcador );
            });
            
        
        });
    }


}


module.exports = Sockets;