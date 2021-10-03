$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2500);
        }).always(function () {
            setTimeout(function () {
                $("#spiner").toggle();
            }, 500);
        });
}

function trocaFraseAleatoria(data) {
    $("#spiner").show();

    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spiner").toggle();
    var fraseID = $("#frase-id").val();
    console.log("ID da frase: " + fraseID);
    var dados = { id: fraseID };

    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2500);
        }).always(function () {
            $("#spiner").toggle();
        });

}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
    console.log(data);
}