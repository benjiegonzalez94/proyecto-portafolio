/**
 * animations.js — Aparición de elementos al hacer scroll.
 *
 * Se carga como archivo estático desde /scripts/animations.js (no se empaqueta
 * con el resto del sitio) para que solo se ejecute en el navegador.
 *
 * Busca todos los elementos con el atributo `data-reveal` y les añade la clase
 * `.is-visible` cuando entran en pantalla. La animación vive en global.css.
 *
 * Detalles importantes:
 *  · Usa IntersectionObserver: es eficiente y no bloquea el hilo principal.
 *  · Si el sistema pide menos movimiento, se muestra todo de inmediato.
 *  · Si el navegador es antiguo, todo se muestra sin animación: nunca se oculta
 *    contenido por culpa de un efecto.
 */

(function () {
  'use strict';

  function init() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (targets.length === 0) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sin IntersectionObserver o con movimiento reducido: mostrar todo ya.
    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          // Una vez mostrado, dejamos de observarlo para ahorrar trabajo.
          observer.unobserve(entry.target);
        });
      },
      {
        // Se dispara un poco antes de que el elemento entre del todo.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    // Red de seguridad: si algo quedara oculto, se muestra al cabo de 3 segundos.
    window.setTimeout(function () {
      targets.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
