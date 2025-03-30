const formSimples = document.querySelector("#data-simples");
const formDiferenca = document.querySelector("#diferenca");

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
    resultado.innerHTML = `<h3>Resultado:</h3><p>Unix: ${unix}</p><p>UTC: ${utc}</p>`;
  
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
    resultado.innerHTML = `<h3>Resultado:</h3><p>Data 1: ${data1UTC}</p><p>Data 2: ${data2UTC}</p><h5>Diferença:</h5><p>Dias: ${dias}</p><p>Horas: ${horas}</p><p>Minutos: ${minutos}</p><p>Segundos: ${segundos}</p>`;
});