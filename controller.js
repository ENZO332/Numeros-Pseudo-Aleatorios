let generatedNumbers = [];

//pasar de un tab al otro
const openTab = (tabName, button) => {
    
    const tabs = document.getElementsByClassName('tab');
    const buttons = document.querySelectorAll('.tab-buttons button');

    // Ocultar todos los tabs
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Quitar clase 'active' de todos los botones
    buttons.forEach(btn => btn.classList.remove('active'));

    // Activar el tab correspondiente
    document.getElementById(tabName).classList.add('active');

    // Activar el botón correspondiente
    button.classList.add('active');
};

//generar numeros pseudo-aleatorios a partir de los input
const generateNumbers = () => {
    const method = document.getElementById("method").value;
    const seed = parseInt(document.getElementById("seed").value);
    const count = parseInt(document.getElementById("count").value);
    console.log("holi");
    if(!verifySeed(seed)){
        return;
    }

    if(!verifyCount(count)){
        return;
    }

    let results = [];
    
    switch (method) {
        case "middleSquare":
            results = middleSquareMethod(seed, count);
            break;
        case "lehmer":
            results = lehmerMethod(seed, count);
            break;
        case "mixedCongruential":
            results = mixedCongruentialMethod(seed, count);
            break;
        case "multiplicativeCongruential":
            results = multiplicativeCongruentialMethod(seed, count);
            break;
        case "additiveCongruential":
            results = additiveCongruentialMethod(seed, count);
            break;
        default:
            alert("Método no válido");
            return;
    }
    
    generatedNumbers = results.slice();
    displayGeneratedNumbers(results);
}

//mostrar numeros pseudo-aleatorios generados en la tabla
const displayGeneratedNumbers = (results) => {
    const tbody = document.getElementById("resultsBody");
    tbody.innerHTML = "";
    
    results.forEach((value, index) => {
        const row = document.createElement("tr");
        
        const iterationCell = document.createElement("td");
        iterationCell.textContent = index + 1;
        
        const valueCell = document.createElement("td");
        valueCell.textContent = value.toFixed(4);
        
        row.appendChild(iterationCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
}

const verifySeed = (seed) => {
    if(seed < 0) {
        alert("La semilla debe ser positiva.")
        return false;
    }

    if(isNaN(seed)) {
        alert("Semilla invalida: debe ser un numero.")
        return false;
    }

    return true;
}

const verifyCount = (count) => {
    if(count >= 100) {
        alert("La cantidad de numeros debe ser menor que 100.");
        return false;
    }

    if(count <= 0) {
        alert("La cantidad de numeros debe ser mayor que 0.");
        return false;
    }

    if(isNaN(count)) {
        alert("Cantidad invalida: debe ser un numero.");
        return false;
    }

    return true;

}

//que el textarea del tab "Pruebas Estadisticas" contenga los numeros pseudo-aleatorios generados en el otro tab
const useGeneratedNumbers = () => {
    if (generatedNumbers.length === 0) {
        alert("No hay números generados para usar.");
        return;
    }
    
    const numbersStr = generatedNumbers.map(num => num.toFixed(4)).join(", ");
    document.getElementById("numbersInput").value = numbersStr;
}

//limpiar textarea del tab "Pruebas Estadisticas"
const clearNumbers = () => {
    document.getElementById("numbersInput").value = "";
}

//correr la prueba seleccionada sobre los numeros ingresados y el alpha seleccionado
const runTest = () => {
    const numbers = parseInputNumbers();
    if (!numbers) return; //retorna si hubo un error
    
    const testMethod = document.getElementById("testMethod").value;
    const alpha = parseFloat(document.getElementById("alpha").value);
    
    let result;
    
    switch (testMethod) {
        case "mean":
            result = averagesTest(numbers, alpha);
            break;
        case "frequency":
            result = frequencyTest(numbers, alpha);
            break;
        case "series":
            result = seriesTest(numbers, alpha);
            break;
        case "ks":
            result = kolmogorovSmirnovTest(numbers, alpha);
            break;
        case "runs":
            result = runsAboveBelowMeanTest(numbers, alpha);
            break;
        default:
            alert("Prueba no válida");
            return;
    }
    
    displayTestResult(result); //despliega en pantalla el resultado de las prueba
}

//validar y convertir numeros del textarea
const parseInputNumbers = () => {}

//mostrar el resultado de la prueba seleccionada
function displayTestResult(result) {}