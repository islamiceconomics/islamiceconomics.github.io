// Build syllabus docx for the Metaphysics of Islamic Economics project.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, Footer, Header, PageNumber, TabStopType,
  TabStopPosition,
} = require("docx");

// ----- Style helpers -----
const border = { style: BorderStyle.SINGLE, size: 1, color: "888888" };
const borders = { top: border, bottom: border, left: border, right: border };

const headerFill = "1A5C3A";    // theme green
const altFill    = "FAF8F4";    // theme cream

const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function p(text, opts = {}) {
  const { bold = false, italics = false, size = 22, color, alignment } = opts;
  return new Paragraph({
    alignment,
    spacing: { after: 100 },
    children: [new TextRun({ text, bold, italics, size, color })],
  });
}

function pMulti(runs, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment,
    spacing: { after: opts.after ?? 100 },
    children: runs,
  });
}

function h(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });
}

function statusBadge(status) {
  // status: "have" | "need" | "youtube"
  if (status === "have") {
    return new TextRun({ text: "  HAVE  ", bold: true, color: "FFFFFF",
      shading: { type: ShadingType.CLEAR, fill: "1A5C3A" } });
  }
  if (status === "youtube") {
    return new TextRun({ text: "  TRANSCRIPT  ", bold: true, color: "FFFFFF",
      shading: { type: ShadingType.CLEAR, fill: "B8962E" } });
  }
  return new TextRun({ text: "  NEED  ", bold: true, color: "FFFFFF",
    shading: { type: ShadingType.CLEAR, fill: "8B0000" } });
}

// ----- Books table builder -----
// columns: Status (1100) | Author/Title (4200) | Why / Use (3400) | Acquired? Date / Notes (660)
// total = 9360 (US Letter content width with 1" margins)

function bookTable(rows) {
  const colWidths = [1100, 4000, 2860, 1400];
  const totalWidth = colWidths.reduce((a, b) => a + b, 0); // 9360

  const headerRow = new TableRow({
    tableHeader: true,
    children: ["Status", "Book", "Use", "Notes / Date"].map((t, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: headerFill, type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF" })] })],
    })),
  });

  const dataRows = rows.map((row, idx) => {
    const fill = idx % 2 === 0 ? "FFFFFF" : altFill;
    const statusText = row.status === "have" ? "HAVE"
                     : row.status === "youtube" ? "TRANSCRIPT" : "NEED";
    const statusColor = row.status === "have" ? "1A5C3A"
                      : row.status === "youtube" ? "B8962E" : "8B0000";

    return new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          borders,
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR },
          margins: cellMargins,
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: statusText, bold: true, color: statusColor, size: 18 })],
          })],
        }),
        new TableCell({
          borders,
          width: { size: colWidths[1], type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR },
          margins: cellMargins,
          children: [
            new Paragraph({ children: [new TextRun({ text: row.author + ", ", size: 20 }),
                                       new TextRun({ text: row.title, italics: true, size: 20 })] }),
          ],
        }),
        new TableCell({
          borders,
          width: { size: colWidths[2], type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR },
          margins: cellMargins,
          children: [new Paragraph({ children: [new TextRun({ text: row.why, size: 20 })] })],
        }),
        new TableCell({
          borders,
          width: { size: colWidths[3], type: WidthType.DXA },
          shading: { fill, type: ShadingType.CLEAR },
          margins: cellMargins,
          children: [new Paragraph({ children: [new TextRun({ text: " ", size: 20 })] })],
        }),
      ],
    });
  });

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// ----- Phase data -----
const phase1 = [
  { status: "need", author: "Sheldon Axler",
    title: "Linear Algebra Done Right",
    why: "Inner-product spaces as the natural object — right preparation for Hilbert space and QM. Skip the determinant-heavy approach you may have seen in undergrad." },
  { status: "need", author: "Brown & Churchill",
    title: "Complex Variables and Applications",
    why: "Light treatment of complex analysis — enough for the complex amplitudes in QM. Skim where you remember; do problems where you don't." },
];

