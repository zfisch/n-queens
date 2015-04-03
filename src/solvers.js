/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findSolution = function(board, row, n, predicate, callback){
    //if no more rows/pieces to place
    if(row === n){
      return callback();
    }
    //loop through all of the columns
    for(var i = 0; i < n; i++){
      //place a piece
      board.togglePiece(row, i);
      //if no conflicts
      if(!board[predicate]()){
        //call findSolution on the next row
        var result = findSolution(board, row + 1, n, predicate, callback);
        if(result){
          return result;
        }
      }
      //remove the piece
      board.togglePiece(row, i);
    }
  };


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  return findSolution(board, 0, n, "hasAnyRooksConflicts", function(){
      return board.rows();
  });
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  findSolution(board, 0, n, 'hasAnyRooksConflicts', function(){
    solutionCount++;
  });
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if(n === 2 || n === 3){
    return new Board({n:n}).rows();
  };
  var board = new Board({n:n});
  return findSolution(board, 0, n, "hasAnyQueensConflicts", function(){
      return board.rows();
  });
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  findSolution(board, 0, n, 'hasAnyQueensConflicts', function(){
    solutionCount++;
  });
  return solutionCount;
};

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

var numPieces = function(board){
  return _.reduce(board.rows(), function(memo, row) {
    return memo + _.reduce(row, function(memo, col) {
      return memo + col;
    }, 0);
  }, 0);
}
