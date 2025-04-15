async function enviarPregunta() {
  const input = document.getElementById("inputText").value;
  const respuestaDiv = document.getElementById("respuesta");

  if (!input) {
    respuestaDiv.textContent = "❗Por favor escribe algo.";
    return;
  }

  const body = {
    contents: [{
      parts: [{ text: input }]
    }]
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No se obtuvo una respuesta.";
  respuestaDiv.textContent = respuesta;
}

function limpiar() {
  document.getElementById("inputText").value = "";
  document.getElementById("respuesta").textContent = "";
}

function copiarRespuesta() {
  const texto = document.getElementById("respuesta").textContent;
  navigator.clipboard.writeText(texto);
  alert("Respuesta copiada 📋");
}

function guardarRespuesta() {
  const blob = new Blob([document.getElementById("respuesta").textContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "respuesta-gemini.txt";
  link.click();

  function limpiar() {
    document.getElementById("inputText").value = "";
    document.getElementById("respuesta").textContent = "";
  }
  
  function copiarRespuesta() {
    const texto = document.getElementById("respuesta").textContent;
    navigator.clipboard.writeText(texto);
    alert("Respuesta copiada 📋");
  }
  
  function guardarRespuesta() {
    const blob = new Blob([document.getElementById("respuesta").textContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "respuesta-gemini.txt";
    link.click();
  }
}