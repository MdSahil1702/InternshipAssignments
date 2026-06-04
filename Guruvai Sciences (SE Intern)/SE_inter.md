# Data Structures & Systems Design Assignment

## Software Engineering Intern

Author: Md Sahil Siddiqui
Date: 4 June 2026



## Problem 1: LRU Cache Implementation

### Explanation 
To achieve o(1) time complexity for both `get` and `put` operations, I combine two data structure:

-**Hashmap** : Provides O(1) key lookup to find nodes quickly
-**Doubly LinkedList** : Maintains the order of usage, most recently used (MRU) at the head, least recently used(LRU) at the tail

**How it works:**
- when `get(key)` is called , I look up the node in the HashMap, move it to the head(mark as recently used), and return its value
- When `put(key,value)` is called, I either update an existing node (move to head ) or create a new node at head
- If capacity is exceeded, I remove the node at the tail (LRU) and delte it from the Hashmap

This gives O(1) for all operations because each oepration onlyinvolves:
- Hasmap lookup: O(1)
- Pointer Manipulation in Linked List: O(1)

## Code Implementation in python

class Node:
    def __init__(self, key =0 , value=0):
        self.key= key
        self.value=value
        self.prev=None
        self.next = None

class LRUcache:
    def __init__(self, capacity:int):
        self.capacity = capacity
        self.cache ={} 

        self.head= Node()
        self.tail-=Node()
        self.head.next=self.tail
        self.tail.prev = self.head

    def _remove_node(self, node: Node):
        prev_node = node.prev
        next_node= node.next
        prev_node.next = next_node
        next_node.prev = prev_node
    
    def _addtohead(self, node: Node):
        node.lprev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _move_to_head(self, node: Node):
       
        self._remove_node(node)
        self._add_to_head(node)
    
    def _pop_tail(self) -> Node:
        
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self._move_to_head(node) 
        return node.value
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
           
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Add new key
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            
            
            if len(self.cache) > self.capacity:
                lru_node = self._pop_tail()
                del self.cache[lru_node.key]
