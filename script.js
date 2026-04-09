let ultimaDenuncia = null;

function registrar(){

const endereco=document.getElementById("endereco").value;
const bairro=document.getElementById("bairro").value;
const referencia=document.getElementById("referencia").value;
const descricao=document.getElementById("descricao").value;

const protocolo="DEN"+Math.floor(Math.random()*1000000);

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

ultimaDenuncia = denuncia;

const barra=document.getElementById("barraProtocolo");

barra.innerHTML="Protocolo gerado: "+protocolo;

barra.classList.remove("hidden");

document.getElementById("btnDownload").classList.remove("hidden");

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

"Protocolo consultado: "+dados.protocolo+" | Status: "+dados.status;

barra.classList.remove("hidden");

}
