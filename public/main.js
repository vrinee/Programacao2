const formSimples = document.querySelector("#data-simples");//Pega o elemento do formulario de data simples
const formDiferenca = document.querySelector("#diferenca");//Pega o elemento do formulario de diferenca entre datas
let numData = 0;//indice do requerimento de data simples
let numDiff = 0;//indice do requerimento de diferenca entre datas

formSimples.addEventListener("submit", async (event) => { //Um observador sobre a o submit do formSimples
    event.preventDefault(); //funcao para o submit não recarregar a pagina
    const data = formSimples.elements["data"].value;
    const fuso = formSimples.elements["fuso"].value;//pega os valores do form
    console.log(data);
    console.log(fuso);//teste para ver se realmente conseguiu os valores

 
    const response = await fetch(`api/${data}?utc=${fuso}`, { method: 'GET' }); //faz a requissao para o servidor
    const responseJson = await response.json();// transforma a resposta em json(formato que já era na api)
    console.log(responseJson); // Mostra a resposta no console
    const unix = responseJson.unix;
    const utc = responseJson.utc;//separa os valores do json
    const resultado = formSimples.querySelector("#result");//pega o elemnto para os resultados
    numData++;//incrementa o indice
    resultado.innerHTML += `<tr><td>${numData}</td><td>${utc}</td><td>${unix}</td><td>${fuso}</td></tr>`;//adiciona os resultados na tabela
  
});

formDiferenca.addEventListener("submit", async (event) => { //Um observador sobre o submit do formDiferenca
    event.preventDefault();//prevene o recarregamento da pagina
    const data1 = formDiferenca.elements["data1"].value;
    const data2 = formDiferenca.elements["data2"].value;//pega os valores do forms
    console.log(data1);
    console.log(data2);//mostra no console para testar as variaveis

    const response = await fetch(`api/diff/${data1}/${data2}`, { method: 'GET' });//faz requerimento para o servidor
    const responseJson = await response.json();//transforma a resposta em json
    console.log(responseJson);//mostra no console para teste
    
    const data1UTC = responseJson.data1;
    const data2UTC = responseJson.data2;//pega os valores do json

    const dias = responseJson.diferenca.dias;
    const horas = responseJson.diferenca.horas;
    const minutos = responseJson.diferenca.minutos;
    const segundos = responseJson.diferenca.segundos;//pega os outros valores do json
    const resultado = formDiferenca.querySelector("#result");//encontra o elemento para os resultados
    numDiff++;//incrementa o indice
    resultado.innerHTML += `<tr><td>${numDiff}</td><td>${data1UTC}</td><td>${data2UTC}</td><td>${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos</td></tr>`;//adiciona os resultados na tabela
});