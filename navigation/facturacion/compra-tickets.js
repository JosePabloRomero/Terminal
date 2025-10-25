// Lee los datos del querystring, pinta el resumen y simula la compra
(() => {
  "use strict";

  const qs = new URLSearchParams(location.search);
  const data = {
    empresa:  qs.get("empresa")  || "",
    tipo:     qs.get("tipo")     || "",
    origen:   qs.get("origen")   || "",
    destino:  qs.get("destino")  || "",
    horario:  qs.get("horario")  || "",
    fecha:    qs.get("fecha")    || "",
    costo:    Number(qs.get("costo") || 0),
    asientos: (qs.get("asientos") || "").split(",").filter(Boolean)
  };

  // Helpers
  const money = n => "$" + (Math.round(n) || 0).toLocaleString("es-CO");
  const tipoLabel = t => ({ TAXI:"Taxi", AEROVAN:"Aerovan", BUS_1PISO:"Bus (1 piso)", BUS_2PISOS:"Bus (2 pisos)" }[t] || t);
  const formatISOtoDMY = iso => { if (!iso) return "—"; const [y,m,d]=iso.split("-"); return `${d}/${m}/${y}`; };

  // Pinta resumen
  const show = (id, val) => document.getElementById(id).textContent = val || "—";
  show("s-empresa", data.empresa);
  show("s-tipo", tipoLabel(data.tipo));
  show("s-origen", data.origen);
  show("s-destino", data.destino);
  show("s-fecha", formatISOtoDMY(data.fecha));
  show("s-horario", data.horario);
  show("s-asientos", data.asientos.length ? data.asientos.join(", ") : "—");

  const total = data.costo * (data.asientos.length || 0);
  show("s-total", money(total));

  // Si vino sin datos (acceso desde barra de navegación)
  const missing = !data.empresa || !data.origen || !data.destino || !data.fecha;
  if (missing) document.getElementById("s-aviso").style.display = "block";

  // Simulación de pago
  const form = document.getElementById("purchase-form");
  const ok = document.getElementById("ok");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ok.style.display = "block";
    ok.scrollIntoView({behavior:"smooth", block:"center"});
  });
})();
