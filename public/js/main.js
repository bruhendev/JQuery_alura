var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
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
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("click", function () {
        var cronometroId = setInterval(function () {
            tempoRestante--
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroId);
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}