const phase2 = [
  { status: "need", author: "John Townsend",
    title: "A Modern Approach to Quantum Mechanics",
    why: "The textbook. Starts with spin-1/2 systems and Hilbert space — ideal pedagogical entry for someone interested in foundations rather than calculations. Do the problems." },
  { status: "need", author: "David Albert",
    title: "Quantum Mechanics and Experience",
    why: "Philosophical companion to Townsend. Short, clear, the standard text for the foundations debate. Read alongside Townsend, not after." },
  { status: "need", author: "Tim Maudlin",
    title: "Philosophy of Physics: Quantum Theory",
    why: "Concise, recent, technically precise treatment of interpretations. The cleanest single book on what QM actually claims." },
  { status: "need", author: "Adam Becker",
    title: "What Is Real?",
    why: "History of the foundations debate. Lighter reading; important for context. Save for breaks from Townsend's problem sets." },
];

const phase3 = [
  { status: "need", author: "Peter Smith",
    title: "An Introduction to Goedel's Theorems",
    why: "Best self-study book on Goedel. Smith assumes you are a sharp non-specialist. Perfect for an econ PhD." },
  { status: "need", author: "Michael Sipser",
    title: "Introduction to the Theory of Computation",
    why: "Standard CS textbook. Read the Turing-machine and decidability chapters carefully; the complexity-theory chapters are optional." },
  { status: "need", author: "Roger Penrose",
    title: "The Emperor's New Mind",
    why: "Read for the argument. Skip the Mandelbrot-set and consciousness-theory detours if pressed for time. Read the Goedel-and-mind chapters carefully." },
];

const phase4 = [
  { status: "need", author: "Alex Rosenberg",
    title: "Philosophy of Science: A Contemporary Introduction",
    why: "Textbook entry. Covers Popper, Kuhn, Lakatos, scientific realism. Foundation for the methodology of the project." },
  { status: "need", author: "Thomas Kuhn",
    title: "The Structure of Scientific Revolutions",
    why: "Read directly. Short, decisive, important for any methodological framing involving paradigm transitions." },
  { status: "need", author: "David Chalmers",
    title: "The Conscious Mind",
    why: "The hard problem of consciousness, panpsychism, dualism, naturalism. Required for the niyyah and consciousness chapters of the book." },
  { status: "need", author: "Bernardo Kastrup",
    title: "The Idea of the World",
    why: "Contemporary analytical idealism. Argues consciousness is fundamental and matter derivative — directly relevant to wahdat al-wujud." },
  { status: "need", author: "Tim Maudlin",
    title: "Quantum Non-Locality and Relativity",
    why: "Selective reading. Technical but the cleanest treatment of what Bell's theorem actually establishes." },
  { status: "need", author: "Jaegwon Kim",
    title: "Philosophy of Mind (optional)",
    why: "Textbook coverage of materialism, functionalism, mental causation. Optional supplement to Chalmers." },
];

const phase5 = [
  { status: "need", author: "Peter Adamson",
    title: "Philosophy in the Islamic World (Vol. 3 of A History of Philosophy)",
    why: "Best modern overview. Reads like a long accessible essay rather than a textbook. Start here." },
  { status: "need", author: "William Chittick",
    title: "The Sufi Path of Knowledge",
    why: "The standard scholarly work on Ibn Arabi's metaphysics. Read this carefully — it is the central reference for Part III of the book." },
  { status: "need", author: "William Chittick",
    title: "The Self-Disclosure of God",
    why: "Systematic Akbarian treatment. Companion to Sufi Path; reading them together is the right approach." },
  { status: "need", author: "Sachiko Murata",
    title: "The Tao of Islam",
    why: "Alternative entry — uses Chinese philosophical categories (yin/yang) to articulate Akbarian themes. Surprisingly clarifying." },
  { status: "need", author: "Marcia Hermansen (trans.)",
    title: "The Conclusive Argument from God (Hujjat Allah al-Baligha)",
    why: "Major Indian Akbarian work — Shah Wali Allah's most important treatise in English translation." },
  { status: "need", author: "Toshihiko Izutsu",
    title: "Sufism and Taoism",
    why: "Comparative metaphysics; older but a touchstone for the comparative method." },
  { status: "need", author: "Ibn al-Arabi",
    title: "Fusus al-Hikam (Bezels of Wisdom)",
    why: "Primary source. Read after the secondary literature; otherwise impenetrable. Austin or Beneito-Hirtenstein translation." },
];

