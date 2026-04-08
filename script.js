let crimeSelecionado=""

const categorias={

seguranca:[
"Roubo",
"Furto",
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
"Infraestrutura urbana",
"Problemas de transporte",
"Serviços públicos"
]

}

function abrirCategoria(cat){

const crimesDiv=document.getElementById("crimes")

crimesDiv.innerHTML=""

categorias[cat].forEach(crime=>{

let btn=document.createElement("button")

btn.className="crime"

btn.innerText=crime

btn.onclick=()=>selecionarCrime(crime)

crimesDiv.appendChild(btn)

})

}

function selecionarCrime(crime){

crimeSelecionado=crime

document.getElementById("tituloCrime").innerText=
"Denúncia selecionada: "+crime

document.getElementById("formulario").style.display="block"

}

function cancelar(){

document.getElementById("formulario").style.display="none"

}

function registrar(){

let protocolo=Math.floor(Math.random()*1000000)

let bairro=document.getElementById("bairro").value
let rua=document.getElementById("rua").value
let referencia=document.getElementById("referencia").value
let descricao=document.getElementById("descricao").value

localStorage.setItem(protocolo,"Recebida")

document.getElementById("protocolo").innerText=
"Protocolo gerado: "+protocolo

gerarPDF(protocolo,bairro,rua,referencia,descricao)

}

function gerarPDF(protocolo,bairro,rua,referencia,descricao){

const { jsPDF } = window.jspdf

const doc=new jsPDF()

doc.setFontSize(18)
doc.text("COMPROVANTE DE DENÚNCIA",20,20)

doc.setFontSize(12)

doc.text("Protocolo: "+protocolo,20,40)

doc.text("Tipo de denúncia: "+crimeSelecionado,20,50)

doc.text("Bairro: "+bairro,20,60)

doc.text("Local: "+rua,20,70)

doc.text("Referência: "+referencia,20,80)

doc.text("Descrição:",20,100)

doc.text(descricao,20,110)

doc.text("Registro realizado com sucesso.",20,140)

doc.save("protocolo-"+protocolo+".pdf")

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
