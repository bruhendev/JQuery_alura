var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var contCaracteres = conteudo.length;
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-caracteres").text(contCaracteres);
        $("#contador-palavras").text(qtdPalavras);
    });
}

function inicializaCronometro() {
    campo.one("click", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroId = setInterval(function () {
            tempoRestante--
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.addClass("campo-desativado");
    campo.attr("disabled", true);
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}