const contenedorApp=document.getElementById('body');
const head=document.getElementById('head');
const btnInicio=document.getElementById('btnInicio');
const btnAgregar=document.getElementById('btnAgregar');
const modalAnimales=document.getElementById('modalAnimales');
const instModalAnimales=new bootstrap.Modal(modalAnimales);
var pantalla='';
const animales=obtenerAnimales();

function obtenerAnimales(){
    const animalesGuardados=JSON.parse(localStorage.getItem('animales'));
    return animalesGuardados || []
}

const insumos=[
    {
        tipo: 'alimento de vaca',
        peso: 10,
        unidadMedida: 'kg',
        cantidad: 2
    },
    {
        tipo: 'gatarina',
        peso: 1,
        unidadMedida: 'kg',
        cantidad: 5
    },
    {
        tipo: 'alimento de perro',
        peso: 5,
        unidadMedida: 'kg',
        cantidad: 3
    }
];

function mostrarInicio(){
    pantalla='';
    head.classList.add('d-none');
    btnAgregar.classList.add('d-none');
    const resumenAnimales={};
    const resumenInsumos={};
    const resultadoAnimales=filtrar(animales,resumenAnimales);
    const resultadoInsumos=filtrar(insumos,resumenInsumos);


    contenedorApp.innerHTML=`
        <div class="row">
            <div class="col-12">
                <h1>Animales</h1>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <table class="text-center">
                    <tr>
                        <th>Animal</th>
                        <th>Cantidad</th>
                    </tr>
                    ${Object.entries(resultadoAnimales).map(([tipo, cantidad]) => `
                        <tr>
                            <td>${tipo}</td>
                            <td>${cantidad}</td>
                        </tr>
                    `).join('')}                    
                    
                    <tr>
                        <td colspan="3"><b>Total de animales:</b></td>
                        <td><b>${Object.values(resultadoAnimales).reduce((a, b) => a + b, 0)}</b></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>Insumos</h1>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <table class="text-center">
                    <tr>
                        <th>Insumo</th>
                        <th>peso unitario</th>
                        <th>peso total</th>
                    </tr>
                    ${insumos.map(insumo=>{
                        const pesoTotal=insumo.peso*insumo.cantidad;
                        return `
                            <tr>
                                <td>${insumo.tipo}</td>
                                <td>${insumo.peso} ${insumo.unidadMedida}</td>
                                <td>${pesoTotal} ${insumo.unidadMedida}</td>
                            </tr>`
                    }).join('')}
                    <tr>
                        <td colspan="3"><b>Total de Insumos:</b></td>
                        <td><b>${Object.values(resultadoInsumos).reduce((a, b) => a + b, 0)}</b></td>
                    </tr>
                </table>
            </div>
        </div>
    `
};

function filtrar(objeto,resultado){

    objeto.forEach(element => {
        if (resultado[element.tipo]) {
            resultado[element.tipo]++;
        } else {
            resultado[element.tipo] = 1;
        }
    });
    return resultado;
}

