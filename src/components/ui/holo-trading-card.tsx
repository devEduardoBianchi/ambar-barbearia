"use client"

import * as React from "react"

/**
 * Holo Trading Card — uma carta colecionável de foil holográfico, que inclina com o ponteiro.
 *
 * O brilho não é uma animação em loop. A fase dele sai da **direção do olhar**: o arco-íris anda porque a carta
 * mexeu, e com a carta parada o brilho fica parado. É essa a diferença entre isto e um degradê num cronômetro.
 *
 * As camadas têm paralaxe pelo mesmo motivo: o vetor do olhar vai para o espaço da carta e é dividido por uma
 * componente normal com piso antes de deslocar o UV, então a arte fica *dentro* da carta, em vez de deslizar por cima.
 *
 * Fora da tela, a carta para de desenhar.
 *
 * Autocontido: WebGL2 puro, e o React é o único import. Sem three.js, sem biblioteca de animação, sem Tailwind, sem
 * arquivo CSS e sem imagem obrigatória: sem arte, a frente da carta é gerada.
 */

export type Finish = "pearl" | "silver" | "gold" | "original"

export type HoloTradingCardProps = {
  name?: string
  /** A linha pequena embaixo do nome: um tipo, uma classe, uma posição. */
  subtitle?: string
  /** O número de colecionador, embaixo à esquerda, como "Nº 001". */
  number?: string
  /** A raridade, embaixo à direita. */
  rarity?: string
  /**
   * O assunto: um PNG (ou WebP) com transparência, que vem para a frente na paralaxe. Sem ele, a carta mostra a frente
   * gerada, que é um padrão de foil de verdade, não um marcador de lugar.
   */
  art?: string
  /** O fundo, de ponta a ponta, que vai para trás na paralaxe. */
  background?: string
  /**
   * A impressão da carta: o texto, as duas faixas escuras que o mantêm legível e o filete por dentro da borda. Com
   * false, a frente é só a imagem e o foil, para uma carta que já vem impressa no background.
   */
  print?: boolean
  finish?: Finish
  /** A largura da carta. A altura segue a proporção 5:7 das cartas colecionáveis. */
  width?: string
  /** A força do foil, de 0 a 1. */
  foil?: number
  /**
   * O quanto o arco-íris segue a grade de difração em vez de passar liso pela carta. 0 é um brilho chapado; o padrão
   * o divide em faixas ao longo das ranhuras, que é o que o foil de verdade faz.
   */
  pattern?: number
  /** O quanto o assunto vem para a frente, e o fundo vai para trás. */
  depth?: number
  bgDepth?: number
  /** A inclinação máxima, em graus. */
  tilt?: number
  /** Balança sozinha quando ninguém está mexendo, para pegar a luz por conta própria. */
  idle?: boolean
  /** Clique, toque ou Enter vira a carta. */
  flippable?: boolean
  /** O que vai impresso no verso. */
  back?: React.ReactNode
  className?: string
}

// #region carta
/** Limita a ±max. */
export const clampTilt = (v: number, max: number): number =>
  v > max ? max : v < -max ? -max : v > 0 || v < 0 ? v : 0

/**
 * A posição do ponteiro sobre a carta, como uma inclinação em graus.
 *
 * `x` e `y` vão de 0 a 1 de um lado ao outro do elemento. Os sinais são o que faz ela parecer um objeto: o ponteiro
 * à direita afasta a borda direita, então a carta se inclina *para* o cursor, em vez de segui-lo como um fantoche.
 */
export const tiltFromPointer = (
  x: number,
  y: number,
  max: number,
): { ax: number; ay: number } => ({
  ax: clampTilt((0.5 - y) * 2 * max, max),
  ay: clampTilt((x - 0.5) * 2 * max, max),
})

