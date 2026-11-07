// Tarifas de envío de BiciFast. Es el único lugar donde se definen los montos:
// el carrito y la página de Envíos se arman a partir de esta tabla.
// Para cambiar un precio o mover un departamento de zona, edita solo este archivo.

const SHIPPING_LIMA = { label: "Lima Metropolitana y Callao", price: 20, days: "1-2 días hábiles" };

// Zonas ordenadas de menor a mayor distancia desde Lima. Envío por agencia de transporte.
const SHIPPING_ZONES = [
  { price: 30, days: "2-4 días hábiles", departments: ["Lima provincias (Huacho, Cañete, Huaral…)", "Ica", "Junín", "Pasco", "Huancavelica"] },
  { price: 40, days: "3-5 días hábiles", departments: ["Áncash", "Huánuco", "Ayacucho", "La Libertad"] },
  { price: 50, days: "4-6 días hábiles", departments: ["Lambayeque", "Cajamarca", "Piura", "Arequipa", "Apurímac", "Cusco", "Moquegua"] },
  { price: 60, days: "5-8 días hábiles", departments: ["Tumbes", "Tacna", "Puno", "San Martín", "Amazonas", "Ucayali"] },
  { price: 80, days: "7-12 días hábiles (lo coordinamos por WhatsApp)", departments: ["Loreto", "Madre de Dios"] },
];

// Devuelve { department, price, days } o null si el departamento no existe.
function getProvinceShipping(department) {
  for (const zone of SHIPPING_ZONES) {
    if (zone.departments.includes(department)) {
      return { department, price: zone.price, days: zone.days };
    }
  }
  return null;
}

// Todos los departamentos de provincia en orden alfabético, con su tarifa.
function getAllProvinceShipping() {
  return SHIPPING_ZONES.flatMap((zone) => zone.departments.map((d) => getProvinceShipping(d)))
    .sort((a, b) => a.department.localeCompare(b.department, "es"));
}

function getMinProvincePrice() {
  return Math.min(...SHIPPING_ZONES.map((zone) => zone.price));
}
