// FUNCIONES MAYORES

const arrayOriginal = [1, 2, 3, 4, 5, 6]

// MAP -> hacer algún tipo de operación sobre todos los elementos del original

    // Devolverá otro array con tantos elementos como tenga el original.
    // arrayInicial.map(item_que_devuelve => acción)
    const arrayMap = arrayOriginal.map(numero => numero * 2)
    console.log(arrayMap);

// FILTER 

    // Filtra según una condición
    // Devuelve otro array con los elementos filtrados
    // arrayInicial.filter(item_que_devuelve => condición)
    const arrayFilter = arrayOriginal.filter(numero => numero%2 == 0)
    console.log(arrayFilter);

// REDUCE
    // -> devuelve el resultado de una operación aplicada a todos los valores del array original
    // arrayInicial. reduce((acumulador, item ) => operacion a realizar )
    const resultado = arrayOriginal.reduce((acumulador, numero) => acumulador + numero)
    console.log(resultado);