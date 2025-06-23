function verificarCEP() {
  let cep = document.getElementById("cep").value.replace(/\D/g, ""); // remove tudo que não for número
let inputCep = document.getElementById("cep");

  if (!/^\d{8}$/.test(cep)) {
    document.getElementById("resultado").innerText = "CEP inválido. Digite 8 números.";
    return;
     inputCep.classList.add("erro");
    return;
  } else {
    inputCep.classList.remove("erro");
  }
  
// ⏳ Mostra mensagem de carregamento antes da API responder
  document.getElementById("resultado").innerHTML = "🔄 Buscando informações do CEP...";

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        document.getElementById("resultado").innerText = "CEP não encontrado.";
      } else {
        let frete = Math.floor(Math.random() * 20) + 5; // frete de R$5 a R$25
        document.getElementById("resultado").innerHTML = `
          <p><strong>Rua:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
          <p><strong>Frete estimado:</strong> R$ ${frete},00</p>
        `;
      }
    })
    .catch(error => {
      document.getElementById("resultado").innerText = "Erro ao buscar o CEP.";
    });
}
function limparDados() {
  const inputCep = document.getElementById("cep");
  const resultado = document.getElementById("resultado");

  inputCep.value = "";
  inputCep.classList.remove("erro");
  resultado.innerHTML = "";
}
