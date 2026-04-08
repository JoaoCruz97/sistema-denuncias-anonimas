function gerarProtocolo(){

const { jsPDF } = window.jspdf;

let numero = Math.floor(Math.random()*1000000);

let categoria = document.getElementById("categoria").value;
let bairro = document.getElementById("bairro").value;
let rua = document.getElementById("rua").value;
let referencia = document.getElementById("referencia").value;
let descricao = document.getElementById("descricao").value;

document.getElementById("protocolo").innerHTML =
"Denúncia registrada com sucesso. Protocolo: " + numero;

const doc = new jsPDF();

doc.setFontSize(16);
doc.text("Comprovante de Denúncia Anônima", 20, 20);

doc.setFontSize(12);
doc.text("Protocolo: " + numero, 20, 40);
doc.text("Categoria: " + categoria, 20, 50);
doc.text("Bairro: " + bairro, 20, 60);
doc.text("Rua: " + rua, 20, 70);
doc.text("Referência: " + referencia, 20, 80);

doc.text("Descrição:", 20, 100);
doc.text(descricao, 20, 110);

doc.save("protocolo-denuncia-" + numero + ".pdf");

}