/**
 * O vetor unitário do olhar no espaço da carta, para uma inclinação em graus.
 *
 * É o valor de que o efeito inteiro depende: a paralaxe e a fase holográfica leem os dois, por isso concordam, e o
 * brilho parece pertencer à mesma superfície em que a arte está impressa.
 */
export const viewFromTilt = (ax: number, ay: number): [number, number, number] => {
  const rx = (ax * Math.PI) / 180
  const ry = (ay * Math.PI) / 180
  const x = Math.sin(ry) * Math.cos(rx)
  const y = -Math.sin(rx)
  const z = Math.cos(ry) * Math.cos(rx)
  const len = Math.hypot(x, y, z) || 1
  return [x / len, y / len, z / len]
}

/**
 * O deslocamento de UV de uma camada na profundidade `depth`, dado o vetor do olhar.
 *
 * O `|z|` tem piso de 0,4 de propósito. Num ângulo rasante, a divisão de verdade vai ao infinito e a camada sai
 * voando da carta; com o piso, a paralaxe continua crível até o limite da inclinação.
 */
export const parallaxOffset = (
  view: [number, number, number],
  depth: number,
): [number, number] => {
  const k = depth * 0.1 / Math.max(Math.abs(view[2]), 0.4)
  return [view[0] * k, view[1] * k]
}

/** A paleta de cossenos de que o foil é feito. A fase é em voltas. */
export const spectrum = (phase: number): [number, number, number] => [
  0.66 + 0.25 * Math.cos(6.28318 * phase),
  0.66 + 0.25 * Math.cos(6.28318 * (phase + 0.33)),
  0.66 + 0.25 * Math.cos(6.28318 * (phase + 0.67)),
]
// #endregion

const FINISH_ID: Record<Finish, number> = { pearl: 0, silver: 1, original: 2, gold: 3 }

