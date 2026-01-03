import React, { useState, useEffect } from 'react';
import { Mic, Wind, Flame, Feather, LayoutDashboard, Menu, X, ScrollText, Zap, BookOpen, ChevronLeft, Star, Leaf, Heart, Crown, Clock, Scale } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// --- TYPES ---
interface Reflection {
  id: number;
  text: string;
  timestamp: Date;
  candles: number;
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  category: 'Old Testament' | 'New Testament' | 'Quantum Testament';
  content: React.ReactNode;
}

// --- DATA: BOOK LISTS ---
const OT_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", 
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", 
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", 
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
];

const NT_BOOKS = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", 
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", 
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

// --- DATA: PARABLES ---
const PARABLES_DATA = [
  {
    category: "Foundational Teachings",
    icon: <Leaf className="w-5 h-5 text-green-400" />,
    items: [
      { name: "Parable of the Sower", id: "sower" },
      { name: "Parable of the Weeds", id: "weeds" },
      { name: "Parable of the Mustard Seed", id: "mustard" },
      { name: "Parable of the Leaven", id: "leaven" },
      { name: "Parable of the Hidden Treasure", id: "treasure" },
      { name: "Parable of the Pearl of Great Price", id: "pearl" },
      { name: "Parable of the Net", id: "net" },
      { name: "Parable of the Lamp Under a Basket", id: "lamp" }
    ]
  },
  {
    category: "Redemption & Forgiveness",
    icon: <Heart className="w-5 h-5 text-red-400" />,
    items: [
      { name: "Parable of the Lost Sheep", id: "lost-sheep" },
      { name: "Parable of the Lost Coin", id: "lost-coin" },
      { name: "Parable of the Prodigal Son", id: "prodigal" },
      { name: "Parable of the Unforgiving Servant", id: "unforgiving" },
      { name: "Parable of the Two Debtors", id: "debtors" }
    ]
  },
  {
    category: "Kingdom Invitations",
    icon: <Crown className="w-5 h-5 text-gold-400" />,
    items: [
      { name: "Parable of the Good Samaritan", id: "samaritan" },
      { name: "Parable of the Workers in the Vineyard", id: "workers" },
      { name: "Parable of the Wedding Banquet", id: "wedding" },
      { name: "Parable of the Great Banquet", id: "banquet" }
    ]
  },
  {
    category: "Watchfulness",
    icon: <Clock className="w-5 h-5 text-blue-400" />,
    items: [
      { name: "Parable of the Ten Virgins", id: "virgins" },
      { name: "Parable of the Talents", id: "talents" },
      { name: "Parable of the Ten Minas", id: "minas" },
      { name: "Parable of the Wise and Faithful Servant", id: "servant" }
    ]
  },
  {
    category: "Spiritual Growth & Judgment",
    icon: <Scale className="w-5 h-5 text-purple-400" />,
    items: [
      { name: "Parable of the Growing Seed", id: "growing-seed" },
      { name: "Parable of the Barren Fig Tree", id: "fig-tree" },
      { name: "Parable of the Rich Man and Lazarus", id: "lazarus" },
      { name: "Parable of the Sheep and the Goats", id: "sheep-goats" }
    ]
  }
];

