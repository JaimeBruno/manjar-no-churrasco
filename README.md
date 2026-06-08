# Manjar no Churrasco — Restaurant Grill

Website demo para el restaurante Manjar no Churrasco, Luxembourg.

## Estructura del proyecto

```
manjar-no-churrasco/
├── index.html          ← Pagina principal
├── css/
│   └── style.css       ← Estilos (responsive incluido)
├── js/
│   └── main.js         ← Animaciones y logica
├── img/
│   └── tomahawk.png    ← Imagen hero
└── README.md
```

## Deploy en Vercel (paso a paso)

### 1. Crear repositorio en GitHub
- Ve a github.com y crea un nuevo repositorio (ej: `manjar-no-churrasco`)
- Sube todos los archivos del proyecto

### 2. Desde terminal (si tienes Git instalado)
```bash
cd manjar-no-churrasco
git init
git add .
git commit -m "Initial commit - Manjar no Churrasco website"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/manjar-no-churrasco.git
git push -u origin main
```

### 3. Conectar con Vercel
- Ve a vercel.com e inicia sesion con tu cuenta de GitHub
- Click en "Add New Project"
- Selecciona el repositorio `manjar-no-churrasco`
- Framework Preset: selecciona "Other"
- Click en "Deploy"

### 4. Listo
En 30 segundos tendras tu web en: `https://manjar-no-churrasco.vercel.app`

## Personalizar
- Reemplaza las imagenes placeholder en `img/` con fotos reales
- Edita los datos de contacto en `index.html`
- Para integrar reservas reales, conecta el formulario con Formspree, Google Sheets o Supabase
