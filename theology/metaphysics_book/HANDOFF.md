# HANDOFF NOTE — Metaphysics of Islamic Economics

**Project:** *The Metaphysics of Islamic Economics* (working title), a foundational treatise on the relation between the fundamental nature of reality and economic phenomena, anchored in the Akbarian tradition (Ibn Arabi, Mulla Sadra, Shah Wali Allah).

**Status:** Early-stage. Front matter and Chapter 1 written and compiling. The remaining 15 chapters are outlined but unwritten. One companion note (Note 01) and a reading-curriculum syllabus are in place.

**Audience for this note:** A research assistant continuing the project. Read this document end-to-end before touching any source files. The methodological discipline established here is non-trivial and easy to undo accidentally.

---

## 1. The most important thing to understand first

This project is **metaphysics-only**. It is not Islamic economics in the usual sense. It is not formal microeconomic theory. It is not heterodox economics borrowing physics methods. Three separate things have been deliberately *excluded* from the scope, and confusing them with the project's actual scope will damage the work.

### What this project IS

A treatise on the **fundamental nature of reality** as it bears on classical Islamic economic concepts (`rizq`, `barakah`, `qadar`, `niyyah`, `riba`, `halal`, `haram`). The aim is to articulate what these concepts *are* at the level of being — not to model their dynamics, not to estimate their effects, not to derive policy.

The conceptual apparatus is drawn from two scientifically authoritative sources:

