from PIL import Image, ImageDraw
from pathlib import Path
Path('public/images').mkdir(exist_ok=True)
def product(kind, size=(800,720)):
 im=Image.new('RGB',size,'#eff3f7');d=ImageDraw.Draw(im);d.ellipse((160,580,660,655),fill='#e0e6ed')
 if kind in ['phone','phone-back']:
  d.rounded_rectangle((280,80,520,600),45,fill='#102b46');d.rounded_rectangle((290,90,510,590),38,fill='#436276' if kind=='phone-back' else '#c0ebe7')
  if kind=='phone':
   d.polygon([(290,400),(510,210),(510,590),(290,590)],fill='#087f82');d.ellipse((330,220,550,440),fill='#84ccc8');d.rounded_rectangle((365,105,435,123),10,fill='#102b46')
  else:
   d.rounded_rectangle((307,110,408,246),18,fill='#294758')
   for x,y in [(332,138),(382,138),(332,192)]:d.ellipse((x-17,y-17,x+17,y+17),fill='#0b2137',outline='#91b5bb',width=3)
 elif kind=='perfume':
  d.rounded_rectangle((268,230,532,590),28,fill='#dbc19a',outline='#ad9065',width=5);d.rectangle((320,140,480,234),fill='#142b40');d.rectangle((280,245,302,565),fill='#f0dec0');d.rectangle((307,345,493,465),fill='#fffcf4');d.line((337,400,462,400),fill='#b89564',width=6)
 elif kind=='shirt':
  d.polygon([(270,160),(345,135),(455,135),(530,160),(660,315),(563,385),(515,310),(530,590),(270,590),(285,310),(237,385),(140,315)],fill='#fff',outline='#c6d1dc',width=5);d.polygon([(345,135),(400,210),(455,135),(438,245),(400,216),(360,245)],fill='#e5edf3');d.line((400,218,400,590),fill='#c6d1dc',width=3)
  for y in range(270,580,65):d.ellipse((411,y,419,y+8),fill='#8b9ca9')
 elif kind=='coffee':
  d.rounded_rectangle((235,140,550,585),30,fill='#183a50');d.rounded_rectangle((267,185,520,265),14,fill='#c4d0d4');d.rectangle((280,310,500,530),fill='#0d2538');d.rounded_rectangle((325,385,445,508),16,fill='#f7f4e9');d.arc((415,397,480,477),270,90,fill='#f7f4e9',width=10);d.rectangle((312,300,460,329),fill='#9ab3bd');d.rectangle((230,547,556,580),fill='#93adb7');d.ellipse((468,204,502,238),fill='#078f91')
 elif kind=='buds':
  d.rounded_rectangle((225,350,575,590),70,fill='#fff',outline='#cad6df',width=4);d.line((232,422,568,422),fill='#d1dce4',width=3)
  for x in [280,460]:d.rounded_rectangle((x,170,x+58,315),25,fill='#fff',outline='#c4d2dd',width=4);d.ellipse((x-22,145,x+60,228),fill='#fff',outline='#c4d2dd',width=4)
 elif kind=='cream':
  d.rounded_rectangle((235,320,570,585),28,fill='#d6e9e2');d.rounded_rectangle((220,255,585,340),20,fill='#fff',outline='#d3dfdb',width=4);d.rectangle((300,387,505,520),fill='#fafdfb');d.line((340,450,465,450),fill='#087f82',width=5)
 return im
for kind in ['phone','phone-back','perfume','shirt','coffee','buds','cream']:product(kind).save(f'public/images/{kind}.webp',quality=85)
hero=Image.new('RGB',(900,700),'#e9f3f3')
for kind,box in [('phone',(140,15,520,500)),('perfume',(440,245,780,560)),('buds',(90,335,470,670))]:
 p=product(kind);p=p.resize((box[2]-box[0],box[3]-box[1]));hero.paste(p,(box[0],box[1]))
hero.save('public/images/hero.webp',quality=85)
for s in [192,512]:
 im=Image.new('RGB',(s,s),'#102b46');d=ImageDraw.Draw(im);d.rounded_rectangle((s*.2,s*.38,s*.8,s*.76),int(s*.04),fill='#087f82');d.polygon([(s*.17,s*.38),(s*.3,s*.23),(s*.7,s*.23),(s*.83,s*.38)],fill='#fff');d.rectangle((s*.44,s*.51,s*.59,s*.76),fill='#d3f4ef');im.save(f'public/icon-{s}.png')
Path('public/icon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#102b46"/><path d="M20 40h60v37H20z" fill="#087f82"/><path d="M16 40l14-17h40l14 17z" fill="white"/><path d="M44 52h16v25H44z" fill="#d3f4ef"/></svg>')
