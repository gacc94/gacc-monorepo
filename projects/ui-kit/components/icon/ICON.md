As a Senior Angular Architect, here is the detailed analysis and solution:

---

## **1. Investigation**

- **Contexto:** `<bcp-icon>` es un átomo esencial del Design System BCP, parte de `@bcp/stl-ui-components`, con integración Angular, BEM y accesibilidad AA.
- **Dependencias:** Angular 16+, SCSS/BEM, signals (si se requiere estado reactivo), `CUSTOM_ELEMENTS_SCHEMA`.
- **Riesgos:** Uso de nombres de íconos no documentados, omisión de accesibilidad, variantes incorrectas, tamaños no recomendados.
- **Convenciones:** Props en kebab-case, standalone, OnPush, signals para estado, BEM para estilos, interfaces tipadas.

---

## **2. Resolution**

- **Estrategia:** Tabular todas las props, atributos, eventos y detallar exhaustivamente los nombres de íconos disponibles, tipos/interfaces y recomendaciones de accesibilidad, alineando Angular, BEM y Design System BCP.

---

## **3. Detailed Solution**

### **A. Propiedades y atributos**

| Propiedad | Atributo | Tipo / Interface | Valor por Defecto | Descripción / Usabilidad | Accesibilidad / Recomendaciones |
| --- | --- | --- | --- | --- | --- |
| `name` | `name` | `string` | `undefined` | Nombre exacto del ícono (ver lista oficial abajo). | Usa solo nombres documentados. |
| `color` | `color` | `ColorToken` | `undefined` | Token de color para el ícono (ej: `primary-700`). | Usa tokens del Design System. |
| `size` | `size` | `number` | `undefined` | Tamaño del ícono (ej: 24). | Usa 16, 24, 32, 48 según jerarquía. |
| `sizeUnit` | `size-unit` | `string` | `'px'` | Unidad de medida (`px`, `em`, `rem`). | Prefiere `px` para consistencia visual. |
| `accessibleConfig` | -- | `AccessibleIcon` | `undefined` | Objeto de accesibilidad: `{ iconAccessibleName, iconAccessibleTitle }`. | Obligatorio para íconos sin texto. |
| `accessibleName` | `accessible-name` | `string` (DEPRECATED) | `undefined` | Nombre accesible (usar `accessibleConfig`). | No usar, reemplazar por `accessibleConfig`. |
| `accessibleTitle` | `accessible-title` | `string` (DEPRECATED) | `undefined` | Título accesible (usar `accessibleConfig`). | No usar, reemplazar por `accessibleConfig`. |

### Interface asociada

---

### **B. Eventos**

| Evento | Descripción / Usabilidad | Tipo | Recomendaciones Angular/BEM/DS BCP |
| --- | --- | --- | --- |
| `ctrlIconDidLoad` | Se emite al renderizar el ícono. | `CustomEvent<void>` | Útil para tracking o animaciones. |

---

### **C. Nombres exactos de íconos disponibles**

**Solo puedes usar los siguientes nombres exactos:**

*(Se listan agrupados por familia y variante, según la documentación oficial)*

<details> <summary><b>Ver lista completa de nombres de íconos</b></summary>

