import React from "react";

export function RotationMatrix(m, n, r) {
  //   const RotationMatrix = (m, n, r) => {
  let i, j, k, ring, rotate, temp, a;
  let c = a[m][n];
  //   let c = a[m][n];
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      // let b= a[i][j];
      console.log(a[i][j]);
    }
  }
  if (m < n) ring = m / 2;
  else ring = n / 2;
  for (i = 0; i < ring; i++) {
    rotate = r % (2 * m + 2 * n - 8 * i - 4);
    for (k = 0; k < rotate; k++) {
      //   top `row rotate
      for (j = i; j < n - i - 1; j++) {
        //j colmn hay hum a ko move kryygy col by col
        // simple swapping krygy a ki b k sth bki c k sth or a end m ajyga
        temp = c[i][j];
        c[i][j] = c[i][j + 1];
        c[i][j + 1] = temp;
      }
      // right column k liy
      // ab jo yh j hay wo row represent krha hay
      for (j = i; j < m - i - 1; j++) {
        temp = c[j][n - i - 1];
        c[j][n - i - 1] = c[j + 1][n - i - 1];
        c[j + 1][n - i - 1] = temp;
      }
      // down Row k liy
      for (j = n - i - 1; j > i; j--) {
        temp = c[m - i - 1][j];
        c[m - i - 1][j] = c[m - i - 1][j - 1];
        c[m - i - 1][j - 1] = temp;
      }
      // left column
      for (j = m - i - 1; j > i + 1; j--) {
        temp = c[j][i];
        c[j][i] = c[j - 1][i];
        c[j - 1][i] = temp;
      }
    }
  }
  // for printing
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) console.log(c[i][j], "printing value");
  }
  return 0;
  //   };
  //   Rotating();
  //   return <div>RotationMatrix</div>;
}

// #include <cmath>
// #include <cstdio>
// #include <vector>
// #include <iostream>
// #include <algorithm>
// using namespace std;

// int main() {
//     int M, N, R;
//     cin>>M>>N>>R;
//     int **matrix = new int*[M];
//     for(int i = 0; i < M; i++) {
//         matrix[i] = new int[N];
//         for(int j = 0; j < N; j++) {
//             cin>>matrix[i][j];
//         }
//     }

//     int numRings = min(M,N)/2;
//     for(int i = 0; i < numRings; i++) {

//         int numRotations = R%(2*(M + N - 4*i) - 4);
//         for(int rotation = 0; rotation < numRotations; rotation++) {

//             // Rotate top row
//             for(int j = i; j < N-i-1; j++) {
//                 int tmp = matrix[i][j];
//                 matrix[i][j] = matrix[i][j+1];
//                 matrix[i][j+1] = tmp;
//             }
//             // Rotate right column
//             for(int j = i; j < M-i-1; j++) {
//                 int tmp = matrix[j][N-i-1];
//                 matrix[j][N-i-1] = matrix[j+1][N-i-1];
//                 matrix[j+1][N-i-1] = tmp;
//             }
//             // Rotate bottom row
//             for(int j = N-i-1; j > i; j--) {
//                 int tmp = matrix[M-i-1][j];
//                 matrix[M-i-1][j] = matrix[M-i-1][j-1];
//                 matrix[M-i-1][j-1] = tmp;
//             }
//             // Rotate left column
//             for(int j = M-i-1; j > i+1; j--) {
//                 int tmp = matrix[j][i];
//                 matrix[j][i] = matrix[j-1][i];
//                 matrix[j-1][i] = tmp;
//             }
//         }
//     }
//     // Output final matrix
//     for(int i = 0; i < M; i++) {
//         for(int j = 0; j < N; j++) {
//             cout<<matrix[i][j]<<" ";
//         }
//         cout<<"\n";
//     }
//     return 0;
// }
