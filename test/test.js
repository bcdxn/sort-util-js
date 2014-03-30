!function (__sort_util_dependency__) {
    var SU = __sort_util_dependency__;

   /* array equals needed for testing
    -----------------------------------------------------*/
    test( "Array.prototype.equals", function() {
      var collection0 = [0,1,2,3,4,5,6,7,8,9],
          collection1 = [];
          collection3 = [0,1,2,3,4,7,5,7,8,9],
          collection4 = [0,1,2,3,4,5,6,7,8,9];

      ok(collection0.equals(collection0) &&
        !collection0.equals(collection1) &&
        !collection0.equals(collection3) &&
        collection0.equals(collection4), "Passed!");
    });

    /* insertionSort
    -----------------------------------------------------*/
    test("insertionSort", function () {
      var ary = [0,1,2,3,4,5,6],
          inOrder = ary.slice(0);

      _performOnAllPermutations(ary, function (ary) {
        var sorted = ary.slice(0);

        SU.insertionSort(sorted);
        ok(sorted.equals(inOrder), ary.join(',') + ' -- ' + inOrder.join(','));
      }, 0);
    });

    /* mergesort
    -----------------------------------------------------*/
    test("_merge", function () {
      var ary0   = [4,5,6,0,1,2,3],
          ary1   = [0,1,2,3,4,5,6],
          merged = [0,1,2,3,4,5,6];

      ok(SU._merge(ary0, 0, 2, 6) &&
        SU._merge(ary1, 0, 2, 6), "Passed!");

    });

    test("mergesort", function () {
      var ary = [0,1,2,3,4,5,6],
          inOrder = ary.slice(0);

      _performOnAllPermutations(ary, function (ary) {
        var sorted = ary.slice(0);

        SU.mergesort(sorted);
        ok(sorted.equals(inOrder), ary.join(',') + ' -- ' + inOrder.join(','));
      }, 0);
    });

    /* quicksort
    -----------------------------------------------------*/
    test("_partition", function () {
      var ary    = [2,6,0,3,1,5,4],
          pIndex = SU._partition(ary),
          pass   = true,
          i;

      for (i = 0; i < ary.length; i++) {
        if (i < pIndex) {
          if (ary[i] > ary[pIndex]) {
            pass = false;
            break;
          }
        } else if (i > pIndex){
          if (ary[i] < ary[Index]) {
            pass = false;
            break;
          }
        }
      }

      ok(pass, "Passed!");
    });

    test("quicksort", function () {
      var ary = [0,1,2,3,4,5,6],
          inOrder = ary.slice(0);

      _performOnAllPermutations(ary, function (ary) {
        var sorted = ary.slice(0);

        SU.quicksort(sorted);
          ok(sorted.equals(inOrder), ary.join(',') + ' -- ' + inOrder.join(','));
      }, 0);
    });

    /* heapsort
    -----------------------------------------------------*/
    test("_parent", function () {
      var i0 = 1,
          i1 = 2,
          i2 = 3,
          i3 = 4,
          i4 = 10;

      ok(SU._parent(i0) == 0 && SU._parent(i1) == 0 &&
        SU._parent(i2) == 1 && SU._parent(i3) == 1 &&
        SU._parent(i4) == 4, "Passed!");
    });

    test("_left", function () {
      var i0 = 0,
          i1 = 1,
          i2 = 2,
          i3 = 3,
          i4 = 10;

      ok(SU._left(i0) == 1 && SU._left(i1) == 3 &&
        SU._left(i2) == 5 && SU._left(i3) == 7 &&
        SU._left(i4) == 21, "Passed!");
    });

    test("_right", function () {
      var i0 = 0,
          i1 = 1,
          i2 = 2,
          i3 = 3,
          i4 = 10;

      ok(SU._right(i0) == 2 && SU._right(i1) == 4 &&
        SU._right(i2) == 6 && SU._right(i3) == 8 &&
        SU._right(i4) == 22, "Passed!");
    });

    test("_heapify heap height == 1; no recursion", function () {
      var heap = [5,25,13];

      SU._heapify(heap, 0, heap.length);
      ok(heap.equals([25,5,13]));
    });

    test("_heapify heap height == 2; recursion used", function () {
      var heap = [5,25,13,10,14],
          heapified = [25,14,13,10,5];

      SU._heapify(heap, 0, heap.length);
      ok(heap.equals(heapified), heap.join(',') + ' -- ' + heapified.join(','));
    });

    test("heapsort", function () {
      var ary = [0,1,2,3,4,5,6],
          inOrder = ary.slice(0);

      _performOnAllPermutations(ary, function (ary) {
        var sorted = ary.slice(0);

        SU.heapsort(sorted);
        ok(sorted.equals(inOrder), ary.join(',') + ' -- ' + sorted + ' -- ' + inOrder.join(','));
      }, 0);
    });



    /* Helper Functions
    -----------------------------------------------------*/

    /**
     * Add an equals function for comparing arrays.
     *
     * @param  {Array}   ary The array to be compared
     * @return {Boolean}     True if the arrays are equal
     */
    Array.prototype.equals = function (ary, compare) {
      var compare = compare || _defaultCompare,
          length = this.length,
          i = 0

      if (this.length != ary.length) {  return false;  }

      for (i = 0; i < length; i++) {
        if (compare(this[i], ary[i]) != 0) {
          return false;
        }
      }

      return true;
    }

    function _defaultCompare(a, b) {
      return a - b;
    }

    /**
     * Perform the given operation on all permutations
     * of the array.
     *
     * @param {Array}    ary       The array to permute
     * @param {Function} operation The operation to be performed on each permutation
     * @param {Number}   left      The start index of sub-permutation
     */
    function _performOnAllPermutations(ary, operation, left) {
      var length = ary.length,
          tmp    = null,
          i;

      for (i = left; i < length; i++) {
        tmp = ary[left];
        ary[left] = ary[i];
        ary[i] = tmp;
        _performOnAllPermutations(ary, operation, left + 1);
        ary[i] = ary[left];
        ary[left] = tmp;
      }

      if (length - left < 1) {
        operation(ary);
        return;
      }
    }
}(window.SortUtil)
