// CONFIGURAÇÃO DO SEU SUPABASE
const SUPABASE_URL = "https://pkkchmzsmbztbsihlnlf.supabase.co";
// ATENÇÃO: Apague o texto abaixo e cole o seu código gigante do Supabase dentro das aspas
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBra2NobXpzbWJ6dGJzaWhsbmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MTcyMDEsImV4cCI6MjEwNjI5MzIwMX0.pNNbuOIXT8ZnNu3WqVcMhMrisjZKXs8F2VOJjD25cG8";

// Salva o rascunho no navegador do usuário
function salvarNoLocalStorage(dados) {
    localStorage.setItem('rascunho_contrato', JSON.stringify(dados));
}

// Carrega o rascunho ao abrir o site
function carregarDoLocalStorage() {
    const rascunho = localStorage.getItem('rascunho_contrato');
    if (rascunho) {
        const dados = JSON.parse(rascunho);
        if(document.getElementById('contratante')) document.getElementById('contratante').value = dados.contratante || '';
        if(document.getElementById('contrated')) document.getElementById('contrated').value = dados.contratado || '';
        if(document.getElementById('servico')) document.getElementById('servico').value = dados.servico || '';
        if(document.getElementById('valor')) document.getElementById('valor').value = dados.valor || '';
        
        if (typeof atualizarContrato === "function") {
            atualizarContrato();
        }
    }
}

// Envia os dados para a nuvem de forma direta
async function enviarParaOSupabase() {
    // Captura os dados atuais da tela
    const dados = {
        contratante: document.getElementById('contratante').value,
        contratado: document.getElementById('contrated').value,
        servico: document.getElementById('servico').value,
        valor: document.getElementById('valor').value
    };

    // Validação simples: não envia se os campos estiverem vazios
    if (!dados.contratante || !dados.contratado) {
        alert("Por favor, preencha pelo menos o nome do Cliente e da sua Empresa antes de salvar!");
        return;
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/contratos`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro na resposta do Supabase');
        }

        alert("🎉 SUCESSO! O contrato foi registrado na nuvem do Supabase!");
        window.print(); // Abre a tela de impressão após o sucesso
    } catch (error) {
        console.error(error);
        alert("❌ Erro ao salvar na nuvem. Verifique se colou a chave secreta corretamente no app.js.");
    }
}

// Captura a digitação em tempo real
function capturarEProcessarDados() {
    const dados = {
        contratante: document.getElementById('contratante').value,
        contratado: document.getElementById('contrated').value,
        servico: document.getElementById('servico').value,
        valor: document.getElementById('valor').value
    };
    salvarNoLocalStorage(dados);
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    carregarDoLocalStorage();
});
