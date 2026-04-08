let crimeAtual=""

const categorias={

seguranca:[
"Furto",
"Roubo",
"Tráfico de drogas",
"Atividade suspeita"
],

direitos:[
"Assédio moral",
"Discriminação",
"Bullying"
],

ambiente:[
"Maus-tratos a animais",
"Poluição",
"Desmatamento"
],

cidade:[
"Problemas em transporte",
"Infraestrutura urbana",
"Serviços públicos"
]

}

function abrirCategoria(cat){

const container=document.getElementById("crimesContainer")

container.innerHTML=""

categorias[cat].forEach(crime=>{

let btn=document.createElement("button")

btn.className="crimeBtn"

btn.innerText=crime

btn.onclick=()=>selecionarCrime(crime)

container.appendChild(btn)

})

}

function selecionarCrime(crime){

crimeAtual=crime

document.getElementById("tipoCrime").innerText=
"Tipo de denúncia: "+crime

document.getElementById("formulario").style.display="block"

}

function cancelar(){

document.getElementById("formulario").style.display="none"

}

function registrar(){

let numero=Math.floor(Math.random()*1000000)

localStorage.setItem(numero,"Recebida")

document.getElementById("protocolo").innerText=
"Protocolo gerado: "+numero

}

function consultar(){

let numero=document.getElementById("consulta").value

let status=localStorage.getItem(numero)

if(status){

document.getElementById("status").innerText=
"Status: "+status

}else{

document.getElementById("status").innerText=
"Protocolo não encontrado"

}

}
