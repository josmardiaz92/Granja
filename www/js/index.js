const contenedorApp=document.getElementById('body');

const animales=[
    {
        tipo: 'vaca',
        peso: 80,
        unidadMedida: 'kg',
        edad: 5,
        meses: 0
    },
    {
        tipo: 'perro',
        peso: 10,
        unidadMedida: 'kg',
        edad: 3,
        meses: 0
    },
    {
        tipo: 'gato',
        peso: 5,
        unidadMedida: 'kg',
        edad: 2,
        meses: 0
    },
    {
        tipo: 'vaca',
        peso: 70,
        unidadMedida: 'kg',
        edad: 4,
        meses: 0
    }
];
const insumos=[
    {
        tipo: 'alimento de vaca',
        peso: 10,
        unidadMedida: 'kg',
        cantidad: 2,
    },
    {
        tipo: 'gatarina',
        peso: 1,
        unidadMedida: 'kg',
        cantidad: 5,
    },
    {
        tipo: 'alimento de perro',
        peso: 5,
        unidadMedida: 'kg',
        cantidad: 3,
    }
];


function mostrarInicio(){
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
                    })}   
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

mostrarInicio();

