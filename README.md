**GENERÁTOR FRAKTÁLŮ MANDELBROTOVY MNOŽINY A JULIOVY MNOŽINY**

Tento projekt je webová aplikace umožňující vizualizaci a zkoumání fraktálů, konkrétně Mandelbrotovy množiny a Juliovy množiny. Aplikace má backend v Pythonu pomocí Flask a frontend je implementován pomocí JavaScript frameworku React.

**Jak Spustit Aplikaci**

**Předpoklady**

Než začnete, ujistěte se, že máte nainstalováno následující:

- Python 3.6 a větší
- Node.js (a npm)

**Instalace a spuštění backendu**

1. Po naklonování repozitáře přejděte do složky backend: cd backend
2. Nainstalujte Python knihovny: pip install -r requirements.txt
3. Spusťte Flask server: py app.py

**Instalace a spuštění frontendu**

1. Přesuňte se do adresáře frontend: cd ../frontend
2. Nainstalujte závislosti pomocí npm: npm install
3. Spusťte React aplikaci: npm start
4. React aplikace bude spuštěna na http://localhost:3000.

**Funkce**

Aplikace generuje a vykresluje Mandelbrotovu a Juliovu množinu. Do těchto fraktálů můžete přibližovat a zkoumat tak jejich detaily. Dále je možnost měnění různých parametrů generování, jako jsou exponent, barevné schéma a počet iterací. Mandelbrotova množina je silně provázaná s Juliovou, a tak je zde možnost skrz výběr bodu v Mandelbortově generovat Juliovu množinu.

**Ovládání**

**Zoomování do fraktálu**

Kliknutím na fraktál můžete přiblížit danou oblast.

Tlačítkem "Odzoomovat" se vrátíte do startovní pozice a můžete fraktál zkoumat zase jinde.

**Výběr Juliovy množiny**

Kliknutím na tlačítko "Vybrat konstantu pro Juliovu množinu" můžete vybrat bod na Mandelbrotově množině. Po kliknutí na bod se vygeneruje odpovídající Juliova množina, kterou můžete dále zkoumat. 

Čím blíže okraji Mandelbrotovy množiny kliknete, tím zajímavější fraktál z Juliovy množiny bude.

Tlačítkem "Vrátit se zpět k Mandelbrotově množině" se můžete vrátit k vizualizaci Mandelbrotovy množiny.

**Úprava parametrů**

Můžete měnit exponent, barevné schéma a počet iterací pomocí posuvníků a rozbalovacích nabídek v pravém horním rohu aplikace.

Vyšší počet iterací vykresluje detailnější fraktál.
