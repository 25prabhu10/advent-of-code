from functools import reduce

# part 1
# roundStrategy = {
#   "A Y": "win",
#   "B Z": "win",
#   "C X": "win",
#   "A X": "draw",
#   "B Y": "draw",
#   "C Z": "draw",
#   "A Z": "lose",
#   "B X": "lose",
#   "C Y": "lose",
# }

# points = {
#   "X": 1,
#   "Y": 2,
#   "Z": 3,
#   "lose": 0,
#   "draw": 3,
#   "win": 6,
# }

# def getScore(round):
#     return points[roundStrategy[round]] + points[round[2]]

# part 2
roundStrategy = {
  "X": { "A": "scissors", "B": "rock", "C": "paper" }, # lose
  "Y": { "A": "rock", "B": "paper", "C": "scissors" }, # draw
  "Z": { "A": "paper", "B": "scissors", "C": "rock" }, # win
}

points = {
  "rock": 1,
  "paper": 2,
  "scissors": 3,
  "X": 0,
  "Y": 3,
  "Z": 6,
}

def getScore(playerA, strategy):
  return points[strategy] + points[roundStrategy[strategy][playerA]]


with open("./input.txt", "r", encoding="UTF-8") as str_file:
    str = str_file.read()

    rounds = str.split("\n")

    scoresPerRound = [getScore(round[0], round[2]) for round in rounds]

    totalScore = reduce(lambda a, b: a + b, scoresPerRound) 

    print(totalScore)
