
let dado = {
    valor: null,
    rolaOdado: function () {
        let dadoRolado = Math.floor(Math.random() * 6) + 1;
        this.valor = dadoRolado;
        porco.verificarDado();
        this.mudarOdado();
    },
    mudarOdado: function () {
        this.animarDado();
        document.querySelector(".img-dado").src = `img/${this.valor}.png`;
        setTimeout(this.desanimarDado, 1000);
    },
    animarDado: function () {
        document.querySelector(".img-dado").classList.add("shake");
    },
    desanimarDado: function () {
        document.querySelector(".img-dado").classList.remove("shake");
    }
}

let jogador = {
    nome: "jogador",
    pontosTemp: 0,
    pontosOfic: 0,
    pontosTemporarios: function () {
        this.pontosTemp += dado.valor;
        porco.imprimirPontosTemp();
    },
    resetarPontos: function () {
        this.pontosTemp = 0;
        porco.imprimirPontosTemp();
    },
    parar: function () {
        this.pontosOfic += this.pontosTemp;
        porco.imprimirPontosOfic();
        porco.tentativas();
        porco.numTentatias += 1;
        porco.imprimirTentativas();
        this.pontosTemp = 0;
        porco.imprimirPontosTemp();
        porco.perderVida();
    },
}

let porco = {
    numTentatias: 1,
    pontosHist: 0,
    vida: 0,
    pontosHistorico: function () {
        this.pontosHist = document.querySelector('#historico-pontos').innerText;
    },
    verificarDado: function () {
        if (dado.valor !== 1) {
            jogador.pontosTemporarios();
        } else {
            jogador.resetarPontos();
            this.tentativas();
            this.numTentatias += 1;
            porco.imprimirTentativas();
            porco.perderVida();
        }
    },
    tentativas: function () {
        if (this.numTentatias === 5) {
            this.gravarHistorico();
            jogador.pontosOfic = 0;
            this.imprimirPontosOfic();
            jogador.pontosTemp = 0;
            this.numTentatias = 0;
            porco.imprimirTentativas();
        }
    },
    gravarHistorico: function () {
        this.pontosHistorico();
        if (jogador.pontosOfic > this.pontosHist) {
            document.querySelector('#historico-pontos').textContent = jogador.pontosOfic;
        }
    },
    perderVida: function () {
        this.vida += 1;
        document.querySelector(`.img-porco${this.vida}`).src = "img/porco-vermelho.jpg";
        if (this.vida === 5) {
            this.vida = 0;
            this.resetarCor();
        };
    },
    resetarCor: function () {
        for (let i = 1; i <= 5; i++) {
            document.querySelector(`.img-porco${i}`).src = "img/porco.png";
        }
    },
    imprimirPontosTemp: function () {
        document.querySelector('#pontos-temprarios').textContent = jogador.pontosTemp;
    },
    imprimirPontosOfic: function () {
        document.querySelector('#pontos-oficiais').textContent = jogador.pontosOfic;
    },
    imprimirTentativas: function () {
        document.querySelector('#numero-tentativas').textContent = this.numTentatias;
    }
}