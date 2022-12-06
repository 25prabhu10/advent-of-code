"""
Advent of Code 2022, Day 02
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

# A for "rock"
# B for "paper"
# C for "scissors"
ALL_POSSIBLE_OUTCOMES = {
  "A rock": "draw",
  "A paper": "win",
  "A scissors": "lose",
  "B rock": "lose",
  "B paper": "draw",
  "B scissors": "win",
  "C rock": "win",
  "C paper": "lose",
  "C scissors": "draw",
}

POINTS = {
  "rock": 1,
  "paper": 2,
  "scissors": 3,
  "lose": 0,
  "draw": 3,
  "win": 6,
}

def calculate_score(rounds, ROUND_STRATEGY):
    """Calculate score for given strategy"""

    total_points = []

    for (player_a, _, strategy) in rounds:
        player_b = ROUND_STRATEGY[strategy][player_a]
        outcome = ALL_POSSIBLE_OUTCOMES[f"{player_a} {player_b}"]
        total_points.append(POINTS[outcome] + POINTS[player_b])

    return total_points


with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    rounds = str_file.read().splitlines()

    # part 1
    OLD_ROUND_STRATEGY = {
      "X": { "A": "rock", "B": "rock", "C": "rock" },
      "Y": { "A": "paper", "B": "paper", "C": "paper" },
      "Z": { "A": "scissors", "B": "scissors", "C": "scissors" },
    }

    scores_per_round = calculate_score(rounds, OLD_ROUND_STRATEGY)
    print(sum(scores_per_round))

    # part 2
    NEW_ROUND_STRATEGY = {
      "X": { "A": "scissors", "B": "rock", "C": "paper" }, # lose
      "Y": { "A": "rock", "B": "paper", "C": "scissors" }, # draw
      "Z": { "A": "paper", "B": "scissors", "C": "rock" }, # win
    }

    new_scores_per_round = calculate_score(rounds, NEW_ROUND_STRATEGY)
    print(sum(new_scores_per_round))
