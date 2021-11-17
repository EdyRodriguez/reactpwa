const self = this;
self.addEventListener('fetch', event => {
/*
    const offlineResp = new Response(`
    
        Bienvenido a mi Página Web

        Disculpa, pero para usarla, necesitas internet
    
    `);
*/
    const offlineResp = new Response(`
    
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <title>Mi PWA</title>

     </head>
     <body class="container p-3">
    
     <h1>En el modo offline no se puede extraer informacion de la base de datos asi que no se muestran los registros uwu</h1>
     
    
      <div className="container mt-5">
        <h1>Tareas</h1>
        <hr />
        <div className="row aling-items-start">
          <div className="col-8">
            <h4 className="text-center">Actividades</h4>
            
              
                <table >
                  <thead>
                    <tr>
                      <th scope="col">Tarea</th>
                      <th scope="col">Descripción</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                   
                    
                        
                        
                      
                    
                  
                  </tbody>
                </table>
             
          </div>
          
        </div>
      </div>
    </>
     </body>
     </html>
     `, {
        headers: {
         'Content-Type':'text/html'
       }
 });


   


    const resp = fetch(event.request)
                    .catch( () => offlineResp );


    event.respondWith( resp  );

});