const optionalAstro = [
  { status: "need", author: "Sean Carroll",
    title: "Spacetime and Geometry",
    why: "Best modern introduction to general relativity at the level the book would need." },
  { status: "need", author: "Steven Weinberg",
    title: "Cosmology",
    why: "Standard reference. Skim. Read selected chapters relevant to the cosmology arguments." },
  { status: "need", author: "Leonard Susskind",
    title: "The Black Hole War",
    why: "Accessible treatment of the information paradox. Good companion to the QPAPG video and the holographic-principle material." },
];

const adjacentOntology = [
  { status: "need", author: "David Orrell",
    title: "Quantum Economics: The New Science of Money (2018)",
    why: "Closest existing project to ours on the methodological side, minus Islamic specificity. Argues money has a quantum dual nature (real/virtual), markets exhibit entanglement-like correlations, value is observer-dependent. Read for what the closest neighbor is doing — and where Akbarian metaphysics gives a deeper anchor than Orrell's eclectic philosophical sources." },
  { status: "need", author: "David Orrell",
    title: "Money, Magic, and How to Dismantle a Financial Bomb (2022)",
    why: "Orrell's later, more accessible treatment. Useful as a second pass on his core argument and for the financial-system implications." },
  { status: "need", author: "Iain McGilchrist",
    title: "The Master and His Emissary (2009)",
    why: "Hemispheric attention and its civilizational consequences. Argues the modern economy reflects a left-hemisphere mode that treats reality as fragmented and decontextualized — the same mode QM has shown is inadequate to physical reality. Closer in spirit to our project's deeper ambition than Orrell's specific money-ontology." },
  { status: "need", author: "Iain McGilchrist",
    title: "The Matter With Things (2021)",
    why: "Two volumes, ~1500 pages. The most ambitious recent work taking a deep ontological position seriously and applying it to civilization-level questions. Plan for years 2-3, after the curriculum core. Engages QM, philosophy of mind, and the structure of attention." },
  { status: "need", author: "Emmanuel Haven & Andrei Khrennikov",
    title: "Quantum Social Science (2013)",
    why: "Mostly methods (quantum-like models in cognition, finance, decision theory) but Khrennikov's later philosophical writing drifts toward ontological claims. Useful for understanding the technical edge of the field." },
  { status: "need", author: "David Bohm",
    title: "Wholeness and the Implicate Order (1980)",
    why: "Foundational text for the implicate/explicate ontology. Chapter 7 applies it to social and cultural life, including capitalism. The implicate/explicate move is structurally identical to ghayb/shahada — Bohm is the cleanest non-Akbarian articulation of the same two-layer ontology." },
  { status: "need", author: "Herman Daly & John Cobb Jr.",
    title: "For the Common Good (1989)",
    why: "Not QM-based, but the closest thing to a sustained alternative-ontology economics in the modern literature. Uses Whitehead's process philosophy to ground ecological economics. Shows that alternative-ontology projects in economics can succeed if done seriously." },
  { status: "need", author: "John Milbank",
    title: "Theology and Social Theory (1990; 2nd ed. 2006)",
    why: "Theological critique of secular economics. Argues modern economics rests on theological commitments it does not acknowledge. Methodologically parallel to our project — using a sacred metaphysics to critique the ontology of contemporary economic theory — though from Anglo-Catholic Radical Orthodoxy rather than Akbarian Islam." },
  { status: "need", author: "Philip Mirowski",
    title: "More Heat Than Light (1989)",
    why: "Critical not constructive, but essential background. Shows that 19th-century economics borrowed its mathematical structure from 19th-century classical mechanics (energy as utility, conservation laws as budget constraints). Necessary for understanding why a metaphysical foundation for economic theory is possible at all." },
];

