document.addEventListener("DOMContentLoaded", () => {
  // Título digitando
  const titulo = document.querySelector(".titulo");

  if (titulo) {
    const textoOriginal = titulo.textContent.trim();
    titulo.textContent = "";
    let i = 0;

    const digita = setInterval(() => {
      titulo.textContent += textoOriginal[i] || "";
      i++;

      if (i > textoOriginal.length) {
        clearInterval(digita);
        titulo.style.filter =
          "drop-shadow(0 10px 26px rgba(96, 165, 250, 0.22))";
      }
    }, 34);
  }

  // Reveal
  const elementos = document.querySelectorAll("section, footer, header");

  elementos.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Alternar tema
  const toggleTema = document.getElementById("toggleTema");

  if (toggleTema) {
    toggleTema.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // Ripple
  function ripple(e) {
    const botao = e.currentTarget;
    const circulo = document.createElement("span");
    const rect = botao.getBoundingClientRect();
    const tamanho = Math.max(rect.width, rect.height);

    circulo.style.width = `${tamanho}px`;
    circulo.style.height = `${tamanho}px`;
    circulo.style.position = "absolute";
    circulo.style.left = `${e.clientX - rect.left - tamanho / 2}px`;
    circulo.style.top = `${e.clientY - rect.top - tamanho / 2}px`;
    circulo.style.background =
      "radial-gradient(circle, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 65%)";
    circulo.style.borderRadius = "50%";
    circulo.style.pointerEvents = "none";
    circulo.style.transform = "scale(.5)";
    circulo.style.opacity = "1";
    circulo.style.transition = "transform .45s ease, opacity .55s ease";

    botao.style.overflow = "hidden";
    botao.appendChild(circulo);

    requestAnimationFrame(() => {
      circulo.style.transform = "scale(2.2)";
      circulo.style.opacity = "0";
    });

    setTimeout(() => {
      circulo.remove();
    }, 550);
  }

  document.querySelectorAll("button, .btn").forEach((botao) => {
    botao.addEventListener("click", ripple, { passive: true });
  });

  // Toast
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = "Feedback enviado com sucesso 🚀";
  document.body.appendChild(toast);

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }

  // Confete
  function confete() {
    const canvas = document.createElement("canvas");
    canvas.className = "confete";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const pecas = [];
    const cores = ["#7c3aed", "#22d3ee", "#10b981", "#f59e0b", "#ef4444"];

    for (let i = 0; i < 140; i++) {
      pecas.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 3,
        s: 5 + Math.random() * 7,
        c: cores[Math.floor(Math.random() * cores.length)],
        a: Math.random() * 360,
      });
    }

    let tempo = 0;

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pecas.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.018;
        p.a += 2;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.a * Math.PI) / 180);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        ctx.restore();
      });

      tempo += 16;

      if (tempo < 1700) {
        requestAnimationFrame(animar);
      } else {
        canvas.remove();
      }
    }

    window.addEventListener("resize", resizeCanvas);
    animar();
  }

  const feedbackBtn = document.getElementById("feedbackBtn");

  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      showToast();
      confete();
    });
  }
});
