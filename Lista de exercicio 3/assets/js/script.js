document.addEventListener('DOMContentLoaded', () => {
  const cepInput = document.getElementById('cepInput');
  const searchButton = document.getElementById('searchButton');
  const resultBox = document.getElementById('result'); const messageBox = document.getElementById
  ('message');

  
  ('cepResult');
  const logradouroResult = document.getElementById('logradouroResult');
  const complementoResult = document.getElementById('complementoResult');
  const bairroResult = document.getElementById('bairroResult');
  const localidadeResult = document.getElementById('localidadeResult');
  const ufResult = document.getElementById('ufResult');

  
  function clearResults() {
    cepResult.textContent = '';
    logradouroResult.textContent = '';
    complementoResult.textContent = '';
    bairroResult.textContent = '';
    localidadeResult.textContent = '';
    ufResult.textContent = '';
    resultBox.classList.add('oculto');
    messageBox.classList.add('oculto');
    mensagemBox.textContent = '';
    messageBox.classList.remove('erro');
  }

  
  function showMessage(msg, isError = false) {
    messageBox.textContent = msg;
    messageBox.classList.remove('oculto');
    if (isError) {
      messageBox.classList.add('erro');
    } else {
      messageBox.classList.remove('erro');
    }
  }

  
  assíncrono function searchCEP() {
    clearResults();
    const cep = cepInput.value.replace(/\D/g, ''); 

    if (cep.length !== 8) {
      showMessage('Por favor, digite um CEP válido com 8 dígitos.', true);
      retornar;
    }

    const url = ` https://viacep.com.br/ws/$ {cep}/json/`;

    tente {
      const resposta = aguarde busca (url);
      if (!response.ok) {
        throw new Error('Erro na requisição da API.');
      }
      const dados = aguardar resposta.json();

      if (data.erro) {
        showMessage('CEP não encontrado.',verdadeiro);
      } senão {
        displayResults(dados);
      }
    } catch (erro) {
      console.error('Erro:', erro);
      showMessage('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.', true);
    }
  }


  function displayResults(data) {
    cepResult.textContent = data.cep;
    logradouroResult.textContent = dados.logradouro;
    complementoResult.textContent = data.complemento;
    bairroResult.textContent = dados.bairro;
    localidadeResultado.textContent = data.localidade;
    ufResult.textContent = dados.uf;
    resultBox.classList.remove('oculto');
  }

  
  searchButton.addEventListener('click', searchCEP);

  
  cepInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchCEP();
    }
  });
});

