# sort-util-js

## Classic sorting algorithms implemented in JavaScript
 * Insertion Sort
 * Mergesort
 * Quicksort
 * Heapsort

### Insertion Sort
#### Process
1. Think of your collection as being of two parts:
  * A sorted segment (Starts out as the first item in the list because a segment of length 1 is by definition sorted!)
  * The unsorted segment is comprised if the elements that the algorithm hasn't gotten to yet
2. How the Algorithm works:
  * Iterate through collection
    * Add the current element to the end of your sorted segment
    * Compare with element before it and swap if it is out of order
    * Continue to iterate through your sorted segment.
    
#### Notes
  * O(N^2) time complexity makes it inefficient for large data sets.
  * O(1) memory use because it sorts in place
  * Can be efficient for semi-sorted data

### Mergesort
#### Process
  1. Recursively break the collection down (by halving) until you reach a list of length 1 (which is trivially sorted)
  2. Merge the halves back together when returning up the recursive stack. (This will require a temporary array the length of the two merged halves.)
  
#### Notes
  * O(N*log(N)) time complexity makes it *better* for large data sets.
  * O(N) Memory requirement (doesn't sort in place)
  * You get no efficiency gain or loss depending on the sorting of the data
  * Because of it's divide and conquer nature... it is a good candidate for parallelization

### Quicksort
#### Process
1. Partition step
  * Pick a pivot index (far right/left to be easy).
  * Think of the (sub-)collection as being comprised of 2 segments.
  * In the left segment are all the elements that are not greater than collection[pivotIndex]
  * In the right segment are all the elements that are not less than the collection[pivotIndex]
2. Recursive step -- recursively call the partition step on left segment, then right segment

#### Notes
* The worst case would be all elements are equal. This would mean that the pivot only decrements by 1 each time. Creating O(N^2). Another worst case would be reversed sorted order and picking the minimum element for the pivot each time.
* Average time is O(N*log(N))
* The recursion stack creates O(log(N)) memory complexity

### Heapsort
#### Process
1. Iterate collection starting at the level above leaf level in heap going back to 0
  * heapify at each node in iteration
2. Pop off the root of the heap (largest value in heap) and add it to the end of the collection before the previous largest element

#### Notes
* Heap sort has a worst case, best case and average case time complexity of O(N*log(N))
* Space complexity or heap sort is O(1)
* Large heaps will not place nice with modern caching making well implemented quicksort faster
