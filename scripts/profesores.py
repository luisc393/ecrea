"""Genera profesores/index.html y la franja de la portada a partir de datos/profesores.json.
Para añadir una foto: guárdala en assets/profesores/<slug>.jpg y pon "foto": "<slug>.jpg" en el JSON.
Uso: python3 scripts/profesores.py"""
import json, re, html, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
P = json.loads((R/'datos/profesores.json').read_text())
def apellido(n):
    parts = n.replace(' O.','').split()
    return parts[1] if len(parts) > 1 else parts[0]
def ini(n):
    w = [x for x in n.replace('.','').split() if x[0].isupper()]
    return (w[0][0] + (w[1][0] if len(w) > 1 else '')).upper()
def foto(p, pre):
    if p.get('foto'):
        return f'<img src="{pre}assets/profesores/{p["foto"]}" alt="{html.escape(p["nombre"])}" loading="lazy">'
    i = ini(p['nombre'])
    return f'<span class="ini" aria-hidden="true">{i[0]}<b>{i[1:]}</b></span>'
fund = [p for p in P if p['slug'] == 'vicencio-gonzalez']
resto = sorted([p for p in P if p['slug'] != 'vicencio-gonzalez'], key=lambda p: apellido(p['nombre']))
orden = fund + resto
cards = []
for k, p in enumerate(orden):
    cls = 'prof lead' if k == 0 else 'prof'
    role = 'Fundador y director' if k == 0 else html.escape(p['especialidad'])
    cards.append(f'''        <article class="{cls}" id="{p['slug']}">
          <div class="pic">{foto(p,'../')}</div>
          <div class="txt"><span class="label">{role}</span><h3>{html.escape(p['nombre'])}</h3><p>{html.escape(p['bio'])}</p></div>
        </article>''')
grid = '\n'.join(cards)
page = (R/'profesores/index.html').read_text()
page = re.sub(r'(<!-- PROFES -->).*?(<!-- /PROFES -->)', lambda m: m.group(1)+'\n'+grid+'\n        '+m.group(2), page, flags=re.S)
page = page.replace('{{N}}', str(len(P)))
(R/'profesores/index.html').write_text(page)
# franja de portada: 8 primeros
strip = '\n'.join(f'''          <a class="face" href="profesores/#{p['slug']}"><span class="pic">{foto(p,'')}</span><b>{html.escape(p['nombre'])}</b><small>{'Fundador' if p['slug']=='vicencio-gonzalez' else html.escape(p['especialidad'])}</small></a>''' for p in orden[:8])
idx = (R/'index.html').read_text()
idx = re.sub(r'(<!-- FACES -->).*?(<!-- /FACES -->)', lambda m: m.group(1)+'\n'+strip+'\n          '+m.group(2), idx, flags=re.S)
idx = re.sub(r'Ver a los \d+ profesores', f'Ver a los {len(P)} profesores', idx)
(R/'index.html').write_text(idx)
print(len(P), 'profesores')
