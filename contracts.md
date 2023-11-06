contracts.txt

// TODO complete a contract to see what rewards are like

I installed my augments, so these are gone from where I last found them >.<

//

After searching a bit harder, I've found my first contract in the game.

I found these on the `.` server

```
Minimum Path Sum in a Triangle
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given a triangle, find the minimum path sum from top to bottom. In each step of the path, you may only move to adjacent numbers in the row below. The triangle is represented as a 2D array of numbers:

[
           [2],
          [7,9],
         [1,1,3],
        [6,7,9,4],
       [7,6,3,5,8],
      [8,8,6,2,2,8],
     [6,6,3,3,8,5,3],
    [2,6,8,9,7,7,3,2],
   [4,9,5,7,1,1,8,6,6],
  [1,9,7,4,4,8,9,3,2,4]
]

Example: If you are given the following triangle:

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum is 11 (2 -> 3 -> 5 -> 1).
```

So I'll need to work on a solution. Brute force is probably the best way to go for now.

Suddenly, this game feels even more like coding practice XD

```
Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

1. Exactly L characters, which are to be copied directly into the uncompressed data.
2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

You are given the following LZ-encoded string:
    97B6cxBbMb07YEWTJdB8836mm839U5l6y3ZNz167b6y3lwo771g69
Decode it and output the original string.

Example: decoding '5aaabb450723abb' chunk-by-chunk
    5aaabb           ->  aaabb
    5aaabb45         ->  aaabbaaab
    5aaabb450        ->  aaabbaaab
    5aaabb45072      ->  aaabbaaababababa
    5aaabb450723abb  ->  aaabbaaababababaabb

```

I haven't taken too much of a look at this one above,
and this one below I just found on the server `kuai-gong` which as a reqHack of 1240

```
Proper 2-Coloring of a Graph
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following data, representing a graph:
[7,[[1,5],[4,6],[0,6],[3,4],[0,3],[3,5],[1,4],[0,4]]]
Note that "graph", as used here, refers to the field of graph theory, and has no relation to statistics or plotting. The first element of the data represents the number of vertices in the graph. Each vertex is a unique number between 0 and 6. The next element of the data represents the edges of the graph. Two vertices u,v in a graph are said to be adjacent if there exists an edge [u,v]. Note that an edge [u,v] is the same as an edge [v,u], as order does not matter. You must construct a 2-coloring of the graph, meaning that you have to assign each vertex in the graph a "color", either 0 or 1, such that no two adjacent vertices have the same color. Submit your answer in the form of an array, where element i represents the color of vertex i. If it is impossible to construct a 2-coloring of the given graph, instead submit an empty array.

Examples:

Input: [4, [[0, 2], [0, 3], [1, 2], [1, 3]]]
Output: [0, 0, 1, 1]

Input: [3, [[0, 1], [0, 2], [1, 2]]]
Output: []
```

contract-924189-TianDiHui.cct
4sigma 941

```
Minimum Path Sum in a Triangle
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given a triangle, find the minimum path sum from top to bottom. In each step of the path, you may only move to adjacent numbers in the row below. The triangle is represented as a 2D array of numbers:

[
     [4],
    [9,2],
   [8,1,6],
  [3,4,3,2]
]

Example: If you are given the following triangle:

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum is 11 (2 -> 3 -> 5 -> 1).
```

I think this is the same as the first one! It is!
writing one program gets me twice as many points?
I'd imagine I also can find the same contracts types on augment install resets too.