function mostrarDetalles(objeto){
    head.classList.remove('d-none');
    btnAgregar.classList.remove('d-none')    
    var contenido;
    pantalla=objeto;
    switch (objeto) {
        case 'animales':
            contenido=`
                <div class="row row-cols-3 g-1 mt-3">                    
                    ${animales.map((elemento,index)=>{
                        const edad=obtenerEdad(elemento.fechaNacimiento)
                        return `
                            <div class="col muestra">
                                <div class="card" data-bs-toggle="modal" data-bs-target="#modal">
                                    <img src="${elemento.imagen}" class="card-img-top p-2" alt="...">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${elemento.especie}</h5>
                                        <div class="card-text">
                                            <div>
                                                <span>${elemento.produccion}</span>
                                            </div>
                                            <div>
                                                <span>${elemento.peso} ${elemento.unidadMedida}</span>
                                                <span class="ms-2">${elemento.sexo==='hembra' ? `<i class="fa-solid fa-venus" style="color: #f07adb;"></i>` : `<i class="fa-solid fa-mars" style="color: #012f7e;"></i>`}
                                            </div>
                                            <div>
                                                <span>${edad.años !== 0 ? `${edad.años} Años` : `${edad.meses} Meses`}</span>
                                            </div>
                                            <div>
                                                <span><b>Lote: </b> ${elemento.lote}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    }).join('')}
                </div>
            `
            break;
        case 'insumos':
            contenido=`
                <div class="row row-cols-3 g-1 mt-3">                    
                    ${insumos.map(elemento=>
                        `
                            <div class="col muestra">
                                <div class="card" style="width: 18rem;">
                                    <img src="img/logo.png" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${elemento.tipo}</h5>
                                        <ul class="card-text">
                                            <li>${elemento.peso} ${elemento.unidadMedida}</li>
                                            <li>${elemento.cantidad}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `
                    ).join('')}
                </div>
            `
        break
        default:
            break;
    }
    contenedorApp.innerHTML=contenido;
}

function centrarBtn(){
    const ancho=btnInicio.parentNode.offsetWidth;
    btnInicio.style.left=(ancho/2)-(btnInicio.offsetWidth/2)+'px';
}

centrarBtn();
mostrarInicio();
window.addEventListener('resize',centrarBtn)

function agregar(objeto){
    switch (objeto) {
        case 'animales':
            let animal={
                especie:document.getElementById('especie').value,
                produccion:document.getElementById('produccion').value,
                peso:document.getElementById('peso').value,
                unidadMedida:'Kg',
                fechaNacimiento:document.getElementById('fecha').value,
                lote:document.getElementById('lote').value,
                sexo:document.getElementById('sexo').value,
                imagen:document.getElementById('foto').src
            }
        
            animales.push(animal);
            const animalesJSON=JSON.stringify(animales);
            localStorage.setItem('animales',animalesJSON);
        break;
    
        default:
            break;
    }
    instModalAnimales.hide();
    mostrarDetalles(objeto);
}

function obtenerEdad(fecha){
    const fechaNacimiento=new Date(fecha);
    const hoy=new Date();

    let edad=hoy.getFullYear()-fechaNacimiento.getFullYear();
    const meses=hoy.getMonth()-fechaNacimiento.getMonth();
    if(meses<0 || (meses==0 && hoy.getDate()<fechaNacimiento.getDate())){
        edad--;
    }
    return {años:edad, meses:meses};
}

function confirmar(){
    navigator.notification.confirm(
        'Elija una opción', //mensaje
            (boton)=>{tomarFoto(boton)}, //callback   
                'Atención', //titulo  
                ['Camara','Album'] //botones
            );
}

function tomarFoto(boton){
    var opcion;
    if(boton===1){
        opcion=Camera.PictureSourceType.CAMERA;
    }else if(boton===2){
        opcion=Camera.PictureSourceType.PHOTOLIBRARY;
    }
    var options={
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: opcion,
        correctOrientation: true,
        //saveToPhotoAlbum: true, // Guarda la foto en la galería del dispositivo
        encodingType: Camera.EncodingType.JPEG
    };

    navigator.camera.getPicture(onSuccess, onFail, options);

    function onSuccess(imageURI) {
        const win=(fileEntry)=>{
            const img=fileEntry.toURL();
            const img2=document.getElementById('foto');
            img2.src=img;
        };
        const fail=(error)=>{
            console.error('error al guardar foto ',error);
        }
        window.resolveLocalFileSystemURL(imageURI,win,fail);
    }

    function onFail(message){
        console.log('Error al tomar la foto: ' + message);
    }
}

function limpiarModalAnimales(){
    document.getElementById('especie').value='';
    document.getElementById('produccion').value='';
    document.getElementById('peso').value='';
    document.getElementById('fecha').value='';
    document.getElementById('lote').value='';
    document.getElementById('sexo').value='';
    document.getElementById('foto').sr='';
}

modalAnimales.addEventListener('hidden.bs.modal',limpiarModalAnimales)