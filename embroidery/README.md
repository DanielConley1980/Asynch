# StitchForge — Photo → Machine Embroidery

Upload a photo in your browser and get back a file a computerised embroidery
machine can stitch. StitchForge reduces the photo to a handful of thread
colours, generates a scanline fill for each colour region, and writes real
machine formats via [`pyembroidery`](https://github.com/EmbroidePy/pyembroidery).

## What it produces

- **`.PES`** — Brother / Babylock / Bernina
- **`.DST`** — Tajima (near-universal)
- **`.EXP`** — Melco / Bernina
- **`.JEF`** — Janome
- **`.VP3`** — Husqvarna Viking / Pfaff
- **`.XXX`** — Singer

Every design is measured in real millimetres, so it stitches at the size you
pick with the hoop slider.

## How it works

```
photo ──► fit to hoop ──► denoise ──► quantise to N thread colours
      ──► per colour: scanline (boustrophedon) fill + jumps/trims
      ──► colour-ordered EmbPattern ──► write DST/PES/EXP/…
      └─► render a stitch-plan PNG preview
```

Core logic lives in `converter.py`; the Flask server and UI are `app.py`,
`templates/`, and `static/`.

## Run it locally

```bash
cd embroidery
pip install -r requirements.txt
python app.py            # serves on http://localhost:5000  (set PORT=… to change)
```

Open the page, drop in a photo, tune the settings, and download.

### Settings

| Control | Effect |
|---|---|
| **Hoop size** | Longest side of the finished design (20–300 mm). |
| **Thread colours** | How many threads to reduce the photo to (2–12). |
| **Fill density** | Gap between stitch rows — denser = more solid, more stitches. |
| **Machine format** | Which file to download (all formats are generated). |
| **Smooth photo** | Median-filter to reduce camera/JPEG noise before quantising. |
| **Drop background colour** | Skip stitching a dominant border colour. |

## Notes & limitations

This is a **raster fill** converter: it fills colour regions with rows of
stitches. It is great for logos, silhouettes, and bold graphic photos. It does
**not** do satin-column lettering, automatic underlay, or push/pull
compensation like commercial digitising software (Wilcom, Hatch, Ink/Stitch).

Photo fills can get **dense** — always stitch a test on scrap fabric first, use
a stabiliser, and lower the density or colour count if the design feels heavy.

## Deploying

The dev server keeps jobs in memory for a single process. For real traffic run
it behind a WSGI server and a shared job store, e.g.:

```bash
pip install gunicorn
gunicorn -w 2 -b 0.0.0.0:8000 app:app
```