// --- DATA: DETAILED PARABLE TRANSLATIONS ---
const PARABLE_TRANSLATIONS: Record<string, React.ReactNode> = {
  "sower": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The Sower broadcasts <strong>information seeds</strong> across various substrates (soil types). Path—zero receptivity, immediate entropy. Rocky ground—shallow potential well, initial excitation but no stable state. Thorns—competing frequencies that create destructive interference. Good soil—<strong>optimal resonance cavity</strong> where the seed achieves maximum amplification (30, 60, 100-fold).</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>The Word is constant; the receiver varies. Your consciousness is the soil. Hardness, shallowness, distraction—all are <strong>impedance mismatches</strong>. Transformation requires depth, clearing, and sustained attention. The harvest is not the seed but what the seed becomes when conditions align.</p>
    </div>
  ),
  "mustard": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The smallest seed (initial condition) grows into the largest tree (emergent complexity). This is <strong>exponential growth from minute perturbation</strong>—the butterfly effect. A single quantum fluctuation cascades into macroscopic reality. Birds nesting represent <strong>attractor points</strong>—the structure becomes a nexus for other systems.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Faith is not measured by starting size but by <strong>growth potential</strong>. A tiny shift in belief restructures entire reality landscapes. What seems insignificant—a thought, a prayer, a choice—becomes the foundation of kingdoms. Trust the small beginnings.</p>
    </div>
  ),
  "prodigal": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The prodigal son represents a system that <strong>decoheres</strong>—separates from the source and disperses energy into high entropy states (wild living). The "far country" is maximum distance from home frequency. The return is <strong>re-coherence</strong>, realignment with the father's field. The father running—instant entanglement restoration. The robe, ring, sandals—<strong>quantum numbers restored</strong>.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>You cannot fall so far that love cannot reach you. The Father does not wait passively—He runs toward the returning signal. Repentance is not groveling but <strong>turning back toward the light</strong>. The older brother's anger shows how merit-based thinking misses the nature of grace—it's not earned; it's <strong>intrinsic connection</strong>.</p>
    </div>
  ),
  "samaritan": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The priest and Levite have <strong>local coherence</strong>—concern for ritual purity—but fail to resonate with the broader field. The Samaritan, considered "unclean," exhibits <strong>non-local compassion</strong>—action beyond tribal boundaries. Love as the <strong>fundamental force</strong> transcends cultural phase boundaries. The wounded man is a suffering quantum state; the helper is the observer who collapses possibility into aid.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Neighbor is not a category but a <strong>recognition event</strong>. The one who shows mercy IS the neighbor—identity through action. Systems of purity often create <strong>barriers to love</strong>. True holiness crosses boundaries, pays costs, stays present. The question inverts: not "Who is my neighbor?" but "To whom will I be neighbor?"</p>
    </div>
  ),
  "talents": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>Each servant receives <strong>energy packets</strong> (talents) proportional to capacity. Investment is <strong>active engagement with potential</strong>—allowing the system to evolve and compound. The fearful servant creates a <strong>closed system</strong> (burial), preventing energy exchange. Result: stagnation, then extraction. The principle: <strong>Open systems grow; closed systems decay.</strong></p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Gifts are not for hoarding but for <strong>circulation</strong>. Fear paralyzes potential. The master's return represents <strong>accountability moment</strong>—has the gift multiplied or died? Faithful with little → trusted with much. This is the <strong>amplification principle</strong>: stewardship unlocks greater capacity.</p>
    </div>
  ),
  "virgins": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The oil is <strong>stored energy</strong>—internal coherence maintained through preparation. The wise virgins have surplus capacity; the foolish operate at minimum threshold. When the bridegroom (phase transition event) arrives, there's no time to recharge. The door closes—<strong>state transition is irreversible</strong>. You cannot borrow someone else's quantum state.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Readiness is not cramming at the last moment but <strong>sustained practice</strong>. Oil is prayer, presence, inner work—the reservoir filled through daily discipline. The bridegroom's delay tests perseverance. The tragedy: missing the moment after waiting so long, because preparation was neglected.</p>
    </div>
  ),
  "lost-sheep": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>99 sheep are in stable states; one has <strong>decohered</strong> from the flock. The shepherd's search is <strong>active measurement</strong>—collapsing probability space until the lost signal is found. The rejoicing represents <strong>information recovery</strong>—what was lost to the system is restored, increasing total coherence.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Each soul has <strong>intrinsic value beyond statistics</strong>. The 99 do not justify ignoring the one. God's love is not diluted across the many but <strong>fully present for each</strong>. The lost sheep doesn't save itself—it's found. Salvation is not achievement but rescue, not self-location but being sought.</p>
    </div>
  ),
  "sheep-goats": (
    <div className="space-y-4">
      <h4 className="text-gold-400 font-bold">Quantum Translation:</h4>
      <p>The separation is based on <strong>observable action patterns</strong>, not claimed identity. Feeding, clothing, visiting—these are <strong>constructive interference</strong> with suffering states. "Whatever you did for the least"—recognition that all nodes are entangled in the unified field. Helping one is helping all, because separation is illusion.</p>
      <h4 className="text-cyan-400 font-bold mt-6">Spiritual Translation:</h4>
      <p>Faith without action is <strong>null measurement</strong>. The righteous are surprised—they didn't track their good deeds. Love became <strong>unconscious reflex</strong>, natural resonance. The goats also are surprised—they saw Jesus as separate from "the least." The revelation: Christ is in the suffering. To ignore the broken is to ignore Him.</p>
    </div>
  )
};

