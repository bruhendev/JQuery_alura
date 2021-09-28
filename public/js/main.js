var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");

campo.on("input", function(){
    var conteudo = campo.val();
    var contCaracteres = conteudo.length;
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-caracteres").text(contCaracteres);
    $("#contador-palavras").text(qtdPalavras);
});

var tempoRestante = $("#tempo-digitacao").text();
campo.one("click", function(){
    var cronometroId = setInterval(function(){
        tempoRestante--
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1){
            campo.attr("disabled", true);
            clearInterval(cronometroId);
        }
    }, 1000);
});

