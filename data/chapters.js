// Extended chapter content for the dossier prototype
// Chapter 3 is the rich one (already in window.NOVEL.sampleChapter); we add briefs
// for ch 1, 2, 4 so chapter-to-chapter navigation feels real.

window.NOVEL_CH = {
  1: {
    n: 1,
    title: "The Saturday Error",
    epigraph: {
      text: "Most of what you think you know about that day is wrong. The mistake was Saturday — not the Tuesday after.",
      attribution: "— I. Malcolm, lecture, Santa Fe Institute, 1996",
    },
    paragraphs: [
      "On Saturday morning {{Hammond}} is allowed an hour in the aviary garden, and he uses it to die a little.",
      "The orderly stands ten paces back with the wheelchair turned away from the lake so {{Hammond}} cannot see it. He is meant to walk for the hour. The cane is a {{prop}} they let him keep. He has been told twice this week that the cane is a fall hazard, and twice this week he has agreed in the manner of someone agreeing to a tide.",
      "The peacocks in the netted dome behind him do not call. The two {{compies}} in the small enclosure he is not supposed to know about do not call either. They watch.",
      "He sits down on the iron bench under the magnolia and waits for the man Major Overton said would come. The man comes. He is not what {{Hammond}} expected, which is to say he is exactly what {{Hammond}} expected, only older.",
      "\"Mr. Hammond,\" says {{Nick Harris}}, and does not put out a hand.",
    ],
  },
  2: {
    n: 2,
    title: "The Aviary Exile",
    epigraph: {
      text: "The family voted unanimously. The vote was binding. The vote was not, in the strict sense, legal.",
      attribution: "— Memorandum, Hammond Trust, redacted",
    },
    paragraphs: [
      "The aviary is a hundred and ten acres of wet coastal forest under a tension net you cannot see from the ground.",
      "From the air it looks like a green dish set into the cliff. From the inside it looks like Oregon, or like Oregon used to look before the rain went strange. {{Hammond}} keeps to a circuit of three paths and a glasshouse and the iron bench. He is not under guard. He is under {{family}}.",
      "Tonight he writes the letter he has been writing for a year. He writes it in pencil, on the back of a printed seed catalog, because the staff catalogs every sheet of stationery that leaves the house. The pencil he stole from the gardener in March.",
      "{{Overton}} will carry the letter out folded into the lining of his prosthetic. {{Overton}} owes him for the leg and for the years before the leg. {{Hammond}} does not enjoy collecting on debts. He collects on this one.",
      "He signs the letter and folds it and puts it in the bottom of the seed catalog and puts the catalog on the table by the door for the morning.",
      "Then he takes the cane and goes out to listen for the {{compies}} in the dark.",
    ],
  },
  4: {
    n: 4,
    title: "The Diggers",
    epigraph: {
      text: "They work in threes. One sets the line. One pulls. One waits.",
      attribution: "— Field log, J. Overton, undated",
    },
    paragraphs: [
      "{{Nick Harris}} has been on the island for nine hours when he finds the first dig.",
      "It is shaped like a long oval, two feet deep at the deepest, the soil thrown to the upslope side in a fan. The grass at the rim is bent flat and not yet sprung back, which means hours, not days. He puts his hand on the bare earth at the bottom and it is cool. He tries to remember what he was told about the {{Diggers}} and finds that what he was told and what he is looking at do not agree.",
      "He was told they were lone foragers.",
      "He counts six prints in the fan of thrown soil. Three sets of two. Three animals, working a line.",
      "He sits back on his heels and listens to the jungle. The jungle does not stop being a jungle. It does the thing jungles do, which is to be too loud and then suddenly not loud enough. He waits for the not-loud-enough and it does not come.",
      "He stands up slowly and walks back to the road in the way he walked in country a long time ago, which is not exactly quietly but in the way that says <i>I am not the thing you are looking for, please continue with your business</i>.",
    ],
  },
};

// Glossary additions for the new terms used above
window.NOVEL_GLOSS_EXT = {
  "compies": {
    cat: "creature",
    def: "Compsognathus. Crow-sized, social, opportunistic. Hammond keeps a small bonded pair he is officially not allowed to have.",
  },
  "family": {
    cat: "concept",
    def: "The Hammond Trust — Hammond's children and their lawyers, who voted unanimously in 2024 to confine him to the aviary 'for his own protection.'",
  },
  "Overton": {
    cat: "character",
    def: "Major Jeb Overton, USMC ret. Lost a leg outside Fallujah and a job after that. Hammond's outside contact.",
  },
  "prop": {
    cat: "concept",
    def: "Hammond's cane — amber-headed, hollowed at the grip. The amber is replica. The hollow has carried two letters and a key.",
  },
  "Diggers": {
    cat: "creature",
    def: "Pack-hunting deinonychus-class theropods. Coordinated trench foragers. Believed solitary for fifteen years. Were not.",
  },
};
