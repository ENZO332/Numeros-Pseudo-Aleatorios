let generatedNumbers = [];

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