const transcripts = [
  { status: "youtube", author: "Sean Carroll",
    title: "[YouTube] Multiverse / Many-Worlds / Time / Decisions",
    why: "Companion to Phase 2. Carroll defends Many-Worlds; useful as accessible audio context for the QM interpretive landscape." },
  { status: "youtube", author: "Federico Faggin",
    title: "[YouTube] Spacetime Is the Memory of a Self-Knowing Universe",
    why: "Consciousness-fundamental ontology from a working physicist. Allied with Kastrup; useful for Phase 4 framing." },
  { status: "youtube", author: "Anonymous",
    title: "[YouTube] QPAPG (Quantum Physics and Proof of God)",
    why: "Public articulation of the QM-and-divine-attributes argument. Rigorous-leaning. Use as audience-reach reference for Phase 2 material." },
  { status: "youtube", author: "Seyyed Hossein Nasr",
    title: "[YouTube] Religion, Metaphysics, Philosophy, Sufism, Art (RMPSA)",
    why: "Perennialist position on modern thought. Phase 5 background. Pair with Knowledge and the Sacred." },
  { status: "youtube", author: "Seyyed Hossein Nasr (Nasr2)",
    title: "[YouTube] Lecture critiquing 17th-century mechanism and engaging QM",
    why: "Direct engagement with the QM-and-consciousness move. Phase 5 and methodological framing." },
];

// ----- Build document -----
const introBlock = [
  h("How to use this syllabus", HeadingLevel.HEADING_2),
  p("This syllabus is the reading curriculum that supports the new metaphysics-only book on Islamic economics. The curriculum is designed for a reader who already has graduate-level mathematical and economic training (econ PhD or equivalent) but limited exposure to physics, philosophy of mind, and the Akbarian metaphysical tradition."),
  p("The realistic time commitment is 18 to 24 months at a steady pace of about 6 to 10 hours a week. The phases are arranged in the order of dependence: math support, then quantum mechanics, then mathematical logic, then philosophy of physics and mind, and finally Islamic metaphysics. Phase 5 (Islamic metaphysics) can begin in parallel from day one, since it does not depend on the technical apparatus."),
  p("How to use the table format. Each phase has a table of books with four columns: Status (whether the book is already in the project's literature folder, or needs acquisition, or exists as a YouTube transcript), Book (author and title), Use (why this book and how to read it), and Notes / Date (left blank for you to track when you start, finish, and any reading notes)."),
  pMulti([
    new TextRun({ text: "Status legend: ", bold: true }),
    new TextRun({ text: "HAVE", bold: true, color: "1A5C3A" }),
    new TextRun({ text: " = already in your literature folder. " }),
    new TextRun({ text: "NEED", bold: true, color: "8B0000" }),
    new TextRun({ text: " = to be acquired. " }),
    new TextRun({ text: "TRANSCRIPT", bold: true, color: "B8962E" }),
    new TextRun({ text: " = YouTube transcript already in your folder; useful as auxiliary material but not a substitute for the book it complements." }),
  ]),
  p(""),
  p("On acquisition: as of this draft, none of the curriculum's primary books are in your literature folder. Your folder currently contains Islamic-economics applied/finance works (Askari et al., Iqbal-Mirakhor, Visser, Islahi on Ibn Taimiyya) and YouTube transcripts (Sean Carroll, Faggin, Nasr, QPAPG). The applied/finance works are valuable for the heterodox-economics companion volume, not for this metaphysics curriculum."),
];