const VERT = `#version 300 es
void main() {
  // Um triângulo grande demais, não um quad. O *2 importa: sem ele, os três vértices caem em (-1,-1) (1,-1) (-1,1)
  // e cobrem só metade da tela, que aparece como uma carta cortada de canto a canto.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2.0 - 1.0;
  gl_Position = vec4(p, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 uRes;
uniform vec3 uView;
uniform float uTime;
uniform float uFoil;
uniform float uFinish;
uniform float uDepth;
uniform float uBgDepth;
uniform float uHasArt;
uniform float uPattern;
uniform float uHasBg;
uniform sampler2D tArt;
uniform sampler2D tBg;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float inside(vec2 p) { return step(0.0, p.x) * step(0.0, p.y) * step(p.x, 1.0) * step(p.y, 1.0); }

// O vetor do olhar levado para o espaço da carta e dividido por uma componente normal com piso. Sem o piso, um
// ângulo rasante joga a camada para fora da carta.
vec2 parallax(vec2 uv, float depth) {
  return uv + uView.xy / max(abs(uView.z), 0.4) * depth * 0.10;
}

vec3 spectrum(float phase) {
  return 0.66 + 0.25 * cos(6.28318 * (phase + vec3(0.0, 0.33, 0.67)));
}

// O foil holográfico de verdade é uma grade de difração, então a cor se divide em faixas *ao longo* das ranhuras,
// em vez de passar lisa pela carta. Esta é a coordenada da grade: raios saindo do centro cruzados com anéis.
float grating(vec2 uv) {
  vec2 p = (uv - vec2(0.5, 0.46)) * vec2(uRes.x / uRes.y, 1.0);
  // O coeficiente do ângulo tem de ser inteiro. O atan dá a volta de 2*pi no corte do ramo, então um multiplicador
  // fracionário deixa ali uma fração de volta de fase: uma emenda dura saindo do centro da carta.
  return atan(p.y, p.x) * 3.0 + length(p) * 6.0;
}

// A fase é função da direção do olhar, não do tempo. Com a carta parada, o arco-íris fica parado.
vec3 film(vec2 uv) {
  float phase = uv.x * 0.85 + uv.y * 0.55 + uView.x * 1.5 - uView.y * 0.9
    + grating(uv) * uPattern;
  if (uFinish > 2.5) {
    float hi = 0.5 + 0.5 * sin(phase * 6.28318);
    float glint = 0.5 + 0.5 * cos((phase + 0.25) * 6.28318);
    return mix(vec3(0.72, 0.50, 0.20), vec3(1.00, 0.90, 0.60), hi * 0.7 + glint * 0.3);
  }
  vec3 color = spectrum(phase);
  return mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), step(0.5, uFinish));
}

// Uma faixa estreita que atravessa a carta conforme ela gira. A décima potência é o que a mantém uma faixa, e não
// um véu.
float sweep(vec2 uv) {
  return pow(0.5 + 0.5 * sin((uv.x * 0.72 + uv.y * 0.45 + uView.x * 1.2 + uView.y * 0.6) * 6.283), 10.0);
}

// A frente gerada, para a carta sem arte própria: uma explosão de raios atrás de anéis concêntricos de guilhoché,
// que é o que vem impresso de fato embaixo da figura numa carta de foil.
vec3 generated(vec2 uv) {
  vec2 p = (uv - vec2(0.5, 0.46)) * vec2(uRes.x / uRes.y, 1.0) * 2.1;
  float r = length(p);
  float a = atan(p.y, p.x);

  // Escura e quase sem cor, de propósito. Numa carta sem arte o foil tem de ser o espetáculo inteiro, e não dá se
  // a base já for chamativa.
  vec3 col = mix(vec3(0.045, 0.035, 0.075), vec3(0.015, 0.012, 0.03), smoothstep(0.1, 1.4, r));

  // Raios finos saindo do centro: a grade, visível. Finos e claros, para o espectro ter onde se apoiar nítido.
  float rays = pow(0.5 + 0.5 * cos(a * 72.0), 8.0);
  col += vec3(0.55, 0.60, 0.80) * rays * smoothstep(1.45, 0.12, r) * 0.42;

  // Anéis concêntricos num passo diferente, para os dois se cruzarem num moiré.
  float rings = pow(0.5 + 0.5 * cos(r * 90.0), 8.0);
  col += vec3(0.45, 0.55, 0.85) * rings * smoothstep(1.5, 0.1, r) * 0.30;

  // Um halo claro onde a arte ficaria, para a composição ter um centro.
  col += vec3(0.5, 0.42, 0.75) * smoothstep(0.60, 0.40, r) * 0.16;
  col += vec3(0.95, 0.90, 1.0) * (smoothstep(0.52, 0.49, r) - smoothstep(0.49, 0.46, r)) * 0.5;

  return col;
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uRes.x, 1.0 - gl_FragCoord.y / uRes.y);

  vec2 bu = parallax(uv, uBgDepth);
  // Cover the 2:1 storefront without stretching it at responsive card sizes.
  float bgAspect = float(textureSize(tBg, 0).x) / max(float(textureSize(tBg, 0).y), 1.0);
  float cardAspect = uRes.x / uRes.y;
  bu = (bu - 0.5) * vec2(min(cardAspect / bgAspect, 1.0), min(bgAspect / cardAspect, 1.0)) + 0.5;
  vec3 col = uHasBg > 0.5
    ? pow(texture(tBg, clamp(bu, 0.0, 1.0)).rgb, vec3(1.6))
    : generated(bu);

  if (uHasArt > 0.5) {
    // O assunto vem para a frente e um pouco maior, para parecer apoiado acima do fundo, e não impresso nele.
    vec2 su = (parallax(uv, uDepth) - 0.5) / 1.06 + 0.5;
    vec4 art = texture(tArt, clamp(su, 0.0, 1.0));
    col = mix(col, art.rgb, art.a * inside(su));
  }

  if (uFinish > 2.5) col = col * vec3(1.02, 0.95, 0.78) + vec3(0.05, 0.012, 0.0);

  vec3 foil = film(uv);
  float amount = abs(uFinish - 2.0) < 0.05 ? 0.0 : uFoil;
  float luminance = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float band = sweep(uv);
  float goldBoost = uFinish > 2.5 ? 1.7 : 1.0;

  // Sem imagem nenhuma, o foil carrega a carta, então pode ser bem mais forte; por cima de uma figura ou de um fundo,
  // ele fica no nível contido da referência. Um fundo claro com o foil forte sai estourado, quase branco.
  float printed = max(uHasArt, uHasBg);
  float lift = mix(1.7, 1.0, printed);
  col *= 1.0 - amount * 0.21 * (1.0 - foil) * (0.2 + band * 0.8);
  col += foil * amount * band * goldBoost * (0.065 + 0.11 * (1.0 - luminance)) * lift;
  // Na frente gerada, o espectro fica pendurado nas próprias ranhuras, na medida do quanto a base já é clara, então
  // os vãos entre os raios continuam pretos. Somado por igual, ele deixa a carta inteira leitosa.
  col += foil * amount * (1.0 - printed) * foil * (0.04 + 2.4 * luminance);

  // O laminado pega mais forte bem na borda da carta.
  float edge = 1.0 - smoothstep(0.015, 0.06, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
  col = mix(col, foil * 0.75 + 0.21, edge * amount * (uFinish > 2.5 ? 0.42 : 0.3));

  // Purpurina: um hash esparso de células, cada uma piscando na própria fase conforme a carta gira. É o único lugar
  // em que o tempo entra, e mal entra.
  vec2 cell = floor(uv * vec2(480.0, 720.0));
  float flake = step(0.994, hash(cell)) *
    pow(0.5 + 0.5 * sin(hash(cell + 8.0) * 30.0 + uView.x * 20.0 + uTime * 0.6), 10.0);
  col += foil * flake * amount * 0.13;

  fragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 1.6)), 1.0);
}
`

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type)
  if (!sh) throw new Error("no shader")
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error("shader: " + log)
  }
  return sh
}