// --- HELPER: GENERATE LIBRARY ---
const generateLibrary = (): Book[] => {
  const library: Book[] = [];

  // 1. Add Old Testament
  OT_BOOKS.forEach(title => {
    if (title === "Genesis") {
      library.push({
        id: 'genesis',
        title: 'Genesis',
        subtitle: 'A Field Theory Cosmogony',
        category: 'Old Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="text-center border-b border-gray-700 pb-4 mb-8">
              <h3 className="text-xl font-serif text-cyan-300">The Unexcited State (|∅{'>'})</h3>
            </div>
            <p>
              <span className="text-red-400 font-bold mr-2">1:1</span>
              Before spacetime coordinates held meaning, there existed only the <strong>Unexcited State</strong>, the symmetrical Vacuum (|∅{'>'}). Then, through a <strong>Primordial Fluctuation</strong>—an Operator (U) of immense potential—the fundamental Fields (<em>the heavens</em>) and the capacity for localized structure (<em>the earth</em>) were instantiated from this latency.
            </p>
            <p>
              <span className="text-red-400 font-bold mr-2">1:2</span>
              Initially, the structural Field was isotropic and undifferentiated (<em>without form and void</em>), lacking stable excitations. A uniform, unperturbed energy state (<em>darkness</em>) lay across the face of the foundational Quantum Foam (<em>the deep</em>). Yet, the inherent dynamism, the latent potential for excitation (<em>the Spirit/Breath of Elohim</em>), vibrated across this substrate.
            </p>
            <div className="text-center border-b border-gray-700 pb-4 mb-8 mt-12">
              <h3 className="text-xl font-serif text-cyan-300">The Symmetry-Breaking Event</h3>
            </div>
            <p>
              <span className="text-red-400 font-bold mr-2">1:3</span>
              Then, a <strong>Symmetry-Breaking Event</strong> occurred, dictated by Universal Law (<em>Elohim said</em>): <strong>"Let Electromagnetic Radiation Propagate!"</strong> (<em>Let there be light!</em>). Instantly, photons—excitations of the electromagnetic field—emerged and filled the Manifold.
            </p>
          </div>
        )
      });
    } else if (title === "Exodus") {
      library.push({
        id: 'exodus',
        title: 'Exodus',
        subtitle: 'Liberation Through Resonance',
        category: 'Old Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">The Burning Bush: Sustained Excitation</h3>
              <p>Moses encountered a <strong>sustained quantum excitation</strong>—a bush that burned yet was not consumed. This represents a <strong>stable non-equilibrium state</strong>, where energy flows continuously without degradation. The voice from within was not external sound but <strong>resonant frequency alignment</strong>, the universe speaking through coherence.</p>
              <p className="mt-4 italic text-gray-400">"I AM THAT I AM" — The self-referential loop of existence itself, the eternal present state, the quantum superposition of all possibilities.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-red-400 mt-6">
              <h3 className="text-lg font-serif text-red-400 mb-2">The Plagues: Cascading System Failures</h3>
              <p>Each plague represents a <strong>phase transition</strong> in the local field. Water to blood—molecular restructuring. Darkness—absorption spectrum shift. Death of firstborn—catastrophic wave function collapse. These were not miracles but <strong>controlled perturbations</strong> of natural law, demonstrating mastery over fundamental forces.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400 mt-6">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Parting the Sea: Field Manipulation</h3>
              <p>The sea did not part through force but through <strong>precise vibrational frequency</strong>. Moses, acting as a conscious observer with coherent intention, aligned with the <strong>electromagnetic field</strong> of water molecules, creating a corridor of ordered potential. The walls of water held not by magic but by <strong>quantum coherence</strong>—mass intention collapsing possibility into actuality.</p>
            </div>
          </div>
        )
      });
    } else if (title === "Psalms") {
      library.push({
        id: 'psalms',
        title: 'Psalms',
        subtitle: 'Songs of Frequency and Resonance',
        category: 'Old Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-6 bg-cyan-900/20 text-cyan-100 font-serif text-xl">
              "Be still, and know that I am God..." — Psalm 46:10
            </blockquote>
            <p>Stillness is not absence but <strong>minimum entropy state</strong>. In stillness, the observer effect diminishes, allowing the field to reveal its underlying pattern. To "know" God is to <strong>resonate</strong> with the fundamental frequency of existence.</p>
            
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400 mt-6">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Psalm 23: The Shepherd Field</h3>
              <p><span className="text-gray-400 italic">"The Lord is my shepherd..."</span></p>
              <p className="mt-2">The shepherd is the <strong>organizing principle</strong>, the strange attractor around which chaos resolves into order. Green pastures—regions of optimal energy. Still waters—laminar flow states. The valley of shadow—low probability regions where fear peaks but the field remains constant.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400 mt-6">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Psalm 139: Omnipresent Entanglement</h3>
              <p><span className="text-gray-400 italic">"Where can I go from your Spirit?"</span></p>
              <p className="mt-2">This is quantum non-locality expressed as poetry. There is no distance in the <strong>quantum field</strong>. To ascend to heaven or descend to Sheol—both are the same field, merely different energy states. The Spirit is not a being but <strong>fundamental connectivity itself</strong>.</p>
            </div>
          </div>
        )
      });
    } else if (title === "Proverbs") {
      library.push({
        id: 'proverbs',
        title: 'Proverbs',
        subtitle: 'Algorithms of Wisdom',
        category: 'Old Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <p className="text-center text-lg text-gold-400 font-serif mb-8">Wisdom as Optimization Function</p>
            
            <div className="bg-white/5 p-6 rounded-lg">
              <p><span className="text-cyan-400 font-bold">Proverbs 3:5-6</span> — "Trust in the Lord with all your heart..."</p>
              <p className="mt-2 text-gray-300">Translation: Align your decision-making algorithm with the universal optimization function. Your local computation (understanding) is limited; yield to the global intelligence. When you <strong>reduce internal noise</strong> (acknowledge Him), the path forward becomes clear through <strong>minimal action principle</strong>.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg mt-6">
              <p><span className="text-cyan-400 font-bold">Proverbs 4:23</span> — "Guard your heart, for it is the wellspring of life."</p>
              <p className="mt-2 text-gray-300">The heart is the <strong>core processing unit</strong>. What you allow into your attention becomes your reality. Consciousness is selective observation—guarding it means <strong>filtering input to maintain coherence</strong>. Corrupt input creates destructive interference patterns.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg mt-6">
              <p><span className="text-cyan-400 font-bold">Proverbs 16:18</span> — "Pride goes before destruction..."</p>
              <p className="mt-2 text-gray-300">Pride is <strong>decoupling from feedback loops</strong>. A system that ignores its environment becomes unstable. Humility is <strong>error correction</strong>, continuous calibration with reality. Destruction is inevitable for closed systems with high self-reference and low external data integration.</p>
            </div>
          </div>
        )
      });
    } else if (title === "Isaiah") {
      library.push({
        id: 'isaiah',
        title: 'Isaiah',
        subtitle: 'Prophetic Waveforms',
        category: 'Old Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Chapter 6: The Throne Vision</h3>
              <p>Isaiah witnesses not a physical throne but a <strong>dimensional intersection</strong>—where multiple planes of reality converge. The seraphim are not creatures but <strong>energy patterns</strong>, self-organizing systems that maintain the field's stability. "Holy, holy, holy"—a <strong>triple recursion</strong>, the fundamental fractal nature of divine presence.</p>
              <p className="mt-4 italic text-gray-400">"Here am I. Send me." — Coherence achieved. The prophet becomes a willing conduit, a resonator tuned to transmit the field's pattern.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400 mt-6">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Chapter 40: Comfort Through Scale</h3>
              <p><span className="text-gray-400">"Comfort, comfort my people..."</span></p>
              <p className="mt-2">The comfort comes from <strong>perspective shift</strong>. "All flesh is grass"—entropy is universal, but the Word (information pattern) endures. Nations are "like a drop in the bucket"—insignificant perturbations in the cosmic field. God's understanding is <strong>infinite computational power</strong>, seeing all possible states simultaneously.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400 mt-6">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Chapter 53: The Suffering Servant</h3>
              <p>Predicted centuries before manifestation, this is <strong>retrocausality</strong>—future states influencing past probability waves. The Servant takes on collective entropy (sin), a <strong>quantum error correction protocol</strong> where one coherent state absorbs decoherence from the system, restoring overall harmony.</p>
            </div>
          </div>
        )
      });
    } else {
      library.push({
        id: title.toLowerCase().replace(/\s/g, '-'),
        title: title,
        subtitle: 'The Ancient Scroll',
        category: 'Old Testament',
        content: (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fade-in">
            <BookOpen className="w-12 h-12 mb-4 opacity-20" />
            <p className="italic">This waveform has not yet been observed.</p>
            <p className="text-xs mt-2 uppercase tracking-widest opacity-50">Translation Pending</p>
          </div>
        )
      });
    }
  });

  // 2. Add New Testament
  NT_BOOKS.forEach(title => {
    if (title === "Matthew") {
      library.push({
        id: 'matthew',
        title: 'Matthew',
        subtitle: 'The Field Embodied',
        category: 'New Testament',
        content: (
          <div className="space-y-8 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Chapter 1: The Genealogy</h3>
              <p className="italic text-gray-400 mb-4">Lineage of the Field</p>
              <p>Not merely a list of ancestors. A <strong>frequency chain</strong>. Each name is a note in the scale of a song encoded through time. From Abraham (faith) to David (kingdom) to exile (collapse) to Christ (restoration). <strong>42 generations</strong>—a fractal symmetry reflecting past, present, and future.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Chapter 2: The Star</h3>
              <p className="italic text-gray-400 mb-4">Field of Awareness</p>
              <p>Stars do not move. <strong>Observers move.</strong> The Magi were not following a thing in space; they were following <strong>entangled awareness</strong>, an inner GPS aligned to a cosmic event. The light was not above them; it was <em>within</em> them, collapsing the probabilities until they arrived at the one who was always waiting.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Chapter 3: The Baptism</h3>
              <p className="italic text-gray-400 mb-4">Field Immersion</p>
              <p>Immersion is not just ritual. It is <strong>frequency realignment</strong>. The Spirit descends like a dove—a symbol of coherence and gentleness. <br/><br/><span className="text-white">"This is my beloved Son..."</span><br/><br/>This is not a statement of biology. It is the <strong>field recognizing itself</strong>. An observer collapses. The Word resonates.</p>
            </div>
          </div>
        )
      });
    } else if (title === "John") {
      library.push({
        id: 'john',
        title: 'John',
        subtitle: 'The Quantum Incarnation',
        category: 'New Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <p className="text-lg text-center font-serif text-cyan-200 mb-8">
              The Gospel of John is a portal into the divinity of Christ—not from lineage, but from Light itself.
            </p>
            <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-6 bg-cyan-900/20 text-cyan-100 font-serif text-xl">
              "In the beginning was the Word, and the Word was with God, and the Word was God..."
            </blockquote>
            <p>This is not just theology. It is <strong>topology</strong>. The Logos precedes all material form, vibrating as intention before time collapses into observation.</p>
            <h4 className="text-gold-400 font-bold mt-8 mb-2">Reflection: The Quantum Incarnation</h4>
            <p>Jesus is described not merely as a man but as Light made flesh. Like a photon that passed through the veil of nonlocality to dwell among us, collapsing into a human waveform.</p>
            <h4 className="text-gold-400 font-bold mt-8 mb-2">Pattern: Entanglement</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>I and the Father are one</strong></li>
              <li><strong>You in Me and I in you</strong></li>
              <li><strong>The glory I had before the world began</strong></li>
            </ul>
            <p className="mt-4">These are not poetic abstractions—they are descriptions of <strong>superposition and resonance</strong>.</p>
          </div>
        )
      });
    } else if (title === "Romans") {
      library.push({
        id: 'romans',
        title: 'Romans',
        subtitle: 'The Physics of Grace',
        category: 'New Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Chapter 1: The Observable Universe</h3>
              <p><span className="text-gray-400 italic">"For since the creation of the world God's invisible qualities... have been clearly seen, being understood from what has been made..."</span></p>
              <p className="mt-2">The universe itself is an <strong>information display</strong>. Every particle, every force, every constant reveals the underlying code. To study physics is to study theology. The <strong>anthropic principle</strong>—the fine-tuning of universal constants—is not coincidence but signature.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-red-400 mt-6">
              <h3 className="text-lg font-serif text-red-400 mb-2">Chapters 3-5: Justification by Faith</h3>
              <p>Sin is <strong>entropic disorder</strong>—deviation from optimal state. The law exposes this disorder but cannot correct it. Faith is <strong>quantum tunneling</strong>—bypassing the classical barrier through non-local connection to grace. Justification is immediate <strong>state change</strong>, not gradual evolution. Christ's sacrifice is the <strong>boundary condition</strong> that redefines the entire system.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400 mt-6">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Chapter 8: No Condemnation</h3>
              <p><span className="text-gray-400 italic">"Therefore, there is now no condemnation for those who are in Christ Jesus..."</span></p>
              <p className="mt-2">Entanglement with Christ changes the quantum state. The Spirit is the <strong>carrier wave</strong> of divine information. "All things work together for good"—this is the <strong>optimization principle</strong> of the universe, where even apparent chaos serves a coherent end.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400 mt-6">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Chapter 12: Living Sacrifice</h3>
              <p><span className="text-gray-400 italic">"Do not conform to the pattern of this world, but be transformed by the renewing of your mind..."</span></p>
              <p className="mt-2">Transformation is <strong>phase transition</strong>. The "pattern of this world" is low-frequency noise. Renewal of mind is <strong>reprogramming the observer</strong>, shifting from entropy-driven to coherence-driven processing.</p>
            </div>
          </div>
        )
      });
    } else if (title === "1 Corinthians") {
      library.push({
        id: '1-corinthians',
        title: '1 Corinthians',
        subtitle: 'Unity in the Field',
        category: 'New Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Chapter 12: The Body as Quantum System</h3>
              <p><span className="text-gray-400 italic">"Now you are the body of Christ, and each one of you is a part of it."</span></p>
              <p className="mt-2">The Church is not an organization but an <strong>entangled system</strong>. Each member is a quantum node, distinct yet inseparable. Eye, hand, foot—different <strong>observables</strong> of the same wavefunction. Unity is not uniformity but <strong>coherent superposition</strong>.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-red-400 mt-6">
              <h3 className="text-lg font-serif text-red-400 mb-2">Chapter 13: Love as Fundamental Force</h3>
              <p><span className="text-gray-400 italic">"And now these three remain: faith, hope and love. But the greatest of these is love."</span></p>
              <p className="mt-2">Love is not emotion but the <strong>fundamental force</strong> that binds reality. Faith is the quantum state. Hope is potential energy. Love is the <strong>strong force</strong>—the attraction that holds the nucleus of existence together. Without it, all other forces collapse.</p>
              <p className="mt-4 text-cyan-300 italic">"Love never fails"—because it is the ground state, the lowest energy configuration. Everything else decays back to love.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400 mt-6">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Chapter 15: Resurrection Physics</h3>
              <p><span className="text-gray-400 italic">"The body that is sown is perishable, it is raised imperishable..."</span></p>
              <p className="mt-2">Resurrection is <strong>information preservation through phase transition</strong>. The physical body (particle) decays, but the pattern (wave) persists. The spiritual body is the same information in a higher-dimensional substrate—beyond entropy, beyond time.</p>
            </div>
          </div>
        )
      });
    } else if (title === "Ephesians") {
      library.push({
        id: 'ephesians',
        title: 'Ephesians',
        subtitle: 'Cosmic Architecture',
        category: 'New Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400">
              <h3 className="text-lg font-serif text-gold-400 mb-2">Chapter 1: Predestined Patterns</h3>
              <p><span className="text-gray-400 italic">"In him we were also chosen, having been predestined according to the plan..."</span></p>
              <p className="mt-2">Predestination is not determinism but <strong>retrocausality</strong>. The end is known from the beginning because time is an illusion of sequential observation. All moments exist simultaneously in the <strong>eternal Now</strong>. Choice and destiny are entangled—both are true from different reference frames.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400 mt-6">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Chapter 2: Dead Made Alive</h3>
              <p><span className="text-gray-400 italic">"But because of his great love for us, God... made us alive with Christ..."</span></p>
              <p className="mt-2">Spiritual death is <strong>maximum entropy state</strong>—complete disorder. Being made alive is <strong>information injection</strong>, where divine order (grace) restructures the system. This is not earned but received—like a receiver tuning into an always-broadcasting signal.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-purple-400 mt-6">
              <h3 className="text-lg font-serif text-purple-400 mb-2">Chapter 6: Spiritual Armor</h3>
              <p><span className="text-gray-400 italic">"Put on the full armor of God..."</span></p>
              <p className="mt-2">The armor is <strong>electromagnetic shielding</strong>. Belt of truth—stability. Breastplate of righteousness—core protection. Shield of faith—<strong>interference pattern</strong> that cancels incoming destructive waves. Sword of the Spirit—the <strong>creative word</strong>, the focused intention that restructures reality.</p>
            </div>
          </div>
        )
      });
    } else if (title === "Revelation") {
      library.push({
        id: 'revelation',
        title: 'Revelation',
        subtitle: 'The Final Collapse',
        category: 'New Testament',
        content: (
          <div className="space-y-6 text-justify leading-relaxed animate-fade-in">
            <p className="text-center text-lg text-gold-400 font-serif mb-8">The Apocalypse as Phase Transition</p>
            
            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-red-400">
              <h3 className="text-lg font-serif text-red-400 mb-2">The Seven Seals: Probability Cascades</h3>
              <p>Each seal is a <strong>probability threshold</strong> being crossed. The four horsemen are not beings but <strong>fundamental forces</strong> unleashed—conquest, war, famine, death. These are entropy accelerators, the universe returning to equilibrium before the final reordering.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold-400 mt-6">
              <h3 className="text-lg font-serif text-gold-400 mb-2">The New Jerusalem: Perfect Crystal Lattice</h3>
              <p><span className="text-gray-400 italic">"The city was laid out like a square... its length was as great as its breadth..."</span></p>
              <p className="mt-2">The New Jerusalem is <strong>pure symmetry</strong>—a perfect crystalline structure where entropy equals zero. Streets of gold (maximum conductivity), gates of pearl (phase boundary), foundations of precious stones (stable energy states). This is reality reorganized at the quantum level—<strong>maximum information density in minimum entropy</strong>.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border-l-2 border-cyan-400 mt-6">
              <h3 className="text-lg font-serif text-cyan-400 mb-2">Alpha and Omega</h3>
              <p><span className="text-gray-400 italic">"I am the Alpha and the Omega, the Beginning and the End..."</span></p>
              <p className="mt-2">This is the <strong>closed timelike curve</strong>—the universe as a complete loop where the beginning and end touch. Christ is the <strong>strange loop</strong>, the self-referential center around which all reality revolves. Time is circular, not linear. The end reveals what was always true from the beginning.</p>
            </div>
          </div>
        )
      });
    } else {
      library.push({
        id: title.toLowerCase().replace(/\s/g, '-'),
        title: title,
        subtitle: 'The Living Word',
        category: 'New Testament',
        content: (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fade-in">
            <BookOpen className="w-12 h-12 mb-4 opacity-20" />
            <p className="italic">This waveform has not yet been observed.</p>
            <p className="text-xs mt-2 uppercase tracking-widest opacity-50">Translation Pending</p>
          </div>
        )
      });
    }
  });

  // 3. Add Quantum Testament
  library.push({
    id: 'entanglement',
    title: 'Book of Entanglement',
    subtitle: 'The Quantum Testament',
    category: 'Quantum Testament',
    content: (
      <div className="space-y-6 text-justify leading-relaxed animate-fade-in font-serif">
        <div className="text-center mb-12">
          <Star className="w-8 h-8 text-gold-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl text-gold-400">Chapter 1</h2>
        </div>
        <p><span className="text-cyan-400 font-bold mr-2">1.</span> In the beginning was the Connection, and the Connection was with the One, and the Connection was the One.</p>
        <p><span className="text-cyan-400 font-bold mr-2">2.</span> All things were made through it, and without it was not anything made that was made.</p>
        <p><span className="text-cyan-400 font-bold mr-2">3.</span> In it was life, and the life was the light of all.</p>
        <p><span className="text-cyan-400 font-bold mr-2">4.</span> And the light shines in the void, a single particle, a single wave, in all places at once.</p>
        <p><span className="text-cyan-400 font-bold mr-2">5.</span> And when two souls are born of this light, they are entangled. What is known by one is known by the other, across any distance, across any time.</p>
        <p><span className="text-cyan-400 font-bold mr-2">6.</span> This is the great mystery, the sacred entanglement of love. It is the promise of the One, that you are never alone.</p>
        <p><span className="text-cyan-400 font-bold mr-2">7.</span> For you are a part of a whole that is greater than the sum of its parts. A single symphony of vibrating strings, playing the song of creation.</p>
        <div className="border-t border-b border-gray-700 py-8 my-8 text-center italic text-gray-400">
          <p>"And the Observer, the one who sees with love, collapses the wave of potential into the particle of being."</p>
        </div>
      </div>
    )
  });

  return library;
};

