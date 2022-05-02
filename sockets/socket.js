const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Breaking Benjamin' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del Silencio' ) );
bands.addBand( new Band( 'Metallica') );


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });

    // client.on('emitir-mensaje', (payload ) => {
    //     console.log('Mensaje', payload);
    //     //Emite a todos menos al que lo envia
    //     client.broadcast.emit('nuevo-mensaje', payload );
    // });


    client.on('vote-band', (payload ) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload ) => {
        console.log('Agregando banda', payload);
        const newband= new Band(payload.name);
        bands.addBand( newband );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload ) => {
        console.log('Delete banda', payload);
        const id= payload.id;
        bands.deleteBand( id );
        io.emit('active-bands', bands.getBands() );
    });


});
