const categorias = {

seguranca:[
"Violência contra a mulher",
"Violência contra crianças",
"Violência contra idosos",
"Furto/Roubo",
"Drogas",
"Atividade suspeita"
],

direitos:[
"Assédio moral/sexual",
"Bullying/Cyberbullying",
"Discriminação",
"Direitos humanos",
"Denúncia institucional"
],

ambiente:[
"Maus-tratos a animais",
"Crimes ambientais",
"Perturbação do sossego",
"Situações de risco"
],

cidade:[
"Infraestrutura urbana",
"Serviços públicos",
"Transporte e trânsito",
"Irregularidades escolares"
]

};

let tipoSelecionado = "";

function abrirCategoria(cat){

const area = document.getElementById("subcategorias");

area.innerHTML="";

categorias[cat].forEach(crime=>{

const btn=document.createElement("button");

btn.className="subcrime";

btn.innerText=crime;

btn.onclick=()=>abrirFormulario(crime);

area.appendChild(btn);

});

}

function abrirFormulario(crime){

tipoSelecionado=crime;

document.getElementById("formulario").classList.remove("hidden");

}

function cancelar(){

document.getElementById("formulario").classList.add("hidden");

}

function gerarProtocolo(){

return "DEN"+Math.floor(Math.random()*1000000);

}

function registrar(){

const bairro=document.getElementById("bairro").value;

const rua=document.getElementById("rua").value;

const referencia=document.getElementById("referencia").value;

const descricao=document.getElementById("descricao").value;

const protocolo=gerarProtocolo();

const denuncia={

protocolo:protocolo,
tipo:tipoSelecionado,
bairro:bairro,
rua:rua,
referencia:referencia,
descricao:descricao,
status:"Denúncia recebida",
data:new Date().toLocaleString()

};

localStorage.setItem(protocolo,JSON.stringify(denuncia));

alert("Protocolo gerado: "+protocolo);

}

function consultar(){

const numero=document.getElementById("numeroProtocolo").value;

const dados=JSON.parse(localStorage.getItem(numero));

if(!dados){

alert("Protocolo não encontrado");

return;

}

document.getElementById("resultado").innerHTML=`

<h3>Resumo da denúncia</h3>

<p><b>Protocolo:</b> ${dados.protocolo}</p>

<p><b>Tipo:</b> ${dados.tipo}</p>

<p><b>Bairro:</b> ${dados.bairro}</p>

<p><b>Rua:</b> ${dados.rua}</p>

<p><b>Referência:</b> ${dados.referencia}</p>

<p><b>Descrição:</b> ${dados.descricao}</p>

<p class="status">Status atual: ${dados.status}</p>

<button onclick="baixar()">Baixar registro</button>

`;

}

function baixar(){

const area=document.getElementById("resultado");

html2canvas(area).then(canvas=>{

const link=document.createElement("a");

link.download="registro_denuncia.png";

link.href=canvas.toDataURL();

link.click();

});

}
