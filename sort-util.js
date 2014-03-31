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
 * 
 * @author      Benjamin Dixon
 * @description Classic sorting algorithms implemented in JavaScript.
 */
!function (SU, undefined) {

  SU.version = 'v0.1.2';

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
        if (compare(collection[j], collection[j - 1]) < 0) {
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

      // calculate midpoint of section
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
   *
   * @param {Array}    collection The array contained segments to be merged
   * @param {Number}   left       The start index of left segment
   * @param {Number}   mid        The end index of left segment
   * @param {Number}   right      The end index of the right segment
   * @param {Function} [compare]  The compare function to determine order
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
      if (leftPointer > leftStop) {        // left segment finished
        sorted.push(collection[rightPointer]);
        rightPointer++;
      } else if (rightPointer > right) {  // right segment finished
        sorted.push(collection[leftPointer]);
        leftPointer++;
      } else {                        // neither segment exhausted, must compare
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
    var compare = compare || _defaultCompare;

    SU._quicksort(collection, 0, collection.length - 1, compare);

    return collection;
  }

  /**
   * Private recursive helper function for quicksort.
   *
   * @param {Array}    collection The collection to be sorted
   * @param {Number}   left       Start index of segment
   * @param {Number}   right      End index of segment
   * @param {Function} [compare]  The compare function to determine order
   */
  SU._quicksort = function(collection, left, right, compare) {
    var compare = compare || _defaultCompare,
        pivot   = null;

    if (left < right) {
      // Find new pivot and partition
      pivot = SU._partition(collection, left, right, compare);
      // Recursively quicksort left segment
      SU._quicksort(collection, left, pivot - 1, compare);
      // Recursively quicksort right setgment
      SU._quicksort(collection, pivot + 1, right, compare);
    }
  }

  /**
   * Private helper function for quicksort algorithm. On a
   * specified range, it creates a pivot and ensures that all
   * values NOT greater than the pivot occur on the left side
   * of the pivot element, and all values NOT less than the pivot
   * occur on the right side of the pivot element.
   *
   * @param  {Array}  collection The collection to be partitioned
   * @param  {Number} left       The start of the range to be partitioned
   * @param  {Number} right      The end of the range to be partitioned
   * @param  {Number} compare    The compare function to use
   * @return {Number}            The index of the pivot
   */
  SU._partition = function(collection, left, right, compare) {
    var compare = compare || _defaultCompare,
        pivot   = collection[right],
        pIndex  = left,
        tmp     = null,
        i       = 0;

    for (i = left; i < right; i++) {
      if (compare(collection[i], pivot) <= 0) {
        tmp = collection[i];
        collection[i] = collection[pIndex];
        collection[pIndex] = tmp;
        pIndex++;
      }
    }

    collection[right] = collection[pIndex];
    collection[pIndex] = pivot;

    return pIndex;
  };

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
        var compare   = compare || _defaultCompare,
            heapSize  = collection.length - 1,
            leafLevel = Math.floor(collection.length / 2),
            tmp       = null,
            i;

        // Turn the unsorted array into a heap
        for (i = leafLevel; i >= 0; i--) { SU._heapify(collection, i, heapSize); }
        // Sort by swapping root with last index in heap
        for (i = heapSize; i > 0; i--) {
            tmp = collection[i];
            collection[i] = collection[0];
            collection[0] = tmp;
            SU._heapify(collection, 0, i - 1);
        }

        return collection;
    }

  /**
   * Private helper function to maintain heap order starting
   * at the given index.
   *
   * @param  {Array}    collection The collection to be heapified
   * @param  {Number}   i          The index to start the heapification
   * @param  {Number}   iLast      The last index considered a part of the heap
   * @param  {Function} [compare]  The compare function to determine order
   * @return {Array}               The collection for function chaining
   */
  SU._heapify = function (collection, i, iLast, compare) {
    var compare  = compare || _defaultCompare,
        iLeft    = SU._left(i),
        iRight   = SU._right(i),
        iLargest = i,
        tmp      = null;

    if (iLeft <= iLast && compare(collection[iLeft], collection[i]) > 0) {
      iLargest = iLeft;
    }

    if (iRight <= iLast && compare(collection[iRight], collection[iLargest]) > 0) {
      iLargest = iRight;
    }

    if (iLargest != i) {    // Heap order is violated, fix it!
      tmp = collection[iLargest];
      collection[iLargest] = collection[i];
      collection[i] = tmp;
      SU._heapify(collection, iLargest, iLast, compare);
    }

    return collection;
  }

  /**
   * Get the index of the parent of the given index.
   *
   * @param  {Number} i The index to get the parent of
   * @return {Number}   The idnex of parent of the given index
   */
  SU._parent = function (i) { return Math.floor((i - 1) / 2); }

   /**
   * Get the index of the left child of the given index.
   *
   * @param  {Number} i The index to get the left child of
   * @return {Number}   The index of the left child of the given index
   */
  SU._left   = function (i) { return Math.floor((2 * i) + 1); }

  /**
   * Get the index of the right child of the given index.
   *
   * @param  {Number} i The index to get the right child of
   * @return {Number}   The index of the right child of the given index
   */
  SU._right  = function (i) { return Math.floor((2 * i ) + 2); }

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
