// adopted from https://www.tutorialspoint.com/external-sorting-with-example-in-cplusplus
// replace merge sort with heap sort
// use template class minHeap

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <limits.h>

using namespace std;

struct MinHeapNode {

	int element;
	int i;
	
	bool operator < (const MinHeapNode& node) {
		return element < node.element;
	}
};

template <typename T>
void swap(T* x, T* y);

template <class T>
class MinHeap {

	T* harr;
	int heap_size;

	public:
		MinHeap(T a[], int size);
		void MinHeapify(int);
		void MinHeapify(int, int);
		int left(int i) {
			return (2 * i + 1);
		}
		int right(int i) {
			return (2 * i + 2);
		}
		MinHeapNode getMin() {
			return harr[0];
		}
		void replaceMin(T x) {
			harr[0] = x;
			MinHeapify(0);
		}
		// Default arguments are not part of the definition, only declaration.
		// https://stackoverflow.com/questions/25647199/c-default-arguments-cannot-be-added-to-an-out-of-line-definition-of-a-member
		void sort(bool asc = true);
};


//template <class T>
//void MinHeap<T>::sort(bool asc = true) { // wrong!
//
//}

template <class T>
void MinHeap<T>::sort(bool asc) {
	int last = heap_size;
	while (last--) {
		swap(&harr[0], &harr[last]);
		MinHeapify(0, last);
	}
	if (asc) {
		int i = 0, j = heap_size - 1;
		while (i < j) {
			swap(&harr[i++], &harr[j--]); // (lldb) p *(int(*)[10])&harr[0]
		}
	}
}

template <class T>
MinHeap<T>::MinHeap(T a[], int size) {
	
	heap_size = size;
	harr = a;
	int i = (heap_size - 1) / 2;
	while (i >= 0) {
		MinHeapify(i);
		i--;
	}
}

template <class T>
void MinHeap<T>::MinHeapify(int i, int size) {
	
	int l = left(i);
	int r = right(i);
	int smallest = i;
	if (l < size && harr[l] < harr[smallest])
		smallest = l;
	if (r < size && harr[r] < harr[smallest])
		smallest = r;
	if (smallest != i) {
		swap(&harr[i], &harr[smallest]);
		MinHeapify(smallest, size);
	}
}

template <class T>
void MinHeap<T>::MinHeapify(int i) {
	
	MinHeapify(i, heap_size);
}

template <typename T>
void swap(T* x, T* y)
{
	T temp = *x;
	*x = *y;
	*y = temp;
}

void merge(int arr[], int l, int m, int r)
{
	int i, j, k;
	int n1 = m - l + 1;
	int n2 = r - m;

	int L[n1], R[n2];
	for (i = 0; i < n1; i++)
		L[i] = arr[l + i];
	for (j = 0; j < n2; j++)
		R[j] = arr[m + 1 + j];
	i = 0;
	j = 0;
	k = l;
	while (i < n1 && j < n2) {
		if (L[i] <= R[j])
			arr[k++] = L[i++];
		else
			arr[k++] = R[j++];
	}
	while (i < n1)
		arr[k++] = L[i++];
	while (j < n2)
		arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
	
	if (l < r) {
		int m = l + (r - l) / 2;
		mergeSort(arr, l, m);
		mergeSort(arr, m + 1, r);
		merge(arr, l, m, r);
	}
}

FILE* openFile(char* fileName, char* mode)
{
	FILE* fp = fopen(fileName, mode);
	if (fp == NULL) {
		perror("Error while opening the file.\n");
		exit(EXIT_FAILURE);
	}
	return fp;
}

void mergeData(char* opFile, int memory, int num_ways) {
	
	FILE* in[num_ways];
	for (int i = 0; i < num_ways; i++) {
		char fileName[10];
		snprintf(fileName, sizeof(fileName), "%d.txt", i);
		in[i] = openFile(fileName, "r");
	}
	FILE* out = openFile(opFile, "w");
	MinHeapNode* harr = new MinHeapNode[num_ways];
	for (int i = 0; i < num_ways; i++) { // read a number from each file into memory(heap)
		if (fscanf(in[i], "%d ", &harr[i].element) != 1)
			break;
		harr[i].i = i;
	}
	MinHeap<MinHeapNode> hp(harr, num_ways);
	int count = 0;
	while (count != num_ways) {
		MinHeapNode root = hp.getMin();
		fprintf(out, "%d ", root.element);
		if (fscanf(in[root.i], "%d ", &root.element)!= 1) {
			root.element = INT_MAX;
			count++;
		}
		hp.replaceMin(root);
	}
	for (int i = 0; i < num_ways; i++)
		fclose(in[i]);

	fclose(out);
}

void initialiseData( char* ipFile, int memory, int num_ways) {
	
	FILE* in = openFile(ipFile, "r");
	FILE* out[num_ways];
	char fileName[10] = {0};
	for (int i = 0; i < num_ways; i++) {

		snprintf(fileName, sizeof(fileName), "%d.txt", i);
		out[i] = openFile(fileName, "w");
	}
	int* arr = (int*)malloc( memory * sizeof(int));
	bool more_input = true;
	int next_opFile = 0;

	// split a huge file into small pieces
	// read into memory, sort and output into files
	int i;
	while (more_input) {
		for (i = 0; i < memory; i++) {
			if (fscanf(in, "%d ", &arr[i]) != 1) {
				more_input = false;
				break;
			}
		}
		//mergeSort(arr, 0, i - 1); // Why merge sort? merge sort needs extra memory, I don't think it is a good solution here
		MinHeap<int> hp(arr, memory);
		hp.sort();
		
		for (int j = 0; j < i; j++)
			fprintf(out[next_opFile], "%d ", arr[j]);
		next_opFile++;
	}
	for (int i = 0; i < num_ways; i++)
		fclose(out[i]);

	fclose(in);
}

void externalSort( char* ipFile, char* opFile, int num_ways, int memory) {
	
	initialiseData(ipFile, memory, num_ways);
	mergeData(opFile, memory, num_ways);
}

void generateData (char *ipFile, int num_ways, int memory, int max = INT_MAX) {
	FILE* in = openFile(ipFile, "w");
	srand(time(NULL));
	for (int i = 0; i < num_ways * memory; i++)
		fprintf(in, "%d ", rand() % max);
	fclose(in);
}

int main() {
	
	int num_ways = 4;
	int memory = 10;

	char ipFile[] = "inputFile.txt";
	char opFile[] = "outputFile.txt";
	
	generateData(ipFile, num_ways, memory, 10000);

	externalSort(ipFile, opFile, num_ways, memory);
	
	return 0;
}