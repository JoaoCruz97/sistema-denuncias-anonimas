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

let bairro=document.getElementById("bairro").value
let rua=document.getElementById("rua").value
let referencia=document.getElementById("referencia").value
let descricao=document.getElementById("descricao").value

localStorage.setItem(numero,"Recebida")

document.getElementById("protocolo").innerText=
"Protocolo gerado: "+numero

gerarPDF(numero,bairro,rua,referencia,descricao)

}

function gerarPDF(numero,bairro,rua,referencia,descricao){

const { jsPDF } = window.jspdf

const doc = new jsPDF()

doc.text("Comprovante de Denúncia",20,20)

doc.text("Protocolo: "+numero,20,40)

doc.text("Tipo de denúncia: "+crimeAtual,20,50)

doc.text("Bairro: "+bairro,20,60)

doc.text("Rua: "+rua,20,70)

doc.text("Referência: "+referencia,20,80)

doc.text("Descrição:",20,100)

doc.text(descricao,20,110)

doc.save("protocolo-"+numero+".pdf")

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
