const perguntas = [
  {
    p: "Quais violências se somam quando uma mulher negra é atacada na internet?",
    o: ["Racismo e misoginia", "Apenas discordância de opinião", "Só problemas técnicos da rede"],
    c: 0,
    e: "O ataque mistura preconceito racial e ódio contra mulheres. Esse cruzamento se chama interseccionalidade."
  },
  {
    p: "Racismo cometido em redes sociais é crime?",
    o: ["Não, porque é só internet", "Sim, e a pena pode ser maior quando ocorre pela internet", "Só se a pessoa ofendida for famosa"],
    c: 1,
    e: "A internet não muda a lei. A Lei 14.532/2023 prevê pena maior quando o crime é cometido pelas redes sociais."
  },
  {
    p: "Qual é a primeira atitude útil para quem sofreu um ataque racista online?",
    o: ["Apagar tudo para esquecer", "Guardar provas, como prints com data e link do perfil", "Responder com ofensas"],
    c: 1,
    e: "Prints com data, horário e link ajudam na denúncia e no processo."
  },
  {
    p: "Por que ocupar as redes com vozes de mulheres negras é considerado resistência?",
    o: ["Porque muda narrativas, combate estereótipos e inspira novas gerações", "Porque aumenta o número de seguidores", "Porque isso não tem efeito real"],
    c: 0,
    e: "A representatividade digital não é só estética: ela transforma a forma como as pessoas são vistas e abre caminhos."
  },
  {
    p: "Você viu um comentário racista numa publicação. O que fazer?",
    o: ["Compartilhar para mostrar como é horrível", "Ignorar, não é com você", "Denunciar na plataforma e apoiar quem foi atacada"],
    c: 2,
    e: "Compartilhar espalha o ódio. Denunciar e apoiar ajuda a proteger a vítima."
  }
];

const caixa = document.getElementById("quiz-caixa");
let atual = 0, acertos = 0;

function mostrar() {
  const q = perguntas[atual];
  caixa.innerHTML = "";

  const prog = document.createElement("div");
  prog.className = "progresso";
  prog.textContent = "Pergunta " + (atual + 1) + " de " + perguntas.length;

  const titulo = document.createElement("div");
  titulo.className = "pergunta";
  titulo.textContent = q.p;

  const lista = document.createElement("div");
  lista.className = "opcoes";

  const retorno = document.createElement("div");
  retorno.className = "retorno";

  const proxima = document.createElement("button");
  proxima.className = "btn cheio";
  proxima.type = "button";
  proxima.style.display = "none";
  proxima.textContent = atual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
  proxima.addEventListener("click", function () {
    atual++;
    if (atual < perguntas.length) { mostrar(); } else { final(); }
  });

  q.o.forEach(function (texto, i) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opcao";
    b.textContent = texto;
    b.addEventListener("click", function () {
      const botoes = lista.querySelectorAll("button");
      botoes.forEach(function (x, j) {
        x.disabled = true;
        if (j === q.c) x.classList.add("certa");
      });
      if (i === q.c) {
        acertos++;
        retorno.textContent = "Resposta certa! " + q.e;
      } else {
        b.classList.add("errada");
        retorno.textContent = "Não foi dessa vez. " + q.e;
      }
      proxima.style.display = "inline-block";
      proxima.focus();
    });
    lista.appendChild(b);
  });

  caixa.append(prog, titulo, lista, retorno, proxima);
}

function final() {
  caixa.innerHTML = "";
  const r = document.createElement("div");
  r.className = "resultado";
  r.textContent = "Você acertou " + acertos + " de " + perguntas.length + ".";

  const msg = document.createElement("p");
  msg.style.marginTop = "1rem";
  msg.textContent = acertos >= 4
    ? "Muito bem! Agora compartilhe o que aprendeu com outras pessoas."
    : "Releia as seções do site e tente de novo. Informação é o primeiro passo contra o racismo.";

  const again = document.createElement("button");
  again.className = "btn vazio";
  again.type = "button";
  again.textContent = "Refazer o quiz";
  again.addEventListener("click", function () { atual = 0; acertos = 0; mostrar(); });

  caixa.append(r, msg, again);
}

mostrar();
