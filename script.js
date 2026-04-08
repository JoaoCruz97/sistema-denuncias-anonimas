let crimeAtual = ""

const categorias = {

seguranca:[
"Violência contra a mulher",
"Violência contra crianças",
"Furto/Roubo",
"Tráfico de drogas",
"Atividade suspeita"
],

direitos:[
"Assédio moral",
"Bullying",
"Discriminação",
"Violação de direitos humanos"
],

meio:[
"Maus-tratos a animais",
"Crime ambiental",
"Poluição",
"Situação de risco"
],

cidade:[
"Problemas em transporte",
"Infraestrutura urbana",
"Serviços públicos",
"Irregularidades escolares"
]

}

function mostrarCrimes(cat){

document.getElementById("listaCrimes").style.display="block"

let area = document.getElementById("crimes")

area.innerHTML=""

categorias[cat].forEach(crime=>{

let btn=document.createElement("button")

btn.innerText=crime

btn.onclick=()=>selecionarCrime(crime)

area.appendChild(btn)

})

}

function selecionarCrime(crime){

crimeAtual = crime

document.getElementById("formulario").style.display="block"

document.getElementById("crimeSelecionado").innerText=
"Tipo de ocorrência: "+crime

}

function cancelar(){

document.getElementById("formulario").style.display="none"

}

function registrar(){

const { jsPDF } = window.jspdf

let numero = Math.floor(Math.random()*1000000)

let bairro = document.getElementById("bairro").value
let rua = document.getElementById("rua").value
let referencia = document.getElementById("referencia").value
let descricao = document.getElementById("descricao").value

localStorage.setItem(numero,"Recebida")

document.getElementById("protocolo").innerText=
"Denúncia registrada. Protocolo: "+numero

const doc = new jsPDF()

doc.text("Comprovante de Denúncia",20,20)
doc.text("Protocolo: "+numero,20,40)
doc.text("Ocorrência: "+crimeAtual,20,50)
doc.text("Bairro: "+bairro,20,60)
doc.text("Rua: "+rua,20,70)
doc.text("Referência: "+referencia,20,80)

doc.text("Descrição:",20,100)
doc.text(descricao,20,110)

doc.save("protocolo-"+numero+".pdf")

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
