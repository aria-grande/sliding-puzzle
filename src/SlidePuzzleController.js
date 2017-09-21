import React, { Component } from 'react';
import './SlidePuzzleController.css';

import Board from './Board';
import If from './If';
import Popup from './Popup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trialCount: 0,
      nowPlaying: false,
      succeed: false,
      board: this.getNewBoard(false)
    };
    this.startGame = this.startGame.bind(this);
    this.cheat = this.cheat.bind(this);
    this.handleCellClicked = this.handleCellClicked.bind(this);
    this.handleConfirmButtonClicked = this.handleConfirmButtonClicked.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // when play newly
    if (!prevState.nowPlaying && this.state.nowPlaying) {
      this.setState({ board: this.getNewBoard(true) });
    }
    // when user is succeed yet
    else if (!prevState.succeed && !this.state.succeed) {
      var succeed = true;
      const size = this.props.size;
      this.state.board.forEach((row, i) => {
        row.forEach((cell, j) => {
          // when cells are not in order, except for the last cell which is null.
          if (cell !== (i*size + j + 1) && (i < size-1 || j < size-1)) {
            succeed = false;
          }
        });
      });

      if (succeed) {
        this.setState({ succeed: true, nowPlaying: false });
      }
    }
  }

  getNewBoard(random) {
    const size = this.props.size;
    let keys = Array(size**2-1).fill().map((e,i) => i+1);              // [1,2,3,4,5,6,7,8] in case props.size=3
    if (random) {
      keys = keys.sort(() => (Math.random() - 0.5));                 // [2,3,1,4,7,9,7,9] random order
    }
    keys.push(null);                                                   // [2,3,1,4,7,9,7,9,null]
    return Array(size).fill().map((e, i) => keys.splice(0, size));
  }

  startGame() {
    this.setState({
      trialCount: 0,
      nowPlaying: true,
      succeed: false
    });
  }

  cheat() {
    this.setState({ board: this.getNewBoard(false) });
  }

  handleCellClicked(row, col, value) {
    if (!this.state.nowPlaying) { return; }
    var newTrialCount = this.state.trialCount;
    const newBoard = this.state.board;
    const coordsToLookAround = [
      {x: row,   y: col-1},
      {x: row,   y: col+1},
      {x: row+1, y: col},
      {x: row-1, y: col}
    ];

    coordsToLookAround.forEach(coord => {
      const cell = newBoard[coord.x] && newBoard[coord.x][coord.y];
      if (cell !== undefined && cell === null) {
        newBoard[row][col] = null;
        newBoard[coord.x][coord.y] = value;
        newTrialCount += 1
      }
    });

    this.setState({ trialCount: newTrialCount, board: newBoard });
  }

  handleConfirmButtonClicked() {
    this.setState({
      trialCount: 0,
      succeed: false,
      nowPlaying: false
    });
  }

  render() {
    return(
      <div id="game_board">
        <h1>Sliding Puzzle Game</h1>
        <Board board={this.state.board} allowClick={this.state.nowPlaying} handleCellClicked={this.handleCellClicked}/>
        <h3>TRIAL COUNT: {this.state.trialCount}</h3>
        <If condition={!this.state.nowPlaying}>
          <button className="dynamic_btn" onClick={this.startGame}>START</button>
        </If>
        <If condition={this.state.nowPlaying}>
          <button className="dynamic_btn" onClick={this.cheat}>CHEAT!!</button>
        </If>
        <If condition={this.state.succeed}>
          <Popup trialCount={this.state.trialCount} clickedConfirmButton={this.handleConfirmButtonClicked} />
        </If>
      </div>
    );
  }
}
App.defaultProps = {
  size: 4
};
export default App;
