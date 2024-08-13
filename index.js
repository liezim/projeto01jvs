document.addEventListener('DOMContentLoaded', () => {
    const formContato = document.getElementById('form-contato');
    const listaContatos = document.getElementById('lista-contatos');
    const telefoneInput = document.getElementById('telefone');
    let contatos = [];
    
    telefoneInput.addEventListener('input', function() {
        let telefone = telefoneInput.value.replace(/\D/g, '');
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); 
        telefoneInput.value = telefone;
    });

    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = telefoneInput.value;
        const email = document.getElementById('email').value;

        const contato = {
            id: Date.now(),
            nome,
            telefone,
            email
        };

        contatos.push(contato);
        exibirContatos();

        formContato.reset();
    });

    function exibirContatos() {
        listaContatos.innerHTML = '';
        contatos.forEach(contato => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>Nome:</strong> ${contato.nome}</span>
                <span><strong>Telefone:</strong> ${contato.telefone}</span>
                <span><strong>E-mail:</strong> ${contato.email}</span>
                <div class="actions">
                    <button class="edit" onclick="editarContato(${contato.id})">Editar</button>
                    <button onclick="excluirContato(${contato.id})">Excluir</button>
                </div>
            `;
            listaContatos.appendChild(li);
        });
    }

    window.excluirContato = function(id) {
        contatos = contatos.filter(contato => contato.id !== id);
        exibirContatos();
    }

    window.editarContato = function(id) {
        const contato = contatos.find(contato => contato.id === id);
        document.getElementById('nome').value = contato.nome;
        telefoneInput.value = contato.telefone;
        document.getElementById('email').value = contato.email;

        excluirContato(id); 
    }
});