const summaryTableBlock = [
  h("Phase summary at a glance", HeadingLevel.HEADING_2),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [800, 3700, 2200, 1300, 1360],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          ["Phase", "Topic", "Time", "Books", "Difficulty"].map((t, i) => new TableCell({
            borders,
            width: { size: [800, 3700, 2200, 1300, 1360][i], type: WidthType.DXA },
            shading: { fill: headerFill, type: ShadingType.CLEAR },
            margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF" })] })],
          }))
        ].flat(),
      }),
      ...[
        ["1", "Math support for physics", "2-3 months", "2", "Low (refresh)"],
        ["2", "Quantum mechanics + foundations", "4-6 months", "4", "High"],
        ["3", "Mathematical logic, non-computability", "2-3 months", "3", "Medium"],
        ["4", "Philosophy of physics, mind, science", "3-4 months", "5-6", "Medium"],
        ["5", "Islamic metaphysics", "4-6 months", "7", "Medium-High"],
        ["Opt.", "Astrophysics / cosmology", "3-4 months", "3", "Medium"],
        ["Adj.", "Adjacent — deep ontology in econ", "as needed", "9", "Medium"],
      ].map((row, idx) => new TableRow({
        children: row.map((val, i) => new TableCell({
          borders,
          width: { size: [800, 3700, 2200, 1300, 1360][i], type: WidthType.DXA },
          shading: { fill: idx % 2 === 0 ? "FFFFFF" : altFill, type: ShadingType.CLEAR },
          margins: cellMargins,
          children: [new Paragraph({ children: [new TextRun({ text: val, size: 20 })] })],
        })),
      })),
    ],
  }),
];

const sequencingBlock = [
  h("Suggested sequencing", HeadingLevel.HEADING_2),
  p("If you want to stay roughly in step with the book's apparatus chapters as they are drafted:"),
  p("- Phase 1 (math support) prepares for Chapter 5 of the book (quantum foundations)"),
  p("- Phase 2 (quantum mechanics) reads alongside Chapter 5 itself"),
  p("- Phase 3 (logic, non-computability) reads alongside Chapter 6 (non-computability and niyyah)"),
  p("- Phase 4 (philosophy) reads alongside Chapter 7 framing"),
  p("- Phase 5 (Akbarian) reads alongside Chapters 7 through 14"),
  p("Phase 5 (Islamic metaphysics) can begin in parallel from day one. You do not need physics to start reading Chittick. Often it helps to have the Islamic content settling while you absorb the technical apparatus."),
  p(""),
  h("Pace and outcome", HeadingLevel.HEADING_3),
  p("A realistic pace is 2 to 3 books per month at sustained effort, rotating among phases for variety. After 18 to 24 months you would be in a position to:"),
  p("- Read foundations-of-physics journal articles (Foundations of Physics, Studies in History and Philosophy of Modern Physics) with effort."),
  p("- Engage Chittick's translations of Ibn Arabi without depending entirely on secondary commentary."),
  p("- Recognize when contemporary philosophical writing is correctly using QM and when it is overreaching."),
  p("- Write the metaphysics chapters of the project in your own voice rather than relying on summary."),
  p("That is a working metaphysician's competence. It is well within reach for someone with your background, and the phasing above is realistic for a part-time committed reader."),
];

const skipBlock = [
  h("What to skip (for now)", HeadingLevel.HEADING_2),
  p("- Quantum field theory. Beyond what is needed for this project. If you go deeper later, Lancaster and Blundell, QFT for the Gifted Amateur, is the entry."),
  p("- Functional analysis at graduate level. Overkill for our purposes."),
  p("- Heidegger and Whitehead in primary sources. Interesting but not load-bearing under the discipline we have imposed (scientific authority only)."),
  p("- General relativity at full technical depth. Concepts are enough; mathematical detail is not."),
  p("- Original Greek philosophy in primary form (Plato, Aristotle). Read about it through Adamson and Rosenberg; do not commit time to primary texts unless a specific need arises."),
];

