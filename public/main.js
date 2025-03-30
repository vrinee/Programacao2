const formSimples = document.querySelector("#data-simples");
const formDiferenca = document.querySelector("#diferenca");
let numData = 0;
let numDiff = 0;

formSimples.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = formSimples.elements["data"].value;
    const fuso = formSimples.elements["fuso"].value;
    console.log(data);
    console.log(fuso);

 
    const response = await fetch(`api/${data}?utc=${fuso}`, { method: 'GET' });
    const responseJson = await response.json();
    console.log(responseJson); // Mostra a resposta no console
    const unix = responseJson.unix;
    const utc = responseJson.utc;
    const resultado = formSimples.querySelector("#result");
    numData++;
    resultado.innerHTML += `<tr><td>${numData}</td><td>${utc}</td><td>${unix}</td><td>${fuso}</td></tr>`;
  
});

formDiferenca.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data1 = formDiferenca.elements["data1"].value;
    const data2 = formDiferenca.elements["data2"].value;
    console.log(data1);
    console.log(data2);

    const response = await fetch(`api/diff/${data1}/${data2}`, { method: 'GET' });
    const responseJson = await response.json();
    console.log(responseJson);
    
    const data1UTC = responseJson.data1;
    const data2UTC = responseJson.data2;

    const dias = responseJson.diferenca.dias;
    const horas = responseJson.diferenca.horas;
    const minutos = responseJson.diferenca.minutos;
    const segundos = responseJson.diferenca.segundos;
    const resultado = formDiferenca.querySelector("#result");
    numDiff++;
    resultado.innerHTML += `<tr><td>${numDiff}</td><td>${data1UTC}</td><td>${data2UTC}</td><td>${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos</td></tr>`;
});