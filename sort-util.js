/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Benjamin Dixon
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
!function (SU, undefined) {

  /* Insertion Sort
  ----------------------------------------------------------------------------*/

  /**
   * Sort the given array via the insertion sort algorithm and return the sorted
   * array for function chaining.
   *
   * @param  {Array}    collection The array to be sorted
   * @param  {Function} [compare]  The compare function to determine order
   * @return {Array}               The sorted array
   */
  SU.insertionSort = function(collection, compare) {
    var compare = compare || _defaultCompare,
        length  = collection.length,
        tmp     = null,
        i       = 0,
        j       = 0;

    for (i = 1; i < length; i++) {
      for (j = i; j > 0; j--) {
        if (collection[j] < collection[j - 1]) {
          tmp = collection[j];
          collection[j] = collection[j - 1];
          collection[j - 1] = tmp;
        } else {
          break;
        }
      }
    }

    return collection;
  };

  /* Mergesort
  ----------------------------------------------------------------------------*/

  /**
   * Sort the given array via the merge sort algorithm and return the sorted
   * array for function chaining.
   *
   * @param  {Array}    collection The array to be sorted
   * @param  {Function} [compare]  The compare function to determine order
   * @return {Array}               The sorted array
   */
  SU.mergesort = function (collection, compare) {
    var compare = compare || _defaultCompare;
    SU._mergesort(collection, 0, collection.length - 1, compare);
    return collection;
  }

  /**
   * Private recursive helper function for mergesort.
   *
   * @param {Array}    collection The array to be sorted
   * @param {Number}   left       The start index of the segment being sorted
   * @param {Number}   right      The end index of the segment being sorted
   * @param {Function} [compare]  The compare function to determine order
   */
  SU._mergesort = function(collection, left, right, compare) {
      var compare = compare || _defaultCompare,
          mid = null;

      // Length of 1 is sorted, done
      if (Math.floor(right - left) <= 0) { return; }

      mid = Math.floor((left + right) / 2);

      // mergesort left half
      SU._mergesort(collection, left, mid, compare);
      // mergesort right half
      SU._mergesort(collection, mid + 1, right, compare);
      // merge two sorted halves
      SU._merge(collection, left, mid, right, compare);
  };

  /**
   * private helper function to merge
   * for merge sort algorithm.
   */
  SU._merge = function(collection, left, mid, right, compare) {
    var compare      = compare || _defaultCompare,
        sorted       = [],
        leftPointer  = left,
        leftStop     = mid,
        rightPointer = mid + 1,
        length       = right - left + 1,
        i            = 0;

    while (leftPointer <= leftStop || rightPointer <= right) {
      if (leftPointer > leftStop) {
        sorted.push(collection[rightPointer]);
        rightPointer++;
      } else if (rightPointer > right) {
        sorted.push(collection[leftPointer]);
        leftPointer++;
      } else {
        if (compare(collection[leftPointer], collection[rightPointer]) > 0) {
          sorted.push(collection[rightPointer]);
          rightPointer++;
        } else {
          sorted.push(collection[leftPointer]);
          leftPointer++;
        }
      }
    }

    for (i = 0; i < length; i++) { collection[left + i] = sorted[i]; }

    return collection;
  };

  /* Quicksort
  ----------------------------------------------------------------------------*/

  /**
   * Sort the given array via the quicksort algorithm and return the sorted
   * array for function chaining.
   *
   * @param  {Array}    collection The array to be sorted
   * @param  {Function} [compare]  The compare function to determine order
   * @return {Array}               The sorted array
   */
  SU.quicksort = function (collection, compare) {
      return collection;
  }

  /* Heapsort
  ----------------------------------------------------------------------------*/

  /**
   * Sort the given array via the heapsort algorithm and return the sorted
   * array for function chaining.
   *
   * @param  {Array}    collection The array to be sorted
   * @param  {Function} [compare]  The compare function to determine order
   * @return {Array}               The sorted array
   */
  SU.heapsort = function (collection, compare) {
      return collection;
  }

  /**
   * Private default compare function. Works only
   * with numbers.
   *
   * @param  {Number} a The first element to compare
   * @param  {Number} b The second element to compare
   * @return {Number}   Returns < 0 if a < b, 0 if a == b and > 0 if a > b
   */
  function _defaultCompare(a, b) {
      return a - b;
  }
}(window.SortUtil = window.SortUtil || {})