1. **Quantum foundations** (Bell's theorem, the measurement problem, the live interpretive landscape — Bohmian, QBist, Many-Worlds, GRW)
2. **Mathematical logic and computability theory** (the Penrose-Gödel argument from the incompleteness theorems and the Turing halting problem)

Plus the **Akbarian metaphysical tradition itself**, which provides the indigenous synthesis that the contemporary apparatus opens space for.

### What this project IS NOT

- **Not a textbook of Islamic economics.** The standard topics (zakat administration, *mudarabah* contracts, Islamic banking) are not its subject.
- **Not formal microeconomic theory.** That is the work of a planned subsequent volume (Volume I).
- **Not heterodox economics borrowing physics.** Specifically: it does NOT use ergodicity to model `riba`, networks to model `rizq`, or behavioral mediation to model `barakah`. Those treatments exist in an *earlier draft* (`theology/hidden_architecture/volume0/`) and have been deliberately split off into a planned separate companion volume.
- **Not apologetic.** It does not argue that contemporary physics *proves* the Akbarian doctrines. It argues that the contemporary apparatus opens *categorial space* in which the doctrines can be articulated rigorously. The doctrines stand on their own grounds (textual, experiential, reasoned).

### The methodological discipline (read carefully)

Two principles govern what apparatus is admissible:

**Principle 1 — Scientific authority only.** Apparatus drawn upon must have genuine empirical or mathematical authority. Quantum mechanics qualifies (most successful theory in science; non-classicality forced by Bell experiments). The Penrose-Gödel argument qualifies (settled mathematics). **Broader philosophical traditions do not qualify**, even when their claims are structurally close to Akbarian metaphysics. This rules out:

- Whitehead's process philosophy (no empirical authority)
- Heideggerian phenomenology (no empirical authority)
- Contemporary analytical idealism in the Kastrup mode (philosophy of mind, not science)
- Neoplatonism, perennialism, etc. as load-bearing apparatus

These traditions can be *mentioned* where they illuminate. They cannot be the ground on which a load-bearing claim rests. The reason is that a contemporary reader who comes from a scientific worldview will (rightly) reject philosophical apparatus as not authoritative. QM and Gödel-Penrose, by contrast, compel assent across schools of thought.

**Principle 2 — The apparatus opens space; it does not validate doctrine.** The Akbarian doctrines are true (or false) on the basis of textual tradition, experiential tradition (`'ilm al-dhawq`), and reasoned argument from first principles. The contemporary apparatus removes obstacles erected by the classical mechanistic paradigm; it does not provide positive evidence for the doctrines themselves. This is critical. It is the answer to the perennialist objection (Nasr, Schuon): we are not making science the foundation of religion. We are using science's own admissions to remove obstacles to articulating religious metaphysics in contemporary vocabulary.

**Concretely**, this means: never write sentences like "Quantum mechanics proves that…" or "Bell's theorem demonstrates the truth of `wahdat al-wujud`." Write instead: "The non-classical ontology forced by quantum mechanics is consistent with the Akbarian claim that…" or "Bell's theorem removes the obstacle, posed by classical mechanism, to articulating `wahdat al-wujud` rigorously."

---

## 2. Repository layout

All work lives under `theology/metaphysics_book/` in the project repository. Key files:

```
theology/metaphysics_book/
├── HANDOFF.md                        ← this file
├── main.tex                          ← main treatise (16-ch outline; Ch.1 written)
├── main.pdf                          ← compiled output (gitignored, regenerate with pdflatex)
├── frontmatter/
│   └── preface.tex                   ← methodological framing for the whole book
├── part1/
│   └── chapter1.tex                  ← "The Question of This Book" (DONE)
│   ├── chapter2.tex                  ← TO WRITE: "The Two Layers: Manifest and Unseen"
│   ├── chapter3.tex                  ← TO WRITE: "Why Classical Apparatus Fails for Metaphysical Concepts"
│   └── chapter4.tex                  ← TO WRITE: "The Sources: Textual and Akbarian"
├── part2/                            ← all chapters TO WRITE
│   ├── chapter5.tex                  ← Quantum Foundations and the Measurement Problem
│   ├── chapter6.tex                  ← Non-Computability and the Reality of Intention
│   └── chapter7.tex                  ← Akbarian Metaphysics: Wujud, Tajalli, the Divine Names
├── part3/                            ← worked treatments, all TO WRITE
│   ├── chapter8.tex                  ← Niyyah as Non-Computable Ground
│   ├── chapter9.tex                  ← Qadar and the Quantum Structure of Actualization
│   ├── chapter10.tex                 ← Rizq from the Unseen
│   ├── chapter11.tex                 ← Barakah as Coupling
│   ├── chapter12.tex                 ← Halal and Haram as Modes of Engagement with the Real
│   └── chapter13.tex                 ← Riba as Ontological Inversion
├── part4/                            ← synthesis, all TO WRITE
│   ├── chapter14.tex                 ← The Unified Metaphysical Framework
│   ├── chapter15.tex                 ← Implications for the Formal Theory (Path to Volume I)
│   └── chapter16.tex                 ← What This Book Has and Has Not Done
├── notes/
│   ├── note01_ai_durability.tex      ← AI and the Durability of Islamic Metaphysics (DONE)
│   └── note01_ai_durability.pdf      ← gitignored
└── syllabus/
    ├── reading_curriculum.docx       ← 31-book curriculum, force-added past *.docx ignore
    └── build_syllabus.js             ← regenerate the docx with: NODE_PATH=/opt/homebrew/lib/node_modules node build_syllabus.js
```

Adjacent directory of relevance:

```
theology/hidden_architecture/         ← original mixed-content draft, preserved
└── volume0/                          ← reference only; do NOT edit
    ├── main.tex                      ← original draft with all chapters written
    ├── frontmatter/
    └── part1..4/
```

The `hidden_architecture/volume0/` directory contains the **earlier draft** of the project, written before the current methodological discipline was imposed. It mixes metaphysical work with applied (heterodox-economics) work. **Do not edit this directory.** Consult it for reference — particularly for content that will eventually move into the planned heterodox-economics companion volume — but the new metaphysics-only book is in `metaphysics_book/`, separate.

---

## 3. What's been done so far

### 3.1 Main treatise

| Component | Status | Notes |
|---|---|---|
| `main.tex` (preamble, structure) | DONE | 16-chapter outline; commented `\input` lines for chapters 2–16 |
| `frontmatter/preface.tex` | DONE | Establishes the methodological discipline and the relation to the heterodox-economics companion |
| `part1/chapter1.tex` | DONE | "The Question of This Book"; sets up the modeling-vs-metaphysics distinction, the two-layer ontology, the apparatus-opens-space principle, and a worked illustration via *barakah*. ~16 pages compiled. |
| Chapters 2–16 | NOT WRITTEN | Outlined in `main.tex` (commented `\input` lines and Chapter 1's structural preview). See §5 below. |

### 3.2 Notes (companion essays)

| Note | Status | Description |
|---|---|---|
| `notes/note01_ai_durability.tex` | DONE | 7-page essay engaging Falk & Tsoukalas (2026) "The AI Layoff Trap." Argues the metaphysical concepts of Islamic economics are more durable than the applied frameworks they are sometimes paired with, because the metaphysical concepts make claims about the structure of being rather than about specific empirical regularities. |

The `notes/` subdirectory is the home for **strands that don't fit cleanly into the main treatise** but are worth preserving and developing. Future possible notes (not yet written):

- Note 02: The Faggin Universe and Akbarian Self-Knowledge (engaging Federico Faggin's "Spacetime is the Memory of a Self-Knowing Universe")
- Note 03: Information Conservation and the Knower of Hidden Things (engaging the QPAPG video material — black hole information paradox, ADS-CFT, the holographic principle as it bears on `al-`Alim`)
- Note 04: Penrose, Gödel, and the Reality of *Niyyah* (a deeper Penrose chapter than Chapter 6 of the main treatise will have room for)
- Note 05: The Perennialist Objection and the (B)-Not-(A) Methodology (engaging Nasr's critique directly)
- Note 06: *Qalb* in the Akbarian Tradition (placeholder for the *niyyah* chapter — flagged from the "Heart" YouTube video)

### 3.3 Reading curriculum (syllabus)

| Component | Status | Description |
|---|---|---|
| `syllabus/reading_curriculum.docx` | DONE | 18–24 month reading curriculum for an econ-PhD-trained reader. 31 primary books across 5 phases (math, QM, mathematical logic, philosophy, Islamic metaphysics) plus optional astrophysics phase plus a "Adjacent work" section on existing deep-ontology economics (Orrell, McGilchrist, Bohm, Daly-Cobb, Milbank, Mirowski, Khrennikov-Haven). |
| `syllabus/build_syllabus.js` | DONE | Node.js script using the `docx` package to regenerate the syllabus. Edit and rerun if the curriculum needs revision. |

**Acquisition status as of last revision:** All 31 primary books are NEED (not in literature folder). 5 YouTube transcripts are TRANSCRIPT (in folder, useful as auxiliary). The literature folder contains Islamic-economics applied/finance work (Askari, Mirakhor, Iqbal, Visser, Islahi) that is NOT load-bearing for this project.

---

## 4. Critical decisions made and the reasoning behind them

These decisions shape the work and should not be reversed without serious consideration. Each is an active commitment, not a default.

### 4.1 Splitting the project into "metaphysics" and "heterodox economics"

The original Hidden Architecture / Volume 0 draft (in `hidden_architecture/volume0/`) mixed two distinct registers:
- **Genuine metaphysics**: claims about being, intention, the relation between Manifest and Unseen
- **Applied/heterodox economics**: ergodicity for *riba* (Ch. 13), network theory for family provision (Ch. 11), behavioral mediation for *barakah* (Ch. 14, 15)

The applied chapters could exist in a non-Islamic mathematical economics paper. They are valuable but they are not metaphysics. Mixing the two registers diluted both. The new `metaphysics_book/` keeps only the metaphysical work; the applied work is consigned to a planned separate companion volume.

**For the RA:** if you find yourself reaching for ergodicity, Bouchaud-Mezard preferential attachment, debt-deflation theorems, or behavioral feedback loops — stop. Those belong in the heterodox-economics companion, not here.

### 4.2 Restricting the apparatus to scientific authority only

An earlier draft of the project considered using broader philosophical traditions (Whitehead, Heidegger, Kastrup) as load-bearing apparatus. After consideration this was ruled out:

- Philosophical traditions don't carry the kind of authority that compels assent across schools of thought
- A reader from a scientific worldview can dismiss philosophical apparatus; they cannot dismiss QM
- The Akbarian doctrines themselves provide all the philosophical content needed; we don't need Whitehead's vocabulary on top

**For the RA:** when writing, the apparatus you draw on must be either (a) the foundations of QM, (b) the Penrose-Gödel argument, or (c) the Akbarian tradition itself. Anything outside that should be in passing or in footnotes.

### 4.3 The (B)-not-(A) methodological position

We do NOT claim:
> (A) Quantum mechanics proves the Akbarian doctrines.

We DO claim:
> (B) Quantum mechanics, by what it has been forced to admit, has cleared the conceptual ground that classical materialism had foreclosed. Akbarian metaphysics can now be articulated in a vocabulary contemporary readers can engage with.

The (A) claim is bad epistemology and would invite legitimate perennialist objection. The (B) claim is defensible. Chapter 1 makes this distinction explicit; subsequent chapters must maintain it.

**For the RA:** any sentence that begins "Bell's theorem proves that…" or "Quantum mechanics shows that consciousness…" needs to be rewritten in (B)-form.

### 4.4 Renaming and other stylistic decisions

- The book's working title is *The Metaphysics of Islamic Economics* (NOT "The Hidden Architecture" — that name was rejected as too Joe-Dispenza-adjacent)
- Public-facing label on the project's website is "Metaphysics" (was briefly "Philosophy" and reverted; see git log on that conversation)
- Transliteration: use plain Latin letters, no Unicode diacritics. Write "Ibn Arabi" not "Ibn ʿArabi", "Sadra" not "Ṣadrā", "wahdat al-wujud" not "waḥdat al-wujūd". The custom `\arb{}` macro italicizes Arabic terms; use it consistently.
- Voice: write in third-person impersonal ("the book argues," "this chapter develops"); avoid first-person and avoid em-dashes wherever possible.
- "Allah" and "God" are interchangeable in the text but use the term that fits the immediate scholarly register; "the Real" (`al-Haqq`) is the Akbarian-philosophical term and is preferred when discussing `wujud`/`tajalli`.

---

## 5. Chapter outline with notes for each

What follows is the working outline for the 15 chapters that remain to be written. Chapter 1 is in `part1/chapter1.tex` and serves as the methodological keystone — read it first, then this outline.

### Part I — The Question

#### Chapter 2: The Two Layers — Manifest and Unseen

**Aim:** Establish the two-layer ontology (`shahada`/`ghayb`) as the operative Islamic frame within which the metaphysical concepts are originally formulated. This is the chapter that moves from "we will use a two-layer ontology" (asserted in Chapter 1) to "this is what the Quranic and prophetic tradition actually says about the two layers" (substantiated here).

**Key sources to engage:**
- Quranic verses on `ghayb`: 6:59, 5:109, 7:188, 23:92, 27:65, 49:18, 59:22, 72:26
- Verses on `shahada` and `'ilm al-shahada`: cited above and the parallel formulations
- Hadith on the relation between Manifest and Unseen
- Akbarian classifications of the worlds (`'alam al-mulk`, `'alam al-malakut`, `'alam al-jabarut`, `'alam al-lahut`) — Chittick *Sufi Path*, ch. 1–2
- Ibn Arabi on the *Five Divine Presences* (`al-hadarat al-khams`)

**What this chapter does NOT do:** it does not yet deploy QM. It establishes the indigenous two-layer ontology so that, when we later show QM has reopened space for that ontology, the reader knows what was being foreclosed.

**Length target:** ~20 pages.

#### Chapter 3: Why Classical Apparatus Fails for Metaphysical Concepts

**Aim:** Develop, in detail, the case that the classical modern apparatus (deterministic local materialism inherited from Galileo, Descartes, Newton) is *categorially incapable* of articulating the two-layer ontology. Not merely difficult; categorially incapable.

**Key sources to engage:**
- Mirowski *More Heat Than Light* (1989) on how 19th-century economics inherited a 19th-century mechanical worldview
- Nasr *Knowledge and the Sacred* (1981), particularly chapters on the desacralization of modern science
- Selected passages from Galileo, Descartes, Newton showing how the worldview was constructed
- Brief preview of why QM's later overturning of this worldview matters for our argument (without yet doing the full QM treatment — that's Chapter 5)

**Length target:** ~20 pages.

#### Chapter 4: The Sources — Textual and Akbarian

**Aim:** Brief scholarly orientation to (a) the Quranic and hadith corpus we will draw on, and (b) the Akbarian tradition (Ibn Arabi, Mulla Sadra, Shah Wali Allah). NOT a full exposition of Akbarian metaphysics — that's Chapter 7. This chapter is about *who* and *where the sources are*, with brief biographical and intellectual orientation.

**Length target:** ~15 pages.

### Part II — The Apparatus

#### Chapter 5: Quantum Foundations and the Measurement Problem

**Aim:** Develop the QM apparatus carefully and at appropriate technical depth. Cover:

1. The basic structure of QM (Hilbert space, states, observables, the Born rule) at the level a non-physicist reader can absorb
2. The measurement problem
3. The live interpretive landscape: Bohmian mechanics, Many-Worlds, QBism, GRW, consciousness-causes-collapse
4. Bell's theorem and the loophole-free experiments of 2015 — non-locality as established result
5. What QM forces us to give up (classical materialism, locally-causal-deterministic ontology)
6. **Important:** explicitly distinguish the project's use of QM from the popular "QM disproves God" reading

This is the **most technically demanding chapter** in the book. It must be precise, not handwavy. Use the `notationbox` environment for definitions of technical terms; use `principlebox` for the key claims being established.

**Reading required:** Townsend's *Modern Approach to Quantum Mechanics* (Phase 2 of the syllabus); Maudlin's *Philosophy of Physics: Quantum Theory*; Albert *Quantum Mechanics and Experience*. The RA should not write this chapter without that background.

**Length target:** ~30 pages.

#### Chapter 6: Non-Computability and the Reality of Intention

**Aim:** Develop the second scientifically authoritative apparatus — the Penrose-Gödel argument from incompleteness to the non-algorithmic character of mathematical understanding. Establish the precise mathematical sense in which understanding (and *a fortiori* `niyyah`/intention) is not a computational state.

**Key sources:**
- Smith *Introduction to Gödel's Theorems*
- Sipser *Introduction to the Theory of Computation* (Turing machines, halting problem)
- Penrose *The Emperor's New Mind* (Gödel-and-mind chapters)
- Penrose *Shadows of the Mind* (the more rigorous version of the argument)
- Solomon Feferman's 1996 critical engagement with Penrose (open access; should be cited and engaged with — Penrose's argument has serious critics and we should not pretend otherwise)

**Length target:** ~25 pages.

#### Chapter 7: Akbarian Metaphysics — Wujud, Tajalli, the Divine Names

**Aim:** Full systematic exposition of the Akbarian metaphysical framework. *Wujud* (Being itself), `wahdat al-wujud` (unity of Being), `tajalli` (self-disclosure), the divine names (`asma'`), `'alam al-mithal` (the imaginal world), `insan al-kamil` (the perfect human). This is the chapter where the indigenous synthesis is laid out.

**Key sources:** Chittick *The Sufi Path of Knowledge*, *The Self-Disclosure of God*; Murata *The Tao of Islam*; Izutsu *Sufism and Taoism*; Hermansen's translation of Shah Wali Allah; Ibn Arabi's *Fusus al-Hikam* (read after secondary literature).

**Length target:** ~35 pages. This is the longest chapter in the book.

### Part III — Worked Treatments

The Part III chapters apply the apparatus from Part II to the central concepts. Each chapter follows roughly the same structure:

1. The concept's textual foundation (Quranic, hadith, classical jurisprudence)
2. The concept's Akbarian articulation
3. The concept articulated using the QM and Penrose-Gödel apparatus from Part II
4. What the apparatus illuminates that classical-mechanistic readings could not
5. Brief note on what the heterodox-economics companion volume will do with the same concept (so readers know the applied work exists but is treated separately)

#### Chapter 8: Niyyah as Non-Computable Ground

The foundational concept. Argues `niyyah` is not a computational state because Penrose-Gödel establishes that understanding is non-algorithmic. **Length:** ~25 pages.

#### Chapter 9: Qadar and the Quantum Structure of Actualization

Argues `qadar` (divine determination) is best articulated using the QM measurement problem: actualization-from-potentiality at the level of being, with the determined-in-the-Unseen mapping onto the structure of the wave function (with appropriate caveats). Engage Bohmian and QBist readings; both are friendly. **Length:** ~25 pages.

#### Chapter 10: Rizq from the Unseen

`Rizq` as the manifest appearance in spacetime of provision determined in the Unseen. The classical "guaranteed *rizq*" passages (Quran 11:6, 51:22-23, 29:60) read in light of the apparatus. **Length:** ~25 pages.

#### Chapter 11: Barakah as Coupling

`Barakah` as the *thickness of manifestation* — how much of the underlying field of divine names is disclosed in a given event. NOT as a multiplier on outcomes. (Chapter 1's worked illustration sketches this; Chapter 11 develops it in full.) **Length:** ~25 pages.

#### Chapter 12: Halal and Haram as Modes of Engagement with the Real

`Halal` and `haram` as different *structural modes* of engagement, not just legal categories. Aligned vs. misaligned disclosure. **Length:** ~20 pages.

#### Chapter 13: Riba as Ontological Inversion

`Riba` as the metaphysical inversion in which capital is claimed to grow autonomously, attributing creative power to a created thing — a structural form of *shirk* expressed in economic action. The visible debt-deflation consequences are downstream of the inversion; the prohibition is at the level of being. **Length:** ~25 pages.

### Part IV — Synthesis

#### Chapter 14: The Unified Metaphysical Framework

Pulls together the threads from Part III. Identifies the common patterns: the role of `niyyah`, the structure of `tajalli`, the relation between Manifest and Unseen running through every concept treated. **Length:** ~20 pages.

#### Chapter 15: Implications for the Formal Theory (Path to Volume I)

What this metaphysical foundation implies for the *formal* economic theory that Volume I will build. Preview of the choice theory, equilibrium theory, welfare theory under Islamic ontology. **Length:** ~15 pages.

#### Chapter 16: What This Book Has and Has Not Done

Honest accounting. What the book has accomplished, what it has deliberately omitted (the heterodox-economics companion's territory, applied econometric work, etc.), what remains for further work. **Length:** ~10 pages.

---

## 6. Working conventions

### 6.1 LaTeX setup

Compile with: `pdflatex main.tex` (run twice for cross-references and TOC).

The preamble in `main.tex` defines:

- **Custom commands:**
  - `\arb{...}` — italicizes Arabic terms (use this everywhere)
  - `\Quran{...}` — formats Quran citations (e.g., `\Quran{6:59}` → "Quran 6:59")
  - `\hadith{...}` — small caps for hadith references
  - `\xref{label}` — internal cross-reference (e.g., `\xref{sec:two-layers}`)

- **Environment boxes:**
  - `conceptbox{title}` — green-bordered box for definitions / framings
  - `principlebox{title}` — dark-bordered box for the chapter's load-bearing claims
  - `summarybox{title}` — green-shaded box for chapter summaries
  - `contrastbox{title}` — for "what this is not" or "two views compared"
  - `notationbox{title}` — for technical notation introductions

- **Theorem environments** (auto-numbered per chapter): `definition`, `proposition`, `theorem`, `lemma`, `corollary`, `example`, `remark`, `claim`, `thesis`

### 6.2 Transliteration

**Rule:** Use plain Latin letters with no Unicode diacritics.

| Wrong | Right |
|---|---|
| Ibn ʿArabi | Ibn Arabi |
| Mulla Ṣadrā | Mulla Sadra |
| waḥdat al-wujūd | wahdat al-wujud |
| `al-Ḥaqq` | al-Haqq |
| qadr | qadar (use the more common form consistently) |

The `pdflatex` engine doesn't natively handle the `ʿ` (U+02BF) character and will refuse to compile. If you find Unicode diacritics in a draft, strip them before compiling.

### 6.3 Voice and register

- Write in the third-person impersonal: "the book argues," "this chapter develops," "the position taken here is…"
- Avoid first-person ("I," "we") except in explicit methodological/programmatic statements
- **Avoid em-dashes (—).** Use commas, parentheses, periods, or colons instead. The user has flagged this as a voice rule.
- Avoid breathless rhetoric. Write at the register of a serious treatise (Mas-Colell-Whinston-Green for the formal sections; Aristotle's *Metaphysics* for the foundational sections), not popular-science prose.
- Engage critics by name where appropriate (Feferman on Penrose; Nasr on QM-and-religion; Mirowski on physics-economics borrowing). The book should not pretend its position is undisputed.

### 6.4 Citation style

The book will eventually use a proper bibliography (`bibliography.bib`). For now, write inline parenthetical citations (Author Year) in the prose; we'll convert to BibTeX once the chapters are drafted. The original `hidden_architecture/volume0/bibliography.bib` is a reasonable starting reference.

---

## 7. Reading priorities for the RA before writing

Before drafting any chapter, the RA should have:

**Mandatory before any writing:**
1. Chapter 1 of the main treatise (`part1/chapter1.tex`) — read three times, internalize the methodological discipline
2. The preface (`frontmatter/preface.tex`)
3. This handoff note end-to-end
4. The reading curriculum (`syllabus/reading_curriculum.docx`) — at least to know what's there

**Mandatory before writing Part I (chapters 2–4):**
- Adamson, *Philosophy in the Islamic World* (curriculum Phase 5)
- Chittick, *The Sufi Path of Knowledge*, chapters 1–4
- Selected Quranic passages on `ghayb` (verses listed in §5 above)
- Mirowski, *More Heat Than Light*, chapters 1–4 (for Chapter 3)

**Mandatory before writing Part II (chapters 5–7):**
- Townsend or equivalent QM textbook (curriculum Phase 2) — through the foundations chapters
- Albert, *Quantum Mechanics and Experience* — full
- Smith, *An Introduction to Gödel's Theorems* — full
- Penrose, *The Emperor's New Mind* — Gödel/mind chapters at minimum
- Chittick, *The Sufi Path of Knowledge* and *The Self-Disclosure of God* — both full

**Mandatory before writing Part III (chapters 8–13):**
- The relevant Akbarian primary sources via Chittick translations
- Quranic passages for the specific concept being treated
- Hermansen on Shah Wali Allah for any chapter touching social/economic concepts
- The corresponding chapter in the original `hidden_architecture/volume0/` for reference (these chapters are the source the RA is rewriting in metaphysics-only form)

**Strongly recommended:** Note 01 (`notes/note01_ai_durability.tex`) for tone and register; Mirowski (background); Orrell *Quantum Economics* (closest existing project, useful to read for both the parallel and the depth difference).

---

## 8. The relation to the original "Hidden Architecture" draft

The `theology/hidden_architecture/volume0/` directory contains an **earlier and superseded** draft of the project. It mixes metaphysical work with applied/heterodox-economics work and was set aside when we recognized that the mixing was diluting both registers.

**When to consult it:**
- For Part III chapters, the original `volume0/part3/` contains chapter drafts on the same concepts (`rizq`, `barakah`, `qadar`, etc.). The metaphysical *framing* in those drafts is sometimes useful as a starting point. The applied/mathematical content (ergodicity, network theory, behavioral mediation) is NOT to be carried over into the metaphysics book — it belongs in the planned heterodox-economics companion.
- For the bibliography (`hidden_architecture/volume0/bibliography.bib`).
- For style consistency (the original LaTeX preamble was the basis for the new one).

**When NOT to consult it:** Don't use it as a model for the methodological discipline. The discipline in this new book is tighter than the original draft's. If you find yourself thinking "the original did it this way," double-check that the original wasn't doing something we have since deliberately excluded.

---

## 9. Open questions and future directions

Things that are not yet resolved and that the RA should keep an eye out for:

1. **The Bohmian vs. QBist choice for `qadar`.** Chapter 9 will need to take a position (or remain agnostic) on which QM interpretation best articulates the `qadar` structure. Both are friendly to the Akbarian frame. Bohmian gives a cleaner determinism-with-non-locality reading; QBism gives a cleaner agent-relative reading that maps better onto `niyyah`'s constitutive role. Could go either way; could stay agnostic.

2. **How much technical QM to include.** Chapter 5 is the technical core. There's a risk of either too little (handwavy) or too much (alienating non-physicist readers). The current intent is to include enough that a serious reader without prior physics training can follow the foundational arguments after reading the relevant syllabus chapters; not enough to make the chapter into a textbook of QM.

3. **Engagement with critics.** The book should engage Feferman on Penrose, Nasr on QM-and-religion, and the perennialist objection more broadly. Where these engagements happen — in dedicated subsections, in footnotes, in a separate methodological appendix — is not yet decided.

4. **The status of `qalb`.** Flagged from the "Heart" YouTube video. The Akbarian *qalb* tradition is real and load-bearing for any serious treatment of `niyyah`. A subsection of Chapter 8 (or Chapter 11 on `barakah`) probably needs to discuss `qalb`-as-mirror. This is currently a placeholder; develop with Chittick's *Sufi Path* chapters on the heart.

5. **The relation to a planned Volume I.** Chapter 15 ("Path to Volume I") will preview the formal economic theory that builds on this metaphysical foundation. The substance of that preview depends on choices about Volume I's structure that are not yet made. Treat Chapter 15 as a placeholder until later.

6. **Companion notes 02–06.** Listed in §3.2. Each is independently developable when relevant material crosses the project's path.

---

## 10. Build / compile workflow

```bash
# Compile the main treatise (run twice for cross-references)
cd theology/metaphysics_book
pdflatex main.tex
pdflatex main.tex

# Compile a note (each note is standalone, has its own preamble)
cd notes
pdflatex note01_ai_durability.tex
pdflatex note01_ai_durability.tex

# Regenerate the syllabus docx
cd syllabus
NODE_PATH=/opt/homebrew/lib/node_modules node build_syllabus.js
```

LaTeX builds require `pdflatex` (TeX Live 2025 or similar). The syllabus build requires Node.js and the global `docx` npm package (`npm install -g docx`).

Build artifacts (`.aux`, `.log`, `.out`, `.toc`, compiled `.pdf` files) are gitignored. Do not commit them. Source files (`.tex`, `.bib`, `.js`, `.docx` for the syllabus only) are tracked.

---

## 11. Git workflow

Repository: `https://github.com/islamiceconomics/islamiceconomics.github.io.git` (the user's project repo).

**What's tracked under `theology/metaphysics_book/`:**
- All `.tex` source files
- `notes/note*.tex` and any future `.tex` notes
- `syllabus/build_syllabus.js`
- `syllabus/reading_curriculum.docx` (force-added past `*.docx` ignore rule)
- This `HANDOFF.md` file

**What's NOT tracked (gitignored):**
- All compiled `.pdf` files
- LaTeX build artifacts (`.aux`, `.log`, `.out`, `.toc`)
- Anything else under `*.docx`, `*.pdf` patterns

**Important:** the `theology/` directory is NOT deployed to the public website. The GitHub Pages workflow only ships content from `Website/`. So the metaphysics book is private to the repo for collaboration purposes; it does not appear on `islamiceconomics.github.io` or `islamiceconomics.org`.

**Commit hygiene:**
- Use clear, descriptive commit messages (the user has previously expressed dissatisfaction with auto-generated "asda"-style commits)
- Commit each substantive piece of work (a chapter draft, a methodological revision, a note) as its own commit
- Do not commit speculative or experimental work without flagging it as such in the message

---

## 12. Project context

This work is part of the broader Islamic Economics project (`islamiceconomics.org` / `islamiceconomics.github.io`). The metaphysics book is currently the *most foundational* piece of intellectual work in the project. It is positioned as prior to the formal economic theory (Volume I, planned), the principles textbook (already on the website under "Foundations"), and the various applied research lines (DSGE country models on the "Theory" page; the planned heterodox-economics companion volume).

The project owner has a PhD in economics and is working through the curriculum in `syllabus/reading_curriculum.docx` to build up the physics, philosophy, and Akbarian background needed to write Part II and Part III in his own voice. The expected timeline for that curriculum is 18–24 months at sustained part-time pace.

The RA's role, while that curriculum is being completed, is to:
1. Draft Part I (chapters 2–4), which is mostly textual and historical work and does not require the full QM/Akbarian apparatus
2. Develop additional companion notes as relevant material is encountered
3. Refine and polish what's already drafted
4. Build out the bibliography
5. Prepare Part II chapters for collaborative writing once the curriculum is far enough along

The RA should NOT:
1. Draft Part II or Part III chapters without the curriculum-required background, since these chapters require precise technical work
2. Make methodological revisions to the project's discipline without consultation
3. Expand the scope to include the heterodox-economics material
4. Allow the work to drift into popular-science register or quantum-mysticism register

---

## Final note

This project is unusual. It sits at the intersection of foundations of physics, mathematical logic, Islamic metaphysics, and economic theory. There is no pre-existing template for what it is doing. The methodological discipline described in §1 and §4 is the project's most important asset — without it, the work would collapse into either popular science or theological apologetics, neither of which is what this is.

The RA's job is to help build the work while preserving that discipline. When in doubt, err on the side of the discipline. Ask, when uncertain, before introducing new apparatus or registers. The project owner is reachable for methodological consultation.

Welcome to the project. Read carefully. Write slowly. The first chapter took weeks to get the methodological framing right; there is no need to hurry the others.

— *Working draft of handoff note. Update as the project develops.*
