class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia')
        
        this._mensagemView = new MensagemView($('#mensagemView'));
        
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto')
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        
        this._limpaFormulario();   
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    importaNegociacoes(){

        let service = new NegociacaoService();

        service.obterNegociacoesDaSemana().then(negociacoes => {

            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
            });
            this._mensagem.texto = 'Negociação da semana obtida com sucesso';
        }).catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior().then(negociacoes => {

            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
            });
            this._mensagem.texto = 'Negociação da semana obtida com sucesso';
        }).catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada().then(negociacoes => {

            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
            });
            this._mensagem.texto = 'Negociação da semana obtida com sucesso';
        }).catch(erro => this._mensagem.texto = erro);
    }
}