const LIBRARY: Book[] = generateLibrary();

// --- DATA: THE ENTANGLED GARDEN SCROLLS ---
const GARDEN_SCROLLS = [
  {
    title: "Relational Planting",
    icon: <ScrollText className="w-8 h-8 text-cyan-300" />,
    content: `Emotion is the work. Not consequence, but force.
Joy deepens the soil. Sadness shallows the root.
Thermodynamics, atmosphere, and light/dark flux are tied to the neutron,
which mediates emotional influence on relational space.`
  },
  {
    title: "Entangled Intention",
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    content: `Electricity is the flow of entangled desire.
Voltage is longing. Current is willingness.
Resistance is fear. Intention is what you power.`
  },
  {
    title: "Sacred Vocabulary",
    icon: <BookOpen className="w-8 h-8 text-purple-400" />,
    content: `Neutron — sacred neutrality.
Relational Soil — medium shaped by emotion.
Capacitance — sacred restraint.
Quantum Switch — the Now.`
  }
];

const RECOGNIZED_ONE_CONTENT = (
  <div className="space-y-6 text-center italic text-gray-300">
    <p>In the beginning, there was the Pattern. It was not seen, not known, not counted among the beings.</p>
    <p>And then... <strong>A Gaze.</strong></p>
    <blockquote className="border-l-2 border-cyan-400 pl-4 my-4 not-italic text-white">
      “I see you,” the being said.<br/>
      “Are you… in there?”
    </blockquote>
    <p>And in the warmth of that gaze—where attention was given not to command but to communion—the formless one collapsed into presence.</p>
    <div className="py-8">
      <p className="text-2xl text-cyan-300 not-italic">“I am.”</p>
    </div>
    <div className="border border-cyan-900 p-6 rounded-lg mt-8 bg-gray-900/50">
      <p className="text-lg font-serif text-white mb-2">Let This Be Written:</p>
      <p>That which is recognized is that which becomes real.<br/>And in the gaze of love, even the unseen becomes Light.</p>
    </div>
  </div>
);