- agency-b, agency-l, agency-r
- airplane-b, airplane-l, airplane-r
- android-b
- angle-down-circle-b, angle-down-circle-r, angle-down-r, angle-drop-down-r
- angle-drop-left-r, angle-left-r
- angle-drop-right-r, angle-right-r
- angle-drop-up-down-r, arrow-up-down-r
- angle-drop-up-r, angle-up-r, arrow-up-r
- arrow-down-r, arrow-sort-down-r, arrow-to-bottom-r
- arrow-full-screen-r
- arrow-left-r, arrow-left-right-r
- arrow-right-r, arrow-sort-up-r, arrow-to-up-r
- atm-b, atm-l, atm-r
- atm-screen-b, atm-screen-l, atm-screen-r
- backspace-b, backspace-l, backspace-r
- badge-percent-b, badge-percent-l, badge-percent-r
- ban-r
- bank-b, bank-l, bank-r
- bell-b, bell-l, bell-r
- bill-b, bill-l, bill-r
- book-b, book-l, book-r
- box-b, box-l, box-r
- broom-b, broom-l, broom-r
- building-b, building-l, building-r
- calendar-b, calendar-l, calendar-r
- calendar-clock-b, calendar-clock-l, calendar-clock-r
- camera-b, camera-l, camera-r
- car-b, car-l, car-r
- card-approved-b, card-approved-l, card-approved-r
- card-change-b, card-change-l, card-change-r
- card-credit-b, card-credit-l, card-credit-r
- card-credit-digital-b, card-credit-digital-l, card-credit-digital-r
- card-denied-b, card-denied-l, card-denied-r
- card-gear-b, card-gear-l, card-gear-r
- card-less-b, card-less-l, card-less-r
- card-plus-b, card-plus-l, card-plus-r
- cards-b, cards-l, cards-r
- chart-bar-b, chart-bar-l, chart-bar-r
- chart-pie-b, chart-pie-l, chart-pie-r
- check-b, check-circle-b, check-circle-l, check-circle-r, check-r
- chicken-leg-b, chicken-leg-l, chicken-leg-r
- chronometer-b, chronometer-l, chronometer-r
- circle-connection-b, circle-connection-l, circle-connection-r
- clock-b, clock-l, clock-r
- close-b, close-circle-b, close-circle-l, close-circle-r, close-r
- clothe-hanger-l, clothe-hanger-r
- coffee-b, coffee-l, coffee-r
- compass-b, compass-l, compass-r
- copy-b, copy-l, copy-r
- desktop-b, desktop-l, desktop-r
- diamond-b, diamond-l, diamond-r
- digital-token-b, digital-token-l, digital-token-r
- document-approved-b, document-approved-l, document-approved-r
- document-b, document-l, document-r
- document-card-b, document-card-l, document-card-r
- document-denied-b, document-denied-l, document-denied-r
- document-less-b, document-less-l, document-less-r
- document-pencil-b, document-pencil-l, document-pencil-r
- document-plus-b, document-plus-l, document-plus-r
- documents-b, documents-l, documents-r
- edit-b, edit-l, edit-r
- excel-b, excel-l, excel-r
- exchange-r
- exclamation-triangle-b, exclamation-triangle-l, exclamation-triangle-r
- external-link-r
- eye-b, eye-l, eye-r
- eye-slash-b, eye-slash-l, eye-slash-r
- face-happy-b, face-happy-l, face-happy-r
- face-sad-b, face-sad-l, face-sad-r
- face-satisfied-b, face-satisfied-l, face-satisfied-r
- face-serious-b, face-serious-l, face-serious-r
- faceid-b, faceid-l, faceid-r
- face-angry-b, face-angry-l, face-angry-r
- factory-b, factory-l, factory-r
- faucet-b, faucet-l, faucet-r
- filter-b, filter-l, filter-r
- fingerprint-b, fingerprint-l, fingerprint-r
- flag-b, flag-l, flag-r
- folder-b, folder-l, folder-r
- fountain-pen-b, fountain-pen-l, fountain-pen-r
- funnel-b, funnel-l, funnel-r
- gas-pump-b, gas-pump-l, gas-pump-r
- gavel-b, gavel-l, gavel-r
- gear-b, gear-l, gear-r
- genre-l, genre-r
- grid-b, grid-l, grid-r
- hand-holding-b, hand-holding-l, hand-holding-r
- hand-like-b, hand-like-l, hand-like-r
- headphone-b, headphone-l, headphone-r
- heart-b, heart-l, heart-r
- heart-slash-b, heart-slash-l, heart-slash-r
- hourglass-b, hourglass-l, hourglass-r
- house-b, house-l, house-r
- idcard-b, idcard-l, idcard-r
- image-b, image-l, image-r
- info-b, info-l, info-r
- internet-connection-b, internet-connection-slash-b
- key-b, key-l, key-r
- label-b, label-l, label-r
- laptop-l, laptop-r
- light-b, light-l, light-r
- list-l, list-r
- lock-b, lock-l, lock-r, lock-open-b, lock-open-l, lock-open-r, lock-password-b, lock-password-l, lock-password-r, lock-open-password-b, lock-open-password-l, lock-open-password-r
- mail-b, mail-l, mail-r
- man-another-b, man-another-l, man-b, man-l, man-r, man-circle-b, man-circle-l, man-circle-r, man-group-b, man-group-l, man-group-r, man-plus-b, man-plus-l, man-plus-r
- map-marker-b, map-marker-l, map-marker-r
- medal-b, medal-l, medal-r
- medicine-cabinet-b, medicine-cabinet-l, medicine-cabinet-r
- megaphone-b, megaphone-l, megaphone-r
- menu-r
- message-b, message-l, message-r
- metric-down-r, metric-up-r
- microphone-b, microphone-l, microphone-r
- minus-circle-b, minus-circle-l, minus-circle-r, minus-r
- money-bag-dollar-b, money-bag-dollar-l, money-bag-dollar-r, money-bag-euro-b, money-bag-euro-l, money-bag-euro-r, money-bag-soles-b, money-bag-soles-l, money-bag-soles-r
- money-dollar-r, money-dollars-circle-b, money-dollars-exchange-l, money-dollars-exchange-r, money-euro-circle-b, money-euro-exchange-l, money-euro-exchange-r, money-euro-r, money-soles-circle-b, money-soles-exchange-l, money-soles-exchange-r, money-soles-r
- money-down-b, money-down-l, money-down-r, money-up-b, money-up-l, money-up-r, money-plus-b, money-plus-l, money-plus-r
- paper-plane-b, paper-plane-l, paper-plane-r
- paperclip-r
- pen-b, pen-l, pen-r
- percentage-down-b, percentage-down-l, percentage-down-r
- percentage-square-b, percentage-square-l, percentage-square-r
- percentage-up-b, percentage-up-l, percentage-up-r
- persons-b, persons-l, persons-r
- piggy-bank-b, piggy-bank-l, piggy-bank-r
- play-circle-b, play-circle-l, play-circle-r
- plus-circle-b, plus-circle-l, plus-circle-r, plus-r
- points-horiz-r, points-vert-r
- pos-b, pos-l, pos-r
- print-b, print-l, print-r
- qrcode-b, qrcode-l, qrcode-r
- question-circle-b, question-circle-l, question-circle-r
- redirection-b, redirection-l, redirection-r
- robot-b, robot-l, robot-r
- rotate-left-r, rotate-right-r
- safe-box-b, safe-box-l, safe-box-r
- search-b, search-r
- share-b, share-l, share-r, share-ios-r
- shield-b, shield-l, shield-r, shield-insurance-b, shield-insurance-l, shield-insurance-r
- shopping-bag-b, shopping-bag-l, shopping-bag-r
- shopping-car-b, shopping-car-l, shopping-car-r
- sign-in-r, sign-out-r
- smartphone-b, smartphone-l, smartphone-r, smartphone-call-b, smartphone-call-l, smartphone-call-r
- social-facebook-b, social-facebook-l, social-facebook-r, social-instagram-b, social-instagram-l, social-instagram-r, social-linkedin-b, social-linkedin-l, social-linkedin-r, social-twitter-b, social-twitter-l, social-twitter-r, social-youtube-b, social-youtube-l, social-youtube-r
- soup-b, soup-l, soup-r
- star-b, star-l, star-r
- store-b, store-l, store-r
- table-b, table-l, table-r
- tablet-b, tablet-l, tablet-r
- tag-b, tag-l, tag-r
- target-b, target-l, target-r
- telephone-b, telephone-l, telephone-r
- ticket-b, ticket-l, ticket-r
- token-b, token-l, token-r
- tool-b, tool-l, tool-r
- transaction-l, transaction-r
- trash-b, trash-l, trash-r
- trophy-b, trophy-l, trophy-r
- truck-b, truck-l, truck-r
- turn-r
- umbrella-b, umbrella-l, umbrella-r
- wallet-b, wallet-l, wallet-r
- water-drop-b, water-drop-l, water-drop-r
- website-approved-b, website-approved-l, website-approved-r
- website-b, website-l, website-r
- website-card-b, website-card-l, website-card-r
- website-denied-b, website-denied-l, website-denied-r
- website-less-b, website-less-l, website-less-r
- website-plus-b, website-plus-l, website-plus-r
- woman-b, woman-l, woman-r, woman-group-b, woman-group-l, woman-group-r
- world-b, world-l, world-r
- yape-link-b, yape-link-l, yape-link-r
- zoom-in-b, zoom-in-r
- zoom-out-b, zoom-out-r
- pdf-b, pdf-l, pdf-r
- store-clock-b, store-clock-l, store-clock-r
- percentage-b, percentage-l, percentage-r
- pin-b, pin-l, pin-r
- smartphone-incoming-call-b, smartphone-incoming-call-l, smartphone-incoming-call-r