const finalBlock = [
  h("YouTube transcripts already in your folder", HeadingLevel.HEADING_2),
  p("These are not substitutes for the curriculum books, but they are useful auxiliary material — particularly for understanding the public conversation in which our book will land, and for hearing arguments at conversational pace before reading them at technical pace."),
  bookTable(transcripts),
  p(""),
  h("Acquisition checklist", HeadingLevel.HEADING_2),
  p("Books to acquire (all primary curriculum titles below need to be sourced). Standard channels: AbeBooks (used; cheapest for Chittick / Adamson / Murata), Amazon (new; for newer Maudlin, Becker, Kastrup), university library interlibrary loan (for Townsend, Sipser, Penrose if you do not need to own them), JSTOR / academic library access for journal articles. Several of the philosophy of mind and Akbarian titles are also available on Anna's Archive in PDF form for preview."),
  p(""),
  pMulti([
    new TextRun({ text: "A note on Chittick: ", bold: true }),
    new TextRun({ text: "The Sufi Path of Knowledge and The Self-Disclosure of God are both published by SUNY Press and are widely available used. Murata's The Tao of Islam is also SUNY. These three together form the indigenous-language core of the Akbarian curriculum — prioritize their acquisition." }),
  ]),
  p(""),
  pMulti([
    new TextRun({ text: "A note on Penrose: ", bold: true }),
    new TextRun({ text: "If you want a second perspective on the Penrose argument, Solomon Feferman's critical engagement with it (1996, 'Penrose's Goedelian argument') is available open-access online and is worth a careful reading after Penrose himself." }),
  ]),
];

