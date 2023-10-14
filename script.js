document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript aquí
    const colorPicker = document.getElementById('colorPicker');
    const colorCode = document.getElementById('colorCode');
    const validacion = document.getElementById('validacion');

    colorPicker.addEventListener('input', function() {
        const selectedColor = colorPicker.value;

        // Convierte el valor hexadecimal en valores RGB
        const red = parseInt(selectedColor.substring(1, 3), 16);
        const green = parseInt(selectedColor.substring(3, 5), 16);
        const blue = parseInt(selectedColor.substring(5, 7), 16);
    
        // Actualiza el cuadro de texto con los valores RGB
        colorCode.value = `R:${red}, G:${green} B:${blue}`;
    });

    validacion.addEventListener('click', validacionClaroOscuro);

});

function obtenerColor(){
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker.value;
    const red = parseInt(selectedColor.substring(1, 3), 16);
    const green = parseInt(selectedColor.substring(3, 5), 16);
    const blue = parseInt(selectedColor.substring(5, 7), 16);
    return [red,blue,green];
}

function validacionClaroOscuro(){
    var datos;
    const redNeuronal = new brain.NeuralNetwork();
    const colores = obtenerColor(document.getElementById('colorPicker'));

    // Carga el archivo JSON
    fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        datos = data;
        redNeuronal.train(datos);
        let resultado = brain.likely({
            "R":colores[0]/255,
            "G":colores[1]/255,
            "B":colores[2]/255
        }, redNeuronal);
        alert(resultado);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
}