// O React 19 sobe uma <style> com href e precedence para o <head>, uma vez só para todas as cartas. O React 18 não
// conhece isso: lá ela vai ao lado da carta, escondida e com o CSS cru, porque como filho de texto o SSR do 18
// escaparia as aspas e quebraria os seletores.
const HOISTS_STYLES = Number(React.version.split(".")[0]) >= 19

function HoloTradingCardStyles() {
  if (HOISTS_STYLES) {
    const hoist = { href: "holo-trading-card", precedence: "default" } as React.StyleHTMLAttributes<HTMLStyleElement>
    return <style {...hoist}>{HTC_CSS}</style>
  }
  return <style hidden dangerouslySetInnerHTML={{ __html: HTC_CSS }} />
}

export default function HoloTradingCard({
  name = "Holo Trading Card",
  subtitle = "Foil · Muda com o olhar",
  number = "Nº 001",
  rarity = "Rara",
  art,
  background,
  print = true,
  finish = "pearl",
  width = "clamp(230px, 64vw, 340px)",
  foil = 1,
  pattern = 0.22,
  depth = 0.28,
  bgDepth = -0.2,
  tilt = 16,
  idle = true,
  flippable = true,
  back,
  className = "",
}: HoloTradingCardProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [flipped, setFlipped] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const [generation, setGeneration] = React.useState(0)
  const [reduced, setReduced] = React.useState(false)
  // Espelhado de dentro do loop, para o transform do CSS seguir os mesmos ângulos que o shader está usando: uma
  // fonte só da verdade, ou o brilho e a geometria discordam e a carta deixa de parecer um objeto só.
  const [angles, setAngles] = React.useState({ ax: 0, ay: 0 })

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  // As props que o loop lê a cada quadro, sem refazer o contexto quando mudam.
  const tuning = React.useRef({ foil, depth, bgDepth, finish, tilt, idle, reduced, pattern })
  React.useEffect(() => {
    tuning.current = { foil, depth, bgDepth, finish, tilt, idle, reduced, pattern }
  })

  // Escrito pelos handlers do ponteiro, lido pelo loop.
  const target = React.useRef({ ax: 0, ay: 0, active: false })

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false })
    if (!gl) {
      setFailed(true)
      return
    }

    let program: WebGLProgram | null = null
    let vao: WebGLVertexArrayObject | null = null
    const textures: WebGLTexture[] = []
    let raf = 0
    let disposed = false
    let ax = 0
    let ay = 0
    const started = performance.now()
    // Fora da tela (com 200 px de folga), o loop para; volta quando a carta volta.
    let onScreen = true
    let running = false
    const start = () => {
      if (running || disposed || !program) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      running = false
    }
    const onRestored = () => setGeneration((g) => g + 1)
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (w === 0 || h === 0) return
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) start()
      },
      { rootMargin: "200px" },
    )
    visibility.observe(canvas)

    const u: Record<string, WebGLUniformLocation | null> = {}
    let hasArt = 0
    let hasBg = 0

    const makeTexture = (unit: number) => {
      const tex = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      // Um pixel transparente até a imagem de verdade chegar, para os primeiros quadros lerem algo válido em vez de
      // sair pretos.
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0]),
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      if (tex) textures.push(tex)
      return tex
    }

    const load = (src: string | undefined, unit: number, tex: WebGLTexture | null, mark: (v: number) => void) => {
      if (!src || !tex) return
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.decoding = "async"
      img.onload = () => {
        if (disposed) return
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
        mark(1)
      }
      // Uma imagem que falta ou que o CORS barra deixa a frente gerada no lugar, em vez de apagar a carta.
      img.src = src
    }

    const frame = () => {
      if (disposed) return
      if (!onScreen) {
        running = false
        return
      }
      const t = tuning.current
      const goalX = target.current.active ? target.current.ax : 0
      const goalY = target.current.active ? target.current.ay : 0
      const now = (performance.now() - started) / 1000

      let driftX = 0
      let driftY = 0
      if (t.idle && !t.reduced && !target.current.active) {
        // Um oito lento, para a carta em que ninguém mexe ainda pegar a luz. Duas frequências sem múltiplo comum,
        // ou o loop fica visível.
        driftX = Math.sin(now * 0.41) * t.tilt * 0.34
        driftY = Math.cos(now * 0.27) * t.tilt * 0.46
      }

      // Uma perseguição quase criticamente amortecida. Pular para o ponteiro parece uma textura; chegar nele aos
      // poucos parece um objeto com massa.
      const k = t.reduced ? 1 : 0.12
      ax += (goalX + driftX - ax) * k
      ay += (goalY + driftY - ay) * k

      const view = viewFromTilt(ax, ay)

      gl.useProgram(program)
      gl.bindVertexArray(vao)
      gl.uniform2f(u.uRes, canvas.width, canvas.height)
      gl.uniform3f(u.uView, view[0], view[1], view[2])
      gl.uniform1f(u.uTime, t.reduced ? 0 : now)
      gl.uniform1f(u.uFoil, t.foil)
      gl.uniform1f(u.uFinish, FINISH_ID[t.finish] ?? 0)
      gl.uniform1f(u.uDepth, t.depth)
      gl.uniform1f(u.uBgDepth, t.bgDepth)
      gl.uniform1f(u.uHasArt, hasArt)
      gl.uniform1f(u.uHasBg, hasBg)
      gl.uniform1f(u.uPattern, t.pattern)
      gl.uniform1i(u.tArt, 0)
      gl.uniform1i(u.tBg, 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      // Arredondado, para o DOM não renderizar de novo por um centésimo de grau.
      const qx = Math.round(ax * 10) / 10
      const qy = Math.round(ay * 10) / 10
      setAngles((a) => (a.ax === qx && a.ay === qy ? a : { ax: qx, ay: qy }))

      raf = requestAnimationFrame(frame)
    }

    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      program = gl.createProgram()
      if (!program) throw new Error("no program")
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error("link: " + gl.getProgramInfoLog(program))
      }
      vao = gl.createVertexArray()
      gl.bindVertexArray(vao)

      for (const key of [
        "uRes", "uView", "uTime", "uFoil", "uFinish",
        "uDepth", "uBgDepth", "uHasArt", "uHasBg", "uPattern", "tArt", "tBg",
      ]) {
        u[key] = gl.getUniformLocation(program, key)
      }

      const artTex = makeTexture(0)
      const bgTex = makeTexture(1)
      load(art, 0, artTex, (v) => (hasArt = v))
      load(background, 1, bgTex, (v) => (hasBg = v))

      resize()
      start()
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- o shader não compilou: o canvas vira o degradê
      if (!disposed) setFailed(true)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      visibility.disconnect()
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      for (const tex of textures) gl.deleteTexture(tex)
      if (vao) gl.deleteVertexArray(vao)
      if (program) gl.deleteProgram(program)
    }
  }, [generation, art, background])

  const onPointerMove = (e: React.PointerEvent) => {
    const el = rootRef.current
    if (!el) return
    // Relativo à caixa da própria carta, para ela se comportar igual onde quer que esteja.
    const r = el.getBoundingClientRect()
    const { ax, ay } = tiltFromPointer(
      (e.clientX - r.left) / Math.max(r.width, 1),
      (e.clientY - r.top) / Math.max(r.height, 1),
      tuning.current.tilt,
    )
    target.current = { ax, ay, active: true }
  }
  const release = () => {
    target.current = { ax: 0, ay: 0, active: false }
  }

  const label = flipped ? "Voltar para a fachada" : "Ver horários de atendimento"

  return (
    <div className={"htc" + (className ? " " + className : "")} style={{ width }}>
      <HoloTradingCardStyles />
      <div
        ref={rootRef}
        
        
        
        
        className="htc__card"
        style={{
          // O shader e a geometria leem os mesmos dois ângulos.
          transform:
            "rotateX(" + angles.ax + "deg) rotateY(" + (angles.ay + (flipped ? 180 : 0)) + "deg)",
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={() => flippable && setFlipped((f) => !f)}

      >
        {/* Frente */}
        <div className="htc__face htc__front" aria-hidden={flipped}>
          {failed ? (
            <img className="htc__fallback" src={background} alt="Fachada da Âmbar" />
          ) : (
            <canvas ref={canvasRef} className="htc__canvas" aria-hidden="true" />
          )}

          {print && (
            <>
              {/* O foil é agitado por natureza, então a tinta ganha um chão próprio. Sem eles, o subtítulo some onde
                  uma faixa clara cair. */}
              <div aria-hidden="true" className="htc__shade htc__shade--top" />
              <div aria-hidden="true" className="htc__shade htc__shade--bottom" />
              {/* O filete de dentro, para parecer impresso e refilado. */}
              <div aria-hidden="true" className="htc__rule" />

              {/* A impressão. Texto de verdade, por cima do foil: numa carta de verdade a tinta também não vai
                  laminada, e assim a letra fica nítida e selecionável. */}
              <div className="htc__print">
                <div>
                  <p className="htc__name">{name}</p>
                  {subtitle && <p className="htc__subtitle">{subtitle}</p>}
                </div>
                <div className="htc__foot">
                  <span className="htc__number">{number}</span>
                  {rarity && <span className="htc__rarity">{rarity}</span>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Verso */}
        <div className="htc__face htc__back" aria-hidden={!flipped} inert={!flipped}>
          {back ?? (
            <div className="htc__back-frame">
              <div className="htc__back-pattern" />
            </div>
          )}
        </div>
      </div>
      {flippable && <button type="button" className="location-flip-button" aria-pressed={flipped} onClick={() => setFlipped((value) => !value)}>{label} <span aria-hidden="true">↻</span></button>}
    </div>
  )
}

const HTC_CSS = `
/* o que o projeto pode trocar com uma classe (posição e margem): na camada base, que vem antes das classes de
   componente e dos utilitários (Tailwind v4, Panda, Chakra) e perde para o CSS fora de camada (Tailwind v3, CSS
   Modules, CSS comum) */
@layer base {
  .htc { position: relative; }
}
.htc {
  box-sizing: border-box;
  perspective: 1100px;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.htc *, .htc *::before, .htc *::after { box-sizing: border-box; }
.htc__card {
  position: relative;
  width: 100%;
  aspect-ratio: 1.32 / 1;
  border-radius: 5%;
  transform-style: preserve-3d;
  transition: transform 650ms cubic-bezier(.22,.61,.36,1);
  cursor: pointer;
  outline: none;
}
.htc__card:focus-visible { box-shadow: 0 0 0 2px transparent, 0 0 0 4px rgba(255, 255, 255, .7); }
.htc__face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 5%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
/* a impressão mede pela carta, não pela tela: uma carta de 200 px e uma de 400 px são o mesmo desenho em dois
   tamanhos. Os tetos das letras vão em px, não em rem, para não dependerem do font-size da raiz da página */
.htc__front {
  container-type: inline-size;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, .75), 0 0 0 1px rgba(255, 255, 255, .14) inset;
}
.htc__canvas { display: block; width: 100%; height: 100%; }
.htc__fallback {
  width: 100%;
  height: 100%;
  background: conic-gradient(from 210deg, #4b2a6b, #2b5f7a, #6b2a4f, #7a6a2b, #4b2a6b);
}
.htc__shade { position: absolute; left: 0; right: 0; pointer-events: none; }
.htc__shade--top { top: 0; height: 28%; background: linear-gradient(to bottom, rgba(4, 2, 10, .72), transparent); }
.htc__shade--bottom { bottom: 0; height: 22%; background: linear-gradient(to top, rgba(4, 2, 10, .72), transparent); }
.htc__rule {
  position: absolute;
  inset: 3.5%;
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 3.5%;
  pointer-events: none;
}
.htc__print {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7%;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  pointer-events: none;
}
.htc__name {
  margin: 0;
  color: #fff;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: min(6cqw, 21.6px);
  font-weight: 600;
  line-height: 1.25;
  text-shadow: 0 2px 10px rgba(0, 0, 0, .6);
}
.htc__subtitle, .htc__number, .htc__rarity {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-weight: 400;
}
.htc__subtitle {
  margin: 4px 0 0;
  color: rgba(255, 255, 255, .7);
  font-size: min(3cqw, 9.92px);
  letter-spacing: .2em;
  text-transform: uppercase;
}
.htc__foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
.htc__number { color: rgba(255, 255, 255, .7); font-size: min(3cqw, 9.6px); letter-spacing: .16em; }
.htc__rarity {
  padding: 2px 8px;
  border: 1px solid rgba(255, 255, 255, .3);
  border-radius: 9999px;
  background: rgba(0, 0, 0, .3);
  color: #fff;
  font-size: min(2.8cqw, 8.96px);
  letter-spacing: .18em;
  text-transform: uppercase;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.htc__back {
  transform: rotateY(180deg);
  background: radial-gradient(120% 90% at 50% 20%, #2a1745 0%, #150c24 55%, #090511 100%);
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, .75), 0 0 0 1px rgba(255, 255, 255, .12) inset;
}
.htc__back-frame {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 10%;
  text-align: center;
}
.htc__back-pattern {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 4%;
  background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, .055) 0deg 6deg, transparent 6deg 12deg);
}
`

