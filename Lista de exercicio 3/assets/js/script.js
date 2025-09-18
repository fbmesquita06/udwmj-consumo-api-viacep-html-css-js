document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const searchButton = document.getElementById('searchButton');
    const resultBox = document.getElementById('result');
    const messageBox = document.getElementById('message');

    const cepResult = document.getElementById('cepResult');
    const logradouroResult = document.getElementById('logradouroResult');
    const complementoResult = document.getElementById('complementoResult');
    const bairroResult = document.getElementById('BairroResult');
    const cidadeResult = document.getElementById('cidadeResult');
    const estadoResult = document.getElementById('estadoResult');

    function clearResults() {
        cepResult.textContent = '';
        logradouroResult.textContent = '';
        complementoResult.textContent = '';
        bairroResult.textContent = '';
        cidadeResult.textContent = '';
        estadoResult.textContent = '';
        resultBox.classList.add('hidden');
        messageBox.classList.add('hidden');
        messageBox.textContent = '';
        messageBox.classList.remove('error');
    }

    function showMessage(msg, isError = false) {
        messageBox.textContent = msg;
        messageBox.classList.remove('hidden');
        if (isError) {
            messageBox.classList.add('error');
        } else {
            messageBox.classList.remove('error');
        }
    }

    function displayResults(data) {
        cepResult.textContent = data.cep || '-';
        logradouroResult.textContent = data.logradouro || '-';
        complementoResult.textContent = data.complemento || '-';
        bairroResult.textContent = data.bairro || '-';
        cidadeResult.textContent = data.localidade || '-';
        estadoResult.textContent = data.uf || '-';
        resultBox.classList.remove('hidden');
    }

    async function searchCEP() {
        clearResults();

        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            showMessage('Por favor, digite um CEP válido (8 dígitos).', true);
            return;
        }

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar a API');
            }

            const data = await response.json();

            if (data.erro) {
                showMessage('CEP não encontrado!', true);
            } else {
                displayResults(data);
            }

        } catch (error) {
            showMessage('Ocorreu um erro ao buscar o CEP.', true);
        }
    }

    searchButton.addEventListener('click', searchCEP);

    cepInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchCEP();
        }
    });
});
