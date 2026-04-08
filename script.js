const STORAGE_KEY = "sistema_denuncias_anonimas_registros_v1";

const STATUS_RECEBIDA = "Den\u00fancia recebida";
const STATUS_ANALISE = "Den\u00fancia em an\u00e1lise";
const STATUS_ENCAMINHADA = "Den\u00fancia encaminhada";

const CATEGORIES = {
  seguranca: {
    label: "Seguran\u00e7a e Viol\u00eancia",
    crimes: [
      "Viol\u00eancia contra a mulher",
      "Viol\u00eancia contra crian\u00e7as ou adolescentes",
      "Furto ou roubo",
      "Tr\u00e1fico de drogas",
      "Atividade suspeita"
    ]
  },
  direitos: {
    label: "Direitos e Conduta",
    crimes: [
      "Ass\u00e9dio moral",
      "Bullying",
      "Discrimina\u00e7\u00e3o",
      "Viola\u00e7\u00e3o de direitos humanos"
    ]
  },
  meioAmbiente: {
    label: "Meio Ambiente",
    crimes: [
      "Maus-tratos a animais",
      "Crime ambiental",
      "Polui\u00e7\u00e3o",
      "Situa\u00e7\u00e3o de risco ambiental"
    ]
  },
  cidade: {
    label: "Cidade e Servi\u00e7os P\u00fablicos",
    crimes: [
      "Problemas em transporte p\u00fablico",
      "Infraestrutura urbana",
      "Irregularidades em servi\u00e7os p\u00fablicos",
      "Irregularidades em escolas"
    ]
  }
};

const categoryButtons = document.querySelectorAll(".category-btn");
const crimesSection = document.getElementById("crimesSection");
const crimeButtonsContainer = document.getElementById("crimeButtons");
const selectedCategoryLabel = document.getElementById("selectedCategoryLabel");

const formSection = document.getElementById("formSection");
const denunciationForm = document.getElementById("denunciationForm");
const occurrenceTypeInput = document.getElementById("occurrenceType");
const cancelFormButton = document.getElementById("cancelForm");

const protocolResult = document.getElementById("protocolResult");
const consultaForm = document.getElementById("consultaForm");
const consultaProtocoloInput = document.getElementById("consultaProtocolo");
const consultaResultado = document.getElementById("consultaResultado");

let selectedCategoryKey = "";
let selectedCrime = "";

init();

function init() {
  setDefaultConsultMessage();
  bindCategoryButtons();
  bindFormActions();
}

function bindCategoryButtons() {
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryKey = button.dataset.category;
      activateCategory(categoryKey);
    });
  });
}

function activateCategory(categoryKey) {
  selectedCategoryKey = categoryKey;
  selectedCrime = "";
  formSection.classList.add("oculto");
  denunciationForm.reset();
  occurrenceTypeInput.value = "";
  protocolResult.classList.add("oculto");

  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === categoryKey);
  });

  const categoryData = CATEGORIES[categoryKey];
  selectedCategoryLabel.textContent = `Categoria selecionada: ${categoryData.label}`;
  renderCrimeButtons(categoryData.crimes);

  crimesSection.classList.remove("oculto");
  crimesSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCrimeButtons(crimes) {
  crimeButtonsContainer.innerHTML = "";

  crimes.forEach((crime) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "crime-btn";
    button.textContent = crime;
    button.addEventListener("click", () => selectCrime(button, crime));
    crimeButtonsContainer.appendChild(button);
  });
}

function selectCrime(button, crime) {
  selectedCrime = crime;
  occurrenceTypeInput.value = crime;

  const crimeButtons = document.querySelectorAll(".crime-btn");
  crimeButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");

  formSection.classList.remove("oculto");
  protocolResult.classList.add("oculto");
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindFormActions() {
  cancelFormButton.addEventListener("click", () => {
    clearRegistrationForm();
  });

  denunciationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    registerComplaint();
  });

  consultaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    lookupProtocol();
  });
}

function registerComplaint() {
  const formData = new FormData(denunciationForm);
  const bairro = safeTrim(formData.get("bairro"));
  const localAproximado = safeTrim(formData.get("localAproximado"));
  const referencia = safeTrim(formData.get("referencia"));
  const descricao = safeTrim(formData.get("descricao"));
  const anexos = Array.from(formData.getAll("anexos"))
    .filter((file) => file && file.name)
    .map((file) => file.name);

  if (!selectedCategoryKey || !selectedCrime) {
    alert("Selecione uma categoria e um tipo de ocorrencia antes de finalizar o registro.");
    return;
  }

  if (!bairro || !localAproximado || !descricao || descricao.length < 20) {
    alert("Preencha os campos obrigatorios. A descricao deve ter pelo menos 20 caracteres.");
    return;
  }

  const reports = loadReports();
  const protocol = generateProtocol(new Set(reports.map((item) => item.protocol)));

  const report = {
    protocol,
    category: CATEGORIES[selectedCategoryKey].label,
    occurrenceType: selectedCrime,
    bairro,
    localAproximado,
    referencia,
    descricao,
    anexos,
    createdAt: new Date().toISOString()
  };

  reports.push(report);
  saveReports(reports);

  showProtocolResult(report);
  generateReceiptPdf(report);
  clearRegistrationForm();
}