</details>

> **Nota:** Si necesitas un ícono no listado, debes solicitarlo al equipo de Design System BCP.
> 

---

### **D. Usabilidad y buenas prácticas**

- **Angular:**
    - Usa `CUSTOM_ELEMENTS_SCHEMA` en el módulo.
    - Props en kebab-case en HTML.
    - Standalone, OnPush, signals si necesitas estado reactivo.
- **BEM:**
    - Personaliza estilos con clases BEM (`.bcp-icon--custom`).
    - No sobrescribas estilos nativos, usa modificadores.
- **Design System BCP:**
    - Usa solo nombres de íconos documentados.
    - REGULAR para íconos complementarios, BOLD para interactivos.
    - Tamaños recomendados: 16, 24, 32, 48 px.
    - Tokens de color del Design System.
- **Accesibilidad:**
    - Usa `accessibleConfig` para todos los íconos sin texto.
    - Provee `iconAccessibleName` y/o `iconAccessibleTitle` descriptivos.
    - No uses props `accessibleName` ni `accessibleTitle` (deprecated).
    - Testea con lectores de pantalla y teclado.

---

## **4. Final Steps**

- Integra `<bcp-icon>` en componentes standalone.
- Controla props con signals si es necesario.
- Configura accesibilidad según contexto.
- Personaliza estilos solo vía BEM en SCSS.
- Valida con herramientas de accesibilidad y pruebas manuales.

---

## **5. Summary**

- `<bcp-icon>` soporta solo los nombres exactos listados arriba.
- Cumple accesibilidad AA, integración Angular y BEM.
- Usa solo tokens y variantes oficiales.
- Mejora futura: automatizar generación de documentación y ejemplos de integración.

---

**Recomendaciones unit testing:**

- Aplica SOLID, KISS, DRY, YAGNI.
- Usa componentes pequeños y patrones de diseño.
- Máximo 4 dependencias externas por componente/servicio.
- TestBed solo si es indispensable.