const bodyChildren = [
  // Title page
  pMulti([new TextRun({ text: "Reading Curriculum", bold: true, size: 56, color: "1A5C3A" })],
    { alignment: AlignmentType.CENTER, after: 200 }),
  pMulti([new TextRun({ text: "for the Metaphysics of Islamic Economics", italics: true, size: 36, color: "1A5C3A" })],
    { alignment: AlignmentType.CENTER, after: 200 }),
  pMulti([new TextRun({ text: "An 18 to 24 month syllabus for a reader with an econ PhD", size: 24, color: "555555" })],
    { alignment: AlignmentType.CENTER, after: 600 }),
  pMulti([new TextRun({ text: "Working draft", italics: true, size: 22, color: "888888" })],
    { alignment: AlignmentType.CENTER }),
  new Paragraph({ children: [new PageBreak()] }),

  // Intro
  ...introBlock,
  ...summaryTableBlock,
  new Paragraph({ children: [new PageBreak()] }),

  // Phase 1
  h("Phase 1 — Math support for physics", HeadingLevel.HEADING_1),
  p("Time: 2 to 3 months. About 6 to 10 hours a week.", { italics: true }),
  p("You do not need much; you mostly need to refresh the right pieces. The goal is to be comfortable with finite-dimensional inner-product spaces (the natural setting for quantum mechanics' Hilbert space) and to have enough complex analysis to handle complex-valued amplitudes. Skip functional analysis. Skip measure theory. You will not need them at this level."),
  bookTable(phase1),
  p(""),

  // Phase 2
  h("Phase 2 — Quantum mechanics", HeadingLevel.HEADING_1),
  p("Time: 4 to 6 months. The technical and conceptual core of the curriculum. Do not rush this phase.", { italics: true }),
  p("By the end of Phase 2 you should be able to: derive the Bell inequality; explain the difference between Bohmian mechanics and QBism; articulate why the measurement problem is unresolved; and read foundations-of-physics journal articles with effort. Townsend is the textbook (do the problems); Albert is the philosophical companion; Maudlin is the cleanest single book on what QM actually claims; Becker is for context and history."),
  bookTable(phase2),
  p(""),

  // Phase 3
  h("Phase 3 — Mathematical logic and non-computability", HeadingLevel.HEADING_1),
  p("Time: 2 to 3 months. The second scientific authority the book leans on (Goedel-Penrose argument).", { italics: true }),
  p("This phase establishes the second pillar of the apparatus: the precise mathematical sense in which understanding (and a fortiori intention, niyyah) cannot be captured by any algorithmic procedure. Smith on Goedel is the best self-study introduction; Sipser is the standard CS treatment of Turing machines and decidability; Penrose is read for the argument itself, with selective skipping permitted for his more speculative chapters."),
  bookTable(phase3),
  p(""),

  // Phase 4
  h("Phase 4 — Philosophy of physics, mind, and science", HeadingLevel.HEADING_1),
  p("Time: 3 to 4 months. The discipline an econ PhD typically lacks; what enables you to write metaphysics rather than just gesture at it.", { italics: true }),
  p("Rosenberg is the textbook entry to philosophy of science. Kuhn is read directly. Chalmers and Kastrup together cover the consciousness-first ontology that the niyyah work draws on. Maudlin's Quantum Non-Locality and Relativity is technical but the cleanest treatment of what Bell's theorem establishes. Kim is optional supplement."),
  bookTable(phase4),
  p(""),

  // Phase 5
  h("Phase 5 — Islamic metaphysics", HeadingLevel.HEADING_1),
  p("Time: 4 to 6 months. Where the project's actual content lives. The English-language scholarship is excellent.", { italics: true }),
  p("This is the indigenous core of the project. Adamson is the broad orientation; Chittick's two volumes are the central scholarly references for Akbarian metaphysics in English; Murata provides an alternative angle through comparative metaphysics; Hermansen gives access to Shah Wali Allah; Izutsu is the comparative classic. The Fusus al-Hikam itself is read last, after the secondary literature has built the necessary apparatus."),
  bookTable(phase5),
  p(""),

  // Optional astrophysics
  h("Optional — Astrophysics and cosmology", HeadingLevel.HEADING_1),
  p("Time: 3 to 4 months. Not strictly load-bearing for the metaphysics-of-Islamic-economics project, but useful for engaging the information-conservation and holographic-principle material from the QPAPG video and for general scientific literacy.", { italics: true }),
  bookTable(optionalAstro),
  new Paragraph({ children: [new PageBreak()] }),

  // Adjacent work / deep ontology
  h("Adjacent work — deep ontology in economics", HeadingLevel.HEADING_1),
  p("Time: as needed; not core curriculum. Read selectively to understand the intellectual neighborhood the project will land in.", { italics: true }),
  p("This section maps existing work that engages economic phenomena at the deep ontological level — work that goes beyond methods-borrowing (quantum game theory, quantum cognition, etc.) to make claims about what economic reality is. The field is small and fragmented; there is no equivalent of The Emperor's New Mind for economics yet. The titles below represent the closest neighbors the project will have."),
  p(""),
  p("Three things to know about this literature:", { bold: true }),
  p("1. The field is not crowded. A serious, disciplined treatment of QM ontology and Islamic economic concepts does not duplicate existing work — it fills a gap the existing literature is aware of but has not addressed at the depth Akbarian metaphysics permits."),
  p("2. Orrell is the closest non-Islamic neighbor. Reading him is useful for understanding what the closest existing project looks like, and where Akbarian metaphysics gives a deeper anchor than his eclectic philosophical sources do."),
  p("3. McGilchrist is the closest in spirit. The Matter With Things (2021) is the most ambitious recent work taking a deep ontological position seriously and applying it to civilization-level questions including economics. Plan to read in years 2 to 3, after the curriculum core."),
  p(""),
  bookTable(adjacentOntology),
  new Paragraph({ children: [new PageBreak()] }),

  // Sequencing + skip + finals
  ...sequencingBlock,
  ...skipBlock,
  new Paragraph({ children: [new PageBreak()] }),
  ...finalBlock,
];

const doc = new Document({
  creator: "Islamic Economics Project",
  title: "Reading Curriculum for the Metaphysics of Islamic Economics",
  description: "An 18 to 24 month syllabus for a reader with an econ PhD",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Calibri", color: "1A5C3A" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: "1A5C3A" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Calibri", color: "0F2A1A" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Metaphysics of Islamic Economics — Reading Curriculum", italics: true, size: 18, color: "888888" })],
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 18, color: "888888" }),
                   new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" }),
                   new TextRun({ text: " — Working draft", italics: true, size: 18, color: "888888" })],
      })] }),
    },
    children: bodyChildren,
  }],
});

const outPath = "/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My Drive/IslamicEconomics/theology/metaphysics_book/syllabus/reading_curriculum.docx";

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath, "(" + buf.length + " bytes)");
});