function clearRegistrationForm() {
  denunciationForm.reset();
  occurrenceTypeInput.value = "";
  selectedCrime = "";

  const crimeButtons = document.querySelectorAll(".crime-btn");
  crimeButtons.forEach((item) => item.classList.remove("active"));

  formSection.classList.add("oculto");
}

function showProtocolResult(report) {
  protocolResult.innerHTML = `
    <h3>Registro concluido com sucesso</h3>
    <p>Guarde o protocolo abaixo para acompanhar o andamento da den\u00fancia.</p>
    <p class="codigo-protocolo">${escapeHtml(report.protocol)}</p>
    <p>Status inicial: <strong>${STATUS_RECEBIDA}</strong></p>
  `;

  protocolResult.classList.remove("oculto");
  protocolResult.scrollIntoView({ behavior: "smooth", block: "center" });
}

function generateReceiptPdf(report) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    console.warn("jsPDF nao foi carregado. Registro salvo sem comprovante em PDF.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 15;
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Comprovante de Den\u00fancia", left, y);
  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const locationText = composeLocation(report);
  const metadataLines = [
    `N\u00famero do protocolo: ${report.protocol}`,
    `Tipo de ocorr\u00eancia: ${report.occurrenceType}`,
    `Local da ocorr\u00eancia: ${locationText}`,
    `Data de registro: ${new Date(report.createdAt).toLocaleString("pt-BR")}`
  ];

  metadataLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, 180);
    doc.text(wrapped, left, y);
    y += wrapped.length * 6;
  });

  y += 4;
  doc.setFont("helvetica", "bold");
  doc.text("Descricao da denuncia:", left, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  const descriptionLines = doc.splitTextToSize(report.descricao || "-", 180);
  doc.text(descriptionLines, left, y);
  y += descriptionLines.length * 6 + 3;

  if (report.anexos.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Arquivos anexados (nomes):", left, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    const attachmentText = report.anexos.join(", ");
    const attachmentLines = doc.splitTextToSize(attachmentText, 180);
    doc.text(attachmentLines, left, y);
  }

  doc.save(`comprovante-${report.protocol}.pdf`);
}

function lookupProtocol() {
  const searchedProtocol = safeTrim(consultaProtocoloInput.value).toUpperCase();
  if (!searchedProtocol) {
    showConsultMessage("Informe um protocolo para realizar a consulta.", "erro");
    return;
  }

  const reports = loadReports();
  const report = reports.find((item) => item.protocol.toUpperCase() === searchedProtocol);

  if (!report) {
    showConsultMessage("Protocolo nao encontrado. Verifique o numero informado.", "erro");
    return;
  }

  const currentStatus = getStatusByElapsedTime(report.createdAt);
  const local = composeLocation(report);

  showConsultMessage(
    `
      <div>
        <strong>Protocolo:</strong> ${escapeHtml(report.protocol)}<br>
        <strong>Status:</strong> ${escapeHtml(currentStatus)}<br>
        <strong>Tipo de ocorrencia:</strong> ${escapeHtml(report.occurrenceType)}<br>
        <strong>Local:</strong> ${escapeHtml(local)}
      </div>
    `,
    "sucesso"
  );
}

function getStatusByElapsedTime(createdAt) {
  const opened = new Date(createdAt).getTime();
  const elapsedHours = (Date.now() - opened) / (1000 * 60 * 60);

  if (elapsedHours >= 72) {
    return STATUS_ENCAMINHADA;
  }

  if (elapsedHours >= 24) {
    return STATUS_ANALISE;
  }

  return STATUS_RECEBIDA;
}

function setDefaultConsultMessage() {
  showConsultMessage(
    `Status possiveis: ${STATUS_RECEBIDA}, ${STATUS_ANALISE} ou ${STATUS_ENCAMINHADA}.`
  );
}

function showConsultMessage(message, type = "") {
  consultaResultado.className = "mensagem-consulta";
  if (type) {
    consultaResultado.classList.add(type);
  }
  consultaResultado.innerHTML = message;
}

function composeLocation(report) {
  const parts = [
    report.localAproximado || "-",
    report.bairro ? `Bairro: ${report.bairro}` : "",
    report.referencia ? `Refer\u00eancia: ${report.referencia}` : ""
  ].filter(Boolean);

  return parts.join(" | ");
}

function loadReports() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

function generateProtocol(existingProtocols) {
  let protocol = "";

  do {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    protocol = `DAN-${timestamp}-${randomSuffix}`;
  } while (existingProtocols.has(protocol));

  return protocol;
}

function safeTrim(value) {
  return (value || "").toString().trim();
}

function escapeHtml(value) {
  return (value ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
