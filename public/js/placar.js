$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sicronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Bruno";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removerLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(600);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
        {
            scrollTop: posicaoPlacar
        }, 1000);
}

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");

    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removerLinha(event) {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(600);
    setTimeout(function () {
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle();
}

function sicronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function () {
        console.log("Salvou o placar no servidor");
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function (data) {
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removerLinha);
            $("tbody").append(linha);
        });
    })
}