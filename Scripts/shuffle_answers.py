#!/usr/bin/env python3
"""
shuffle_answers.py

Randomizes the A/B/C/D position of correct answers across all 5 exam files.
The correct answer content moves with its letter so nothing is broken.
Handles escaped single quotes in option text.

Usage:
    python Scripts/shuffle_answers.py
    python Scripts/shuffle_answers.py --dry-run   (shows distribution, no writes)
"""

import argparse
import re
import random
from pathlib import Path

SEED = 20260609  # Fixed seed = reproducible shuffle
EXAM_DIR = Path(__file__).parent.parent / "app" / "src" / "data" / "exams"

# Matches the entire options block + correctAnswer line
# Groups: 1=opening line, 2=A text, 3=B text, 4=C text, 5=D text,
#         6=closing+correctAnswer prefix, 7=correct letter
OPT_TEXT = r"((?:[^'\\]|\\.)*)"

# Standard multi-line format (exams 1-3, 5 and part of exam-4)
BLOCK_RE = re.compile(
    r"(    options: \{\n)"
    r"      A: '" + OPT_TEXT + r"',\n"
    r"      B: '" + OPT_TEXT + r"',\n"
    r"      C: '" + OPT_TEXT + r"',\n"
    r"      D: '" + OPT_TEXT + r"',\n"
    r"(    \},\n    correctAnswer: ')([ABCD])(')"
)

# Inline format: options: { A: '...', B: '...', C: '...', D: '...' },
INLINE_RE = re.compile(
    r"options: \{ "
    r"A: '" + OPT_TEXT + r"', "
    r"B: '" + OPT_TEXT + r"', "
    r"C: '" + OPT_TEXT + r"', "
    r"D: '" + OPT_TEXT + r"' \},\n"
    r"    correctAnswer: '([ABCD])'"
)


def shuffle_file(filepath: Path, rng: random.Random, dry_run: bool) -> dict:
    content = filepath.read_text(encoding="utf-8")
    letters = ["A", "B", "C", "D"]
    processed = [0]

    def shuffle_block(m: re.Match) -> str:
        processed[0] += 1
        texts = [m.group(2), m.group(3), m.group(4), m.group(5)]
        correct_text = texts[letters.index(m.group(7))]

        rng.shuffle(texts)
        new_correct = letters[texts.index(correct_text)]

        return (
            "    options: {\n"
            f"      A: '{texts[0]}',\n"
            f"      B: '{texts[1]}',\n"
            f"      C: '{texts[2]}',\n"
            f"      D: '{texts[3]}',\n"
            f"{m.group(6)}{new_correct}{m.group(8)}"
        )

    def shuffle_inline(m: re.Match) -> str:
        processed[0] += 1
        texts = [m.group(1), m.group(2), m.group(3), m.group(4)]
        correct_text = texts[letters.index(m.group(5))]

        rng.shuffle(texts)
        new_correct = letters[texts.index(correct_text)]

        return (
            "options: {\n"
            f"      A: '{texts[0]}',\n"
            f"      B: '{texts[1]}',\n"
            f"      C: '{texts[2]}',\n"
            f"      D: '{texts[3]}',\n"
            f"    }},\n    correctAnswer: '{new_correct}'"
        )

    new_content = BLOCK_RE.sub(shuffle_block, content)
    new_content = INLINE_RE.sub(shuffle_inline, new_content)

    if not dry_run:
        filepath.write_text(new_content, encoding="utf-8")

    counts = {l: 0 for l in letters}
    for m in re.finditer(r"correctAnswer: '([ABCD])'", new_content):
        counts[m.group(1)] += 1

    return counts, processed[0]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Show result without writing files")
    args = parser.parse_args()

    rng = random.Random(SEED)
    total = {"A": 0, "B": 0, "C": 0, "D": 0}
    total_q = 0

    print("Shuffling answer positions...\n")
    for i in range(1, 6):
        filepath = EXAM_DIR / f"exam-{i}.ts"
        counts, n = shuffle_file(filepath, rng, args.dry_run)
        total_q += n
        for l in "ABCD":
            total[l] += counts[l]
        status = "(dry run)" if args.dry_run else "written"
        print(f"  exam-{i}.ts  [{n} questions {status}]  A={counts['A']}  B={counts['B']}  C={counts['C']}  D={counts['D']}")

    print(f"\n  TOTAL  [{total_q} questions]  A={total['A']}  B={total['B']}  C={total['C']}  D={total['D']}")

    if args.dry_run:
        print("\nDry run complete. Run without --dry-run to write changes.")
    else:
        print("\nDone. Verify with: python Scripts/shuffle_answers.py --dry-run")


if __name__ == "__main__":
    main()
