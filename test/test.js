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
    test("heapsort", function () {
        var ary = [0,1,2,3,4,5,6],
            inOrder = ary.slice(0);
        _performOnAllPermutations(ary, function (ary) {
            var sorted = ary.slice(0);
            SU.heapsort(sorted);
            ok(sorted.equals(inOrder), ary.join(',') + ' -- ' + inOrder.join(','));
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
            length = this.length,l
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
