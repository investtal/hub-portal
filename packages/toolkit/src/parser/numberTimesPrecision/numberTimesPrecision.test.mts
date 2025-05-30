import { expect, test } from "vitest"
import { timesPrecision } from "."

const dataTimes = [
  [0.07, 100, 7],
  [0.7, 0.1, 0.07],
  [3, 0.3, 0.9],
  [118762317358.75, 1e-8, 1187.6231735875],
  [0.362, 100, 36.2],
  [1.1, 1.1, 1.21],
  [2.018, 1000, 2018],
  // biome-ignore lint/correctness/noPrecisionLoss: Ignore test
  [5.2, -3.8461538461538462, -20],
  [1.22, -1.639344262295082, -2],
  [2.5, -0.92, -2.3],
  [-2.2, 0.6363636363636364, -1.4],
  ["0.07", "100", 7],
  ["0.7", "0.1", 0.07],
  ["3", "0.3", 0.9],
  ["118762317358.75", "1e-8", 1187.6231735875],
  ["0.362", "100", 36.2],
  ["1.1", "1.1", 1.21],
  ["2.018", "1000", 2018],
  ["5.2", "-3.8461538461538462", -20],
  ["1.22", "-1.639344262295082", -2],
  ["2.5", "-0.92", -2.3],
  ["-2.2", "0.6363636363636364", -1.4],
  [8.0, -0.3625, -2.9],
  [6.6, 0.30303030303030304, 2],
  [10.0, -0.8, -8],
  [-1.1, -7.272727272727273, 8],
  ["8.0", "-0.3625", -2.9],
  ["6.6", "0.30303030303030304", 2],
  ["10.0", "-0.8", -8],
  ["-1.1", "-7.272727272727273", 8],
  [-1.23e4, 20, -246000],
  [1.7e-30, 1.5e20, 2.55e-10],
  ["-1.23e4", "20", -246000],
  ["1.7e-30", "1.5e20", 2.55e-10],
  [0.000000123456, 0.000000123456, 1.5241383936e-14],
  [1.23456e-7, 1.23456e-7, 1.5241383936e-14],
  ["0.000000123456", "0.000000123456", 1.5241383936e-14],
  ["1.23456e-7", "1.23456e-7", 1.5241383936e-14],
]

test.concurrent.each(dataTimes)("Times operation: %s * %s = %d", (a, b, output) => {
  expect(timesPrecision(a, b)).toBe(output)
})

expect(timesPrecision(2, 2, 3) === 12)
expect(timesPrecision(2, 2, 3, 0.1) === 1.2)
expect(timesPrecision("2", "2", "3") === 12)
expect(timesPrecision("2", "2", "3", "0.1") === 1.2)

expect(timesPrecision(...new Array(500).fill(1)) === 1)
// expect(npTimes(-3, 2.3333333333333335) === 7);
// expect(npTimes(-0.076, -92.10526315789471) === 7);
