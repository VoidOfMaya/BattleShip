# Battleship Game

Welcome to the **Battleship** game project! This is an implementation of the classic strategic game Battleship, where players aim to sink their opponent's fleet of ships by guessing their locations.

## Project objectives

1. **TDD**: 
    create the project using the test driven development approach and practice  jest.
    - enabling esm with jest for intigration with webpack
    - jest will only preform testing on pure logic
    - style and format jest testing is not in the scope of this project!
2. **git**: 
    practice better git control habits for a clearer history and version control.
    - follwoing the git commit message convention: '<type>(<scope>):<message>'
    - using a bit more advanced commands such as commit --amend / git rebase
        while making sure to keep those only for internal history control not effecting
        commits that have been already pushed upstream
3. **algorthima**: 
    practicing  making writing functions that are as efficient as possible.
    - managing time and space complexity as needed
    - utilizing datastructures where needed
    - utilizing concepts like bfs and dfs if and where needed

## Game Rules

1. **Objective**: The goal of the game is to sink all of your opponent's ships before they sink yours.
   
2. **Game Setup**:
   - The game is played on a grid (typically 10x10) for each player.
   - Each player has a fleet of ships, which are placed secretly on the grid. The fleet consists of ships of varying sizes.
   - Players take turns calling out coordinates to attack.

3. **Turns**:
   - Players alternate turns, guessing a coordinate on the opponent's grid to attack.
   - The opponent must respond with a "hit" or "miss".
   - Once all of a player’s ships are sunk, the game ends.

4. **Ships**:
   - The game involves several ships of different lengths, typically including:
     - **Carrier (5 spaces)**
     - **Battleship (4 spaces)**
     - **Cruiser (3 spaces)**
     - **Submarine (3 spaces)**
     - **Destroyer (2 spaces)**

5. **End of Game**:
   - The game ends when all ships of one player are sunk.


