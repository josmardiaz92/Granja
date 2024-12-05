const contenedorApp=document.getElementById('body');

const animales=[
    {
        tipo: 'vaca',
        peso: '80 kg',
        edad: '5 años'
    },
    {
        tipo: 'perro',
        peso: '10 kg',
        edad: '3 años'
    },
    {
        tipo: 'gato',
        peso: '5 kg',
        edad: '2 años'
    }
]

function mostrarInicio(){
    contenedorApp.innerHTML='';
    const contenedorAnimales=document.createElement('div');
    contenedorAnimales.classList.add('row');
    contenedorAnimales.innerHTML=`
        <div class="col-12">
            <h1>Animales</h1>
        </div>
        <div class="col-12 d-flex justify-content-center">
        <table id="tablaAnimales">
            <tr>
                <th>Tipo</th>
                <th>Edad (años)</th>
                <th>Peso (kg)</th>
            </tr>
        </table>
    `;
    contenedorApp.appendChild(contenedorAnimales);
    const tablaAnimales=document.getElementById('tablaAnimales');
    animales.forEach(animal=>{
        tablaAnimales.innerHTML+=`
            <tr>
                <td>${animal.tipo}</td>
                <td>${animal.edad}</td>
                <td>${animal.peso}</td>
            </tr>
        `
    })
};

mostrarInicio();