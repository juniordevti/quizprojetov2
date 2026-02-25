const titulo = document.querySelector(".titulo");
      const texto = titulo.textContent;
      titulo.textContent = "";
      let i = 0;
      const digita = setInterval(() => {
        titulo.textContent += texto[i] || "";
        i++;
        if (i > texto.length) {
          clearInterval(digita);
          titulo.style.filter = "drop-shadow(0 8px 24px rgba(124,58,237,.28))";
        }
      }, 36);
      document
        .querySelectorAll("section,footer,header")
        .forEach((el) => el.classList.add("reveal"));
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("on");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
      const toggle = document.getElementById("toggleTema");
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
      });
      function ripple(e) {
        const b = e.currentTarget;
        const r = document.createElement("span");
        const rect = b.getBoundingClientRect();
        const s = Math.max(rect.width, rect.height);
        r.style.width = r.style.height = s + "px";
        r.style.position = "absolute";
        r.style.left = e.clientX - rect.left - s / 2 + "px";
        r.style.top = e.clientY - rect.top - s / 2 + "px";
        r.style.background =
          "radial-gradient(circle, rgba(255,255,255,.55) 0, rgba(255,255,255,0) 60%)";
        r.style.borderRadius = "50%";
        r.style.pointerEvents = "none";
        r.style.transform = "scale(.6)";
        r.style.opacity = "1";
        r.style.transition = "transform .35s ease, opacity .5s ease";
        b.style.overflow = "hidden";
        b.appendChild(r);
        requestAnimationFrame(() => {
          r.style.transform = "scale(2.2)";
          r.style.opacity = "0";
        });
        setTimeout(() => {
          r.remove();
        }, 500);
      }
      document
        .querySelectorAll("button")
        .forEach((b) => b.addEventListener("click", ripple, { passive: true }));
      const toast = document.createElement("div");
      toast.id = "toast";
      toast.textContent = "Feedback enviado";
      document.body.appendChild(toast);
      function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 1800);
      }
      function confete() {
        const c = document.createElement("canvas");
        c.className = "confete";
        document.body.appendChild(c);
        const ctx = c.getContext("2d");
        const d = () => {
          c.width = window.innerWidth;
          c.height = window.innerHeight;
        };
        d();
        const parts = [];
        for (let i = 0; i < 150; i++) {
          parts.push({
            x: Math.random() * c.width,
            y: -Math.random() * c.height,
            vy: 2 + Math.random() * 3,
            vx: -2 + Math.random() * 4,
            s: 4 + Math.random() * 6,
            c: ["#7c3aed", "#22d3ee", "#10b981", "#f59e0b", "#ef4444"][
              Math.floor(Math.random() * 5)
            ],
            a: Math.random() * 360,
          });
        }
        let t = 0;
        const step = () => {
          ctx.clearRect(0, 0, c.width, c.height);
          parts.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02;
            p.a += 2;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.a * Math.PI) / 180);
            ctx.fillStyle = p.c;
            ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
            ctx.restore();
          });
          t += 16;
          if (t < 1600) requestAnimationFrame(step);
          else c.remove();
        };
        window.addEventListener("resize", d);
        step();
      }
      document.getElementById("feedbackBtn").addEventListener("click", () => {
        showToast();
        confete();
      });