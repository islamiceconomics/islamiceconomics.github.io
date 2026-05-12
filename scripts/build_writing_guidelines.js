// Build writing guidelines docx for social posts.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, Footer, Header, PageNumber,
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "888888" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerFill = "1A5C3A";
const altFill = "FAF8F4";
const dontFill = "FBE9E7";    // light red tint for "don't" examples
const doFill = "E6F0E9";      // light green tint for "do" examples
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function p(text, opts = {}) {
  const { bold = false, italics = false, size = 22, color, after = 100, before = 0 } = opts;
  return new Paragraph({
    spacing: { after, before },
    children: [new TextRun({ text, bold, italics, size, color })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function h(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true })],
  });
}

// Side-by-side don't/do comparison table
function comparisonTable(rows) {
  const colWidths = [4680, 4680];
  const headerRow = new TableRow({
    tableHeader: true,
    children: ["Avoid (AI house style)", "Prefer (natural voice)"].map((t, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: headerFill, type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF" })] })],
    })),
  });
  const dataRows = rows.map((row) => new TableRow({
    cantSplit: true,
    children: [
      new TableCell({
        borders,
        width: { size: colWidths[0], type: WidthType.DXA },
        shading: { fill: dontFill, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: row.bad, size: 20 })] })],
      }),
      new TableCell({
        borders,
        width: { size: colWidths[1], type: WidthType.DXA },
        shading: { fill: doFill, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: row.good, size: 20 })] })],
      }),
    ],
  }));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// Pattern-detection table
function patternTable(rows) {
  const colWidths = [2800, 6560];
  const headerRow = new TableRow({
    tableHeader: true,
    children: ["Pattern", "What it looks like / why to avoid"].map((t, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: headerFill, type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF" })] })],
    })),
  });
  const dataRows = rows.map((row, idx) => new TableRow({
    cantSplit: true,
    children: [
      new TableCell({
        borders,
        width: { size: colWidths[0], type: WidthType.DXA },
        shading: { fill: idx % 2 === 0 ? "FFFFFF" : altFill, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: row.name, bold: true, size: 20 })] })],
      }),
      new TableCell({
        borders,
        width: { size: colWidths[1], type: WidthType.DXA },
        shading: { fill: idx % 2 === 0 ? "FFFFFF" : altFill, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: row.body, size: 20 })] })],
      }),
    ],
  }));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

const aiPatterns = [
  {
    name: "Triple punch",
    body: "Three short declarative sentences in a row, each landing harder than the last. Often parallel in structure. Example: \"The work is the work. The discipline is the discipline. The price is the price.\" Reads as a tweet trying to be wisdom. Almost always AI.",
  },
  {
    name: "X is not Y, it is Z",
    body: "Setup, false contrast, reveal. \"The Silk Road was not a single road. It was a network of trust.\" The pattern was viral in pre-2020 Twitter writing and models absorbed it. It is now the single biggest tell.",
  },
  {
    name: "Punchy snap close",
    body: "Ending the post on a short, hammer-like phrase that summarizes the wisdom. \"The question is whether it is sustainable.\" \"That is the failure mode.\" Real writing usually trails off into the thought rather than punching out of it.",
  },
  {
    name: "Parallel triplets",
    body: "Three clauses in parallel grammatical structure used for rhythm. \"Bell killed local realism. The measurement problem reopened consciousness. Penrose ruled out algorithmic mind.\" Reads as enumeration for impact, not thinking.",
  },
  {
    name: "Em dashes for rhythm",
    body: "Using em dashes to create breath and emphasis. \"The whole thing, every part of it, was rigged for one outcome.\" Em dashes are not wrong, but the pattern of using them every few sentences is an AI tell. Prefer commas, periods, or parentheses.",
  },
  {
    name: "Sentence fragments for impact",
    body: "Standalone fragments after a complete sentence to add weight. \"He never paid. Not once. Not ever.\" In context, fragments can work. As a recurring rhythm, they read as performance.",
  },
  {
    name: "Listicle reveals",
    body: "Numbered or bulleted lists where the last item is the punchline. \"Three reasons this matters: A, B, and finally C, the real reason.\" The structure is engineered, not organic.",
  },
  {
    name: "Aphorism manufacturing",
    body: "Trying to manufacture a quotable line. \"Methodological discipline matters more than rhetorical reach.\" Sometimes the line is even true. The mode of writing where every paragraph terminates in a portable quote is artificial.",
  },
];

const examples = [
  {
    bad: "Mansa Musa's pilgrimage was not just a journey. It was an economic event. It crashed the Egyptian economy for a decade. The Silk Road was not a single road. It was a network of trust.",
    good: "Mansa Musa's 1324 pilgrimage to Mecca brought enough gold into Cairo that Egyptian prices stayed elevated for the next decade. The Mamluk treasury kept careful records of the disruption.",
  },
  {
    bad: "Modern physics does not prove Islamic doctrines. Bell killed local realism. The measurement problem reopened consciousness. Penrose ruled out algorithmic mind. The classical picture is dead.",
    good: "Modern physics has not proven any Islamic doctrine, and it would be a category mistake to claim otherwise. What it has done, through Bell's theorem and a few related results, is undermine the classical picture of reality that was once assumed to be settled. The picture is no longer settled.",
  },
  {
    bad: "Islamic banking works. The form changed. The substance did not.",
    good: "Islamic banking demonstrably works as a business, but whether the substance is different from conventional banking is a separate question and the harder one. The cash flows in many cases are identical.",
  },
  {
    bad: "Read Chittick. Read Albert. Read Adamson. No shortcuts. The work is the work.",
    good: "If you want to engage Akbarian metaphysics in English, the place to start is Chittick's Sufi Path of Knowledge alongside his Self-Disclosure of God. For the philosophical implications of quantum mechanics, start with David Albert. There is no real shortcut to the apparatus.",
  },
  {
    bad: "Question: what is rizq? Answer: not income. Not output. A self-disclosure of divine action.",
    good: "What is rizq? The economic reading treats it as income or output. The classical tradition treated it as the actualization of provision determined in the Unseen. These are different objects of study with different methods.",
  },
];

const dos = [
  "Pick one observation per post and state it plainly. If you find yourself trying to fit three observations into a single post, you have three posts, not one.",
  "Let sentences run long when the thought wants the length. OrangeBook posts often have a single sentence that runs the entire 280 character allowance. Compression is not the same as quality.",
  "Use the specific over the general. \"Mansa Musa in 1324\" beats \"a medieval African king.\" Specific facts carry their own weight without needing a wisdom frame around them.",
  "Trail off into the thought rather than punch out of it. The last sentence of a good post often opens a question or leaves a residue, rather than closing a case.",
  "Write the way you would explain it to one specific person who is curious but not an expert. Not to a crowd, not to a reader who needs to be impressed.",
  "If you are tempted to make a parallel structure (three of anything, in particular), try writing it as one continuous sentence instead and see if it reads better.",
];

const donts = [
  "Do not use em dashes. Periods, commas, or parentheses do the same work without the AI signature.",
  "Do not end a post with a snappy summary phrase. The post should not feel finished in a press-release way.",
  "Do not use \"X is not Y, it is Z\" structures. They are the single most recognizable AI tell.",
  "Do not use three short clauses in a row for rhythm. Two is fine. Three almost always reads as performance.",
  "Do not manufacture aphorisms. If a sentence sounds quotable, ask whether it actually says something specific or whether it just sounds wise.",
  "Do not start posts with \"In a world where\" or similar phrases. They are template openers.",
  "Do not end posts with rhetorical questions used as closes. They land as setup for a TED talk.",
  "Do not use \"the truth is\" or \"the reality is\" as transitions. They are filler that signals AI uncertainty.",
];

const orangebookExamples = [
  "You just need to take a good look at all the older people who didn't get to live the life they wanted, and it will become obvious that the causes are always the same, generation after generation.",
  "People are always surprised by how much mental clarity they suddenly gain once they are financially secure.",
  "Anxiety often happens when your level of intelligence isn't aligned with your level of courage. You know what you can do, but you never do it. That's anxiety.",
  "There are eight billion people out there, nearly no one knows that you exist, the few people who do are busy dealing with their own problems, they don't have time to think about you at all: rest assured, no one is judging your mistakes, take some risks, go build the life you want.",
];

// -----------------------------------------------------------------------------
// Build document
// -----------------------------------------------------------------------------

const body = [
  // Title
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "Writing Guidelines", bold: true, size: 56, color: "1A5C3A" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "for social posts and short-form writing", italics: true, size: 32, color: "1A5C3A" })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: "Project house style. Working draft.", size: 22, color: "555555" })],
  }),
  new Paragraph({ children: [new PageBreak()] }),

  // Why this exists
  h("Why this exists", HeadingLevel.HEADING_1),
  p("Most short-form writing on the public internet now uses a recognizable rhetorical style. It is the style produced by ChatGPT and Claude when asked to write a tweet or a thread. It works in the sense that it produces fluent, confident-sounding text. It does not work in the sense that anyone who has read more than a hundred AI-generated posts can spot it immediately, and the recognition becomes a reason to skim past."),
  p("This document is the project's house style for short-form writing. It is built around a specific contrast: the AI house style on one side, the kind of plain natural writing it is trying to replace on the other. The plain natural writing is harder to produce on demand, but it ages better and it is what serious readers respond to."),
  p("The guidelines apply to all three social calendars in this project. They also apply to any longer writing where the AI style would feel out of place. The goal is not stylistic perfection. It is the avoidance of a small number of high-recognition patterns that signal generated text."),

  // The model
  h("The reference voice", HeadingLevel.HEADING_1),
  p("The voice the project aims for is informed by a Twitter account called OrangeBook, whose posts the user has historically liked. The relevant features of that voice are these: one observation per post, plain everyday language, sentences allowed to run long when the thought needs the length, no punchy contrast structures, no reveal closes, no em dashes, and a willingness to leave the thought open rather than closing it with a snap."),
  p("Four representative OrangeBook posts, included for calibration:"),
  ...orangebookExamples.map((ex) => new Paragraph({
    spacing: { after: 120 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: "“" + ex + "”", italics: true, size: 21, color: "333333" }),
    ],
  })),
  p("These posts do not sound like a tweet trying to be wisdom. They sound like a person noticing something and stating it. That is the target."),

  // Patterns to avoid
  h("Patterns to avoid", HeadingLevel.HEADING_1),
  p("These are the high-recognition patterns that flag short-form writing as AI-generated. They are not absolute prohibitions, but they should be rare in our posts. If two or more appear in the same post, the post almost certainly needs rewriting."),
  patternTable(aiPatterns),

  // Side by side examples
  new Paragraph({ children: [new PageBreak()] }),
  h("Side by side examples", HeadingLevel.HEADING_1),
  p("Each row below shows the same observation in two versions. The left version has one or more of the patterns above. The right version states the same thing in a more natural voice. Read both aloud if possible. The difference is mostly audible."),
  comparisonTable(examples),

  // Positive guidelines
  new Paragraph({ children: [new PageBreak()] }),
  h("Positive guidelines", HeadingLevel.HEADING_1),
  p("Things to actively do, in roughly decreasing order of importance:"),
  ...dos.map((d) => bullet(d)),

  h("Things to actively avoid", HeadingLevel.HEADING_2),
  ...donts.map((d) => bullet(d)),

  // Platform-specific
  h("Platform-specific notes", HeadingLevel.HEADING_1),

  h("X (Twitter)", HeadingLevel.HEADING_2),
  p("Under 280 characters for standard accounts. Aim for 180 to 250 characters in practice. Short posts are easier to write in a natural voice than long ones, because there is no room for the AI tells to develop. Pick one fact or observation. State it. Stop."),
  p("Avoid using X for the metaphysics track. Short-form is structurally hostile to the kind of careful articulation that metaphysical writing requires, and the medium pulls the writing toward exactly the patterns this document is trying to avoid."),

  h("Threads", HeadingLevel.HEADING_2),
  p("Up to 500 characters. The length gives room to develop one observation more fully than X allows. Use the room for nuance, not for additional observations. A 500-character post should still be about one thing, with the extra space spent on context or implication rather than on a second point."),
  p("Threads is currently the best fit for the metaphysics track on the public-facing side. The longer format permits a sentence to breathe and a thought to land without being compressed into the AI rhythm."),

  h("Future: Substack or blog", HeadingLevel.HEADING_2),
  p("For metaphysical and methodological writing where the natural length is several paragraphs, the honest medium is a blog or Substack rather than social. The length permits the kind of slow careful prose that the project's content actually requires, and the medium does not punish slowness the way short-form does. When the metaphysics book is closer to ready, this is probably where to spin up a long-form companion."),

  // Application
  new Paragraph({ children: [new PageBreak()] }),
  h("How to use this when writing a post", HeadingLevel.HEADING_1),
  p("A practical workflow when drafting any social post:"),
  ...[
    "Write the first draft without thinking about the style. Get the observation on the page in whatever form arrives.",
    "Read it once. Find any instances of the patterns from the table above. Note them.",
    "Rewrite to remove or soften the patterns. Often this means turning three short clauses into one longer sentence, removing the punch close, replacing an em dash with a comma or a period.",
    "Read the post aloud. If a phrase sounds like a tagline, it probably is. Replace it with the underlying observation in plainer words.",
    "Ask the kaiser test. Would a careful reader who already dislikes AI-generated writing find this defensibly natural? If not, rewrite.",
    "Check character count for the target platform and the metaphysics or historical category note for context.",
  ].map((s) => bullet(s)),

  h("The kaiser test", HeadingLevel.HEADING_2),
  p("Named after the careful interlocutor in a podcast we listened to who could spot when a speaker was overclaiming. The test: imagine a careful reader who has read a lot of AI output and is bored of it. Read the post through their eyes. Would they keep reading, or skim past? Posts that fail this test almost always have an identifiable pattern from the table above. Find the pattern. Replace it."),

  // Final reminder
  h("A final reminder about pace and volume", HeadingLevel.HEADING_1),
  p("Better to post less often in a natural voice than more often in an AI voice. The discipline of writing slowly is the same discipline as the rest of the project. The metaphysics book is built around the principle that methodological care matters more than rhetorical reach. Short-form writing is one of the places where the principle is tested most clearly, because the medium rewards the opposite. The right pace is whatever pace allows the writing to keep its voice."),

  new Paragraph({
    spacing: { before: 400 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Working draft. Revise as the voice settles.", italics: true, size: 20, color: "888888" })],
  }),
];

const doc = new Document({
  creator: "Islamic Economics Project",
  title: "Writing Guidelines for Social Posts",
  description: "House style and AI-tells to avoid for short-form posts",
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Calibri", color: "1A5C3A" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: "1A5C3A" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
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
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Writing Guidelines for Social Posts", italics: true, size: 18, color: "888888" })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" }),
            new TextRun({ text: " of ", size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "888888" }),
          ],
        })],
      }),
    },
    children: body,
  }],
});

const outPath = "/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My Drive/IslamicEconomics/social/writing_guidelines.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", outPath, `(${buf.length} bytes)`);
});
