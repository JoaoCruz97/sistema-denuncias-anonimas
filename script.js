let crimeAtual=""

const categorias={

seguranca:[
"Furto ou roubo",
"Tráfico de drogas",
"Violência doméstica",
"Atividade suspeita"
],

direitos:[
"Assédio moral",
"Discriminação",
"Bullying",
"Violação de direitos"
],

ambiente:[
"Maus-tratos a animais",
"Poluição",
"Desmatamento",
"Crime ambiental"
],

cidade:[
"Problemas em transporte",
"Infraestrutura urbana",
"Irregularidades públicas",
"Serviços deficientes"
]

}


function mostrarCrimes(cat){

document.getElementById("crimesArea").style.display="block"

let area=document.getElementById("crimes")

area.innerHTML=""

categorias[cat].forEach(crime=>{

let btn=document.createElement("button")

btn.innerText=crime

btn.onclick=()=>selecionarCrime(crime)

area.appendChild(btn)

})

}


function selecionarCrime(crime){

crimeAtual=crime

document.getElementById("formArea").style.display="block"

document.getElementById("crimeSelecionado").innerText=
"Tipo de denúncia: "+crime

}


function cancelar(){

document.getElementById("formArea").style.display="none"

}


function registrar(){

let numero=Math.floor(Math.random()*1000000)

localStorage.setItem(numero,"Recebida")

document.getElementById("protocolo").innerText=
"Denúncia registrada. Protocolo: "+numero

}


function consultar(){

let numero=document.getElementById("consultaProtocolo").value

let status=localStorage.getItem(numero)

if(status){

document.getElementById("status").innerText=
"Status da denúncia: "+status

}else{

document.getElementById("status").innerText=
"Protocolo não encontrado"

}

}