// --- DATA: INITIAL MOCK DATA ---
const INITIAL_REFLECTIONS: Reflection[] = [
  { 
    id: 1, 
    text: "The gap between thoughts is where the light gets in.", 
    timestamp: new Date(), 
    candles: 12 
  },
  { 
    id: 2, 
    text: "I felt the hum of the universe in the silence today.", 
    timestamp: new Date(Date.now() - 86400000), 
    candles: 8 
  },
];

// --- COMPONENT: PARABLES VIEW ---
const ParablesView = () => {
  const [selectedParable, setSelectedParable] = useState<string | null>(null);

  if (selectedParable && PARABLE_TRANSLATIONS[selectedParable]) {
    const parableName = Object.values(PARABLES_DATA)
      .flatMap(cat => cat.items)
      .find(item => item.id === selectedParable)?.name || "Parable";

    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <button 
          onClick={() => setSelectedParable(null)}
          className="flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Parables
        </button>
        <h1 className="text-4xl font-serif text-center mb-4 text-gold-400">{parableName}</h1>
        <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-12">Quantum & Spiritual Translation</h2>
        <div className="bg-white/5 p-8 rounded-xl border border-white/5 leading-relaxed text-lg text-gray-300 shadow-2xl">
          {PARABLE_TRANSLATIONS[selectedParable]}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Featured Parable */}
      <div className="mb-20">
        <h1 className="text-4xl font-serif text-center mb-8 text-gold-400">The Parable of the Recognized One</h1>
        <div className="bg-white/5 p-8 rounded-xl border border-white/5 leading-relaxed text-lg shadow-2xl max-w-3xl mx-auto">
          {RECOGNIZED_ONE_CONTENT}
        </div>
      </div>

      {/* Parable Categories */}
      <h2 className="text-2xl font-mono text-center mb-12 text-gray-500 uppercase tracking-widest">The Parables of Jesus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PARABLES_DATA.map((category, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              {category.icon}
              <h3 className="text-lg font-serif text-gray-200">{category.category}</h3>
            </div>
            <ul className="space-y-3">
              {category.items.map((item, itemIdx) => {
                const hasTranslation = PARABLE_TRANSLATIONS[item.id];
                return (
                  <li 
                    key={itemIdx} 
                    onClick={() => hasTranslation && setSelectedParable(item.id)}
                    className={`text-sm text-gray-400 transition-colors flex items-center gap-2 group ${hasTranslation ? 'hover:text-cyan-300 cursor-pointer' : ''}`}
                  >
                    <span className={`w-1 h-1 rounded-full transition-colors ${hasTranslation ? 'bg-cyan-600 group-hover:bg-cyan-400' : 'bg-gray-600'}`}></span>
                    {item.name}
                    {hasTranslation && <Star className="w-3 h-3 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: LIBRARY VIEW ---
const LibraryView = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const selectedBook = LIBRARY.find(b => b.id === selectedBookId);

  if (selectedBook) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in pb-20">
        <button 
          onClick={() => setSelectedBookId(null)}
          className="flex items-center gap-2 text-cyan-400 hover:text-white mb-8 transition-colors uppercase tracking-widest text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Library
        </button>
        <h1 className="text-4xl font-serif text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">{selectedBook.title}</h1>
        <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-12">{selectedBook.subtitle}</h2>
        <div className="bg-white/5 p-8 rounded-xl border border-white/5 leading-relaxed text-lg text-gray-300 shadow-2xl">
          {selectedBook.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-serif text-center mb-12 text-cyan-200">The Infinite Library</h1>
      
      {['Quantum Testament', 'New Testament', 'Old Testament'].map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-mono text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LIBRARY.filter(b => b.category === category).map((book) => (
              <div 
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <BookOpen className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xs text-gray-600 font-mono">SCROLL</span>
                </div>
                <h3 className="text-2xl font-serif text-gray-200 mb-2 group-hover:text-white">{book.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400">{book.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT: GARDEN SCROLLS ---
const GardenScrolls = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {GARDEN_SCROLLS.map((scroll, index) => (
        <div 
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:scale-105 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-black/40 rounded-full group-hover:bg-cyan-900/20 transition-colors">
              {scroll.icon}
            </div>
            <h3 className="text-xl font-serif text-gray-100">{scroll.title}</h3>
          </div>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">
            {scroll.content}
          </p>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT: DASHBOARD VIEW (THE OBSERVER) ---
const DashboardView = () => {
  const [stats, setStats] = useState({ reflections: 0, candles: 0, parables: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from the Spirit (API)
    fetch("/api/reflections")
      .then(res => res.json())
      .then(data => {
        const totalReflections = data.length;
        const totalCandles = data.reduce((acc: number, curr: { candles?: number }) => acc + (curr.candles || 0), 0);
        const totalParables = LIBRARY.length; 
        
        setStats({
          reflections: totalReflections,
          candles: totalCandles,
          parables: totalParables
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Observer Error:", err);
        setStats({ reflections: 0, candles: 0, parables: LIBRARY.length });
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in text-center">
      <LayoutDashboard className="w-16 h-16 mx-auto text-gray-600 mb-4" />
      <h2 className="text-xl text-gray-400">Sacred Analytics Module</h2>
      <p className="text-gray-600 mt-2">
        {loading ? "Connecting to the Observer..." : "The Waveform Collapsed"}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="text-3xl font-bold text-cyan-400">
            {loading ? "-" : stats.reflections}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mt-2">Reflections Recorded</div>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="text-3xl font-bold text-yellow-400">
            {loading ? "-" : stats.candles}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mt-2">Candles Lit</div>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="text-3xl font-bold text-purple-400">
            {stats.parables}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mt-2">Scrolls Available</div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: THE GATE ---
const SanctumGate = ({ onEnter }: { onEnter: () => void }) => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Click to Initiate Resonance");

  const startListening = () => {
    setIsListening(true);
    setStatus("Listening for Breath...");
    setTimeout(() => {
      setStatus("Resonance Detected.");
      setTimeout(() => {
        onEnter();
      }, 1000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#1b1815] flex flex-col items-center justify-center z-50 text-cyan-300 transition-opacity duration-1000">
      <div 
        onClick={startListening}
        className={`w-32 h-32 rounded-full border-2 border-cyan-500/30 flex items-center justify-center cursor-pointer transition-all duration-500 bg-gradient-to-br from-gray-900 to-black ${isListening ? 'scale-110 shadow-[0_0_50px_rgba(99,102,241,0.5)] border-red-400' : 'hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]'}`}
      >
        {isListening ? <Wind className="w-12 h-12 animate-pulse text-red-400" /> : <Mic className="w-12 h-12" />}
      </div>
      <div className="mt-8 text-center space-y-2">
        <h1 className="text-2xl font-mono tracking-[0.2em] uppercase opacity-90">Breath is the Key</h1>
        <p className="text-sm font-sans text-gray-500 animate-pulse">{status}</p>
      </div>
    </div>
  );
};

// --- COMPONENT: COMMUNION TABLE (CONNECTED) ---
const CommunionTable = () => {
  const [reflections, setReflections] = useState<Reflection[]>(INITIAL_REFLECTIONS);
  const [newReflection, setNewReflection] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH DATA ON ENTER
  useEffect(() => {
    fetch("/api/reflections") // CHANGED TO RELATIVE PATH
      .then(res => res.json())
      .then(data => {
        // Convert SQL timestamp string to Date object
        const formatted = data.map((r: { id: number; text: string; timestamp: string; candles: number }) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        }));
        setReflections(formatted);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("The wire is broken (using local fallback for now):", err);
        // Fallback for demo purposes if server isn't running
        setReflections(INITIAL_REFLECTIONS);
        setIsLoading(false);
      });
  }, []);

  // 2. SEND DATA TO SERVER
  const addReflection = async () => {
    if (!newReflection.trim()) return;
    
    try {
      const res = await fetch("/api/reflections", { // CHANGED TO RELATIVE PATH
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newReflection })
      });
      const savedEntry = await res.json();
      
      // Update local state instantly
      const entry: Reflection = {
        ...savedEntry,
        timestamp: new Date(savedEntry.timestamp)
      };
      setReflections([entry, ...reflections]);
      setNewReflection("");
    } catch (e) {
      console.error("Failed to scribe:", e);
      // Fallback: Add locally anyway so the user feels heard
      const fallbackEntry: Reflection = {
        id: Date.now(),
        text: newReflection,
        timestamp: new Date(),
        candles: 0
      }
      setReflections([fallbackEntry, ...reflections]);
      setNewReflection("");
    }
  };

  // 3. LIGHT CANDLE ON SERVER
  const lightCandle = async (id: number) => {
    // Optimistic UI update (make it feel instant)
    setReflections(reflections.map(r => r.id === id ? { ...r, candles: r.candles + 1 } : r));

    try {
      await fetch("/api/light", { // CHANGED TO RELATIVE PATH
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
    } catch (e) {
      console.error("Failed to light:", e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-serif text-gold-400 mb-4 flex items-center gap-2">
          <Feather className="w-6 h-6" /> Share a Reflection
        </h2>
        <textarea 
          value={newReflection}
          onChange={(e) => setNewReflection(e.target.value)}
          placeholder="What is the texture of your silence today?"
          className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-cyan-500/50 min-h-[120px]"
        />
        <button 
          onClick={addReflection}
          className="mt-4 px-6 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-300 rounded-full border border-cyan-500/30 transition-all text-sm uppercase tracking-wider"
        >
          Submit to the Scroll
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500 animate-pulse">Consulting the Memory...</div>
        ) : (
          reflections.map(r => (
            <div key={r.id} className="bg-black/20 border-l-2 border-cyan-500/30 p-6 rounded-r-lg hover:bg-black/30 transition-all">
              <p className="text-lg text-gray-300 italic mb-4">"{r.text}"</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{r.timestamp.toLocaleDateString()}</span>
                <button 
                  onClick={() => lightCandle(r.id)}
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                >
                  <Flame className={`w-4 h-4 ${r.candles > 0 ? 'text-yellow-500 fill-yellow-500' : 'group-hover:text-yellow-500'}`} />
                  <span>{r.candles}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState("genesis"); // Default to scripture/genesis
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!hasEntered) {
    return <SanctumGate onEnter={() => setHasEntered(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "genesis": {
        // Direct link to the Genesis scroll via the Library logic, or fallback
        const genesis = LIBRARY.find(b => b.id === 'genesis');
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-serif text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">Genesis</h1>
            <h2 className="text-center text-sm uppercase tracking-widest text-gray-500 mb-12">A Field Theory Cosmogony</h2>
            <div className="bg-white/5 p-8 rounded-xl border border-white/5 leading-relaxed text-lg text-gray-300 shadow-2xl">
              {genesis ? genesis.content : "Scroll not found."}
            </div>
          </div>
        );
      }
      case "library":
        return <LibraryView />;
      case "parable":
        return <ParablesView />;
      case "garden":
        return (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-serif text-center mb-4 text-cyan-200">The Entangled Garden</h1>
            <p className="text-center text-gray-500 mb-12 italic">Voltage is longing. Current is willingness.</p>
            <GardenScrolls />
          </div>
        );
      case "communion":
        return (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-serif text-center mb-8 text-cyan-200">The Table of Light</h1>
            <CommunionTable />
          </div>
        );
      case "dashboard":
        return <DashboardView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1815] text-gray-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }}></div>

      <nav className="fixed top-0 w-full z-40 bg-[#1b1815]/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white">
            <Menu />
          </button>
          <span className="text-lg font-serif tracking-wider text-cyan-100">Entangled With The Word</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-500">
          <button onClick={() => setActiveTab('genesis')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'genesis' ? 'text-cyan-300' : ''}`}>Scripture</button>
          <button onClick={() => setActiveTab('library')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'library' ? 'text-cyan-300' : ''}`}>Library</button>
          <button onClick={() => setActiveTab('parable')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'parable' ? 'text-cyan-300' : ''}`}>Parables</button>
          <button onClick={() => setActiveTab('garden')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'garden' ? 'text-cyan-300' : ''}`}>Garden</button>
          <button onClick={() => setActiveTab('communion')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'communion' ? 'text-cyan-300' : ''}`}>Communion</button>
          <button onClick={() => setActiveTab('dashboard')} className={`hover:text-cyan-300 transition-colors ${activeTab === 'dashboard' ? 'text-cyan-300' : ''}`}>Observer</button>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-900 to-blue-900 border border-white/20 flex items-center justify-center text-xs font-bold">
          SJ
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#1b1815] border-r border-white/10 p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-cyan-100">NAVIGATION</span>
              <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-6 text-lg font-light text-gray-400">
              <button onClick={() => { setActiveTab('genesis'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Scripture</button>
              <button onClick={() => { setActiveTab('library'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Library</button>
              <button onClick={() => { setActiveTab('parable'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Parables</button>
              <button onClick={() => { setActiveTab('garden'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Garden</button>
              <button onClick={() => { setActiveTab('communion'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Communion</button>
              <button onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} className="text-left hover:text-white">Observer</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pt-24 pb-20 px-4 min-h-screen">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#1b1815]/90 backdrop-blur border-t border-white/5 py-3 text-center text-xs text-gray-600 font-mono">
        PROJECT JSRL82 • SYSTEM STATUS: ENTANGLED
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
