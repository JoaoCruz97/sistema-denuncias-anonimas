const categorias = {

seguranca:[
"Violência contra a mulher",
"Violência contra crianças",
"Violência contra idosos",
"Furto ou roubo",
"Drogas",
"Atividade suspeita"
],

direitos:[
"Assédio moral ou sexual",
"Bullying ou cyberbullying",
"Discriminação",
"Direitos humanos",
"Denúncia institucional"
],

ambiente:[
"Maus-tratos a animais",
"Crimes ambientais",
"Perturbação do sossego",
"Situação de risco"
],

cidade:[
"Problemas de infraestrutura",
"Serviços públicos",
"Transporte ou trânsito",
"Irregularidades escolares"
]

};

let tipoSelecionado="";
let ultimaDenuncia=null;

function abrirCategoria(cat){

const area=document.getElementById("subcategorias");

area.innerHTML="";

categorias[cat].forEach(crime=>{

const btn=document.createElement("button");

btn.className="subcrime";

btn.innerText=crime;

btn.onclick=()=>{

document.querySelectorAll(".subcrime")
.forEach(b=>b.classList.remove("ativo"));

btn.classList.add("ativo");

abrirFormulario(crime);

};

area.appendChild(btn);

});

}

function abrirFormulario(crime){

tipoSelecionado=crime;

document.getElementById("tituloCrime").innerText="Denúncia: "+crime;

document.getElementById("formulario")
.classList.remove("hidden");

}

function cancelar(){

document.getElementById("formulario")
.classList.add("hidden");

}

function gerarProtocolo(){

return "DEN"+Math.floor(Math.random()*1000000);

}

function registrar(){

const endereco=document.getElementById("endereco").value;

const bairro=document.getElementById("bairro").value;

const referencia=document.getElementById("referencia").value;

const descricao=document.getElementById("descricao").value;

const protocolo=gerarProtocolo();

const denuncia={

protocolo:protocolo,
tipo:tipoSelecionado,
endereco:endereco,
bairro:bairro,
referencia:referencia,
descricao:descricao,
status:"Denúncia recebida",
data:new Date().toLocaleString()

};

localStorage.setItem(protocolo,JSON.stringify(denuncia));

ultimaDenuncia=denuncia;

const barra=document.getElementById("barraProtocolo");

barra.innerHTML="Protocolo gerado: "+protocolo;

barra.classList.remove("hidden");

document.getElementById("btnDownload")
.classList.remove("hidden");

}

function baixarPDF(){

if(!ultimaDenuncia) return;

const { jsPDF } = window.jspdf;

const doc=new jsPDF();

doc.text("Sistema de Denúncias Anônimas",20,20);

doc.text("Protocolo: "+ultimaDenuncia.protocolo,20,40);

doc.text("Tipo: "+ultimaDenuncia.tipo,20,50);

doc.text("Endereço: "+ultimaDenuncia.endereco,20,60);

doc.text("Bairro: "+ultimaDenuncia.bairro,20,70);

doc.text("Referência: "+ultimaDenuncia.referencia,20,80);

doc.text("Descrição:",20,90);

doc.text(ultimaDenuncia.descricao,20,100);

doc.text("Status: "+ultimaDenuncia.status,20,120);

doc.save("denuncia_"+ultimaDenuncia.protocolo+".pdf");

}

function consultar(){

const numero=document.getElementById("numeroProtocolo").value;

const dados=JSON.parse(localStorage.getItem(numero));

if(!dados){

alert("Protocolo não encontrado");

return;

}

const barra=document.getElementById("barraConsulta");

barra.innerHTML=

"Protocolo consultado: "+dados.protocolo+
" | Status: "+dados.status;

barra.classList.remove("hidden");

}
