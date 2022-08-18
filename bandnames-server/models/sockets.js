const BandList = require("./band-list");


class Sockets {

    constructor(io){
        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents(){

        this.io.on('connection', (socket) => { 

            console.log('Cliente conectado');

            socket.emit('current-bands', this.bandList.getBands());
        
            socket.on('votar-banda', ({id}) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('borrar-banda', ({id}) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('cambiar-nombre-banda', ({id, name}) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('nueva-banda', ({name}) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });
        
            //console.log('Dispositivo cliente conectado');
            //console.log(socket.id);
        
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al servidor',
            //     fecha: new Date(),
            // });
        
            // socket.on('mensaje-cliente', (data) => {
            //     console.log(data);
            // });
        
        
        
        });

    }

}

module.exports = Sockets;