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

const areaCrimes=document.getElementById("crimes")
const crimesArea=document.getElementById("crimesArea")

areaCrimes.innerHTML=""

categorias[cat].forEach(crime=>{

const btn=document.createElement("button")

btn.textContent=crime

btn.onclick=()=>selecionarCrime(crime)

areaCrimes.appendChild(btn)

})

crimesArea.classList.remove("hidden")

}


function selecionarCrime(crime){

crimeAtual=crime

document.getElementById("crimeSelecionado").textContent=
"Tipo de denúncia: "+crime

document.getElementById("formArea").classList.remove("hidden")

}


function cancelar(){

document.getElementById("formArea").classList.add("hidden")

}


function registrar(){

let numero=Math.floor(Math.random()*1000000)

localStorage.setItem(numero,"Recebida")

document.getElementById("protocolo").textContent=
"Denúncia registrada. Protocolo: "+numero

}


function consultar(){

let numero=document.getElementById("consultaProtocolo").value

let status=localStorage.getItem(numero)

if(status){

document.getElementById("status").textContent=
"Status da denúncia: "+status

}else{

document.getElementById("status").textContent=
"Protocolo não encontrado"

}

}
