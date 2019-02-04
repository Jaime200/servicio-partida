const socket = require('socket.io-client')('https://socket-partida-nomina.herokuapp.com');
const soap = require('soap');
const url = 'http://localhost:53732/wsSincronizador.asmx?wsdl';


var args = {
  lret : 0 , 
  sMensaje: '',
  partidassapenc: {},
  sNombreArchivo: '',
}
const getResp = (args,client)=> {
  return new Promise((resolve, reject)=>{
    client.vPartidas_Archivoconf(args, async function(err, result, ) {      
     return  resolve( result) // console.log(result); 
    });
  })
}

const getClient = (url,args ) => {
  return new Promise((resolve, reject )=>{
     soap.createClient(url, async (err, client)=>{
      //return console.log(client)
       await getResp(args,client).then(data=> resolve(data))
                                  .catch(err=> { return reject( err)})     
     
    })
  })
}


const getData = async (url,args)=>{
 return  await  getClient(url,args)
                      .then(data => { return  data})
                      .catch(err =>{  throw new Error (err) })
 // const s = await getResp(args,resp)
}


socket.on('connect', function(){});

socket.on('mensaje-nuevo', async (msg) =>{
     console.log(msg)   
   console.log('Iniciando peticion')
    await getData(url,args)
    .then(resp=>console.log(resp))
    .catch(err=>console.log(err))

    console.log('Terminando peticion')
  });
socket.on('event', function(data){});
socket.on('disconnect', function(){});