import { faker } from '@faker-js/faker';

export class Node<K, V> {
    public next: Node<K, V> | null = null;
    constructor(public key: K, public value: V) {}
}

export class LinkedList<K, V> {
    private head: Node<K, V> | null = null;

    private _getLastNode(node: Node<K, V>): Node<K, V> {
        return node.next ? this._getLastNode(node.next) : node;
    }

    private _getNodeByKey(node: Node<K, V> | null, key: K): Node<K, V> | undefined {
        if (!node) return undefined;

        return node.key === key ? node : this._getNodeByKey(node.next, key);
    }

    public get(key: K): Node<K, V> | undefined {
        return this._getNodeByKey(this.head, key);
    }

    public append(key: K, value: V) {
        const node = new Node<K, V>(key, value);
        if (this.head === null) {
            this.head = node;
            return;
        }

        const existingNode = this._getNodeByKey(this.head, key);
        if (existingNode) {
            existingNode.value = value;
        }

        const lastNode = this._getLastNode(this.head);
        lastNode.next = node;
    }

    private _logList(node: Node<K, V> | null) {
        if (!node) {
            console.log('Linked list is empty.');
            return;
        }
        console.log({ key: node.key, value: node.value });
        node.next && this._logList(node.next);
    }

    public log() {
        this._logList(this.head);
    }
}

// LinkedList.append<string, number>('something', 10);
// LinkedList.append<string, number>('something', 3);
// LinkedList.append<string, number>('newValue', 3);
// LinkedList.append<string, number>('newValue', 10);
// LinkedList.append<string, number>('newValue', 11);

class HashMap<V> {
    public buckets: Array<LinkedList<string, V> | Node<string, V> | null>;

    constructor(public size = 4) {
        this.size = size;
        this.buckets = new Array(this.size).fill(null);
    }

    private hash(key: string) {
        const maxIndex = this.size - 1;
        return key.length % maxIndex;
    }

    public get(key: string): V | undefined {
        const hash = this.hash(key);

        if (!this.buckets[hash]) return undefined;

        if (this.buckets[hash] instanceof Node) {
            return this.buckets[hash].value;
        } else {
            return this.buckets[hash].get(key)?.value;
        }
    }
    private _replaceNodeValue(node: Node<string, V>, value: V) {
        node.value = value;
    }

    private _createLinkedList(values: Array<{ key: string; value: V }>): LinkedList<string, V> {
        const linkedList = new LinkedList<string, V>();
        values.forEach(({ key, value }) => linkedList.append(key, value));
        return linkedList;
    }

    public set(key: string, value: V) {
        const hash = this.hash(key);

        if (this.buckets[hash] === undefined) {
            throw Error('Bucket not found.');
        }

        if (this.buckets[hash] === null) {
            this.buckets[hash] = new Node(key, value);
        }

        if (this.buckets[hash] instanceof Node) {
            const firstNode = this.buckets[hash];

            if (this.buckets[hash].key === key) {
                this.buckets[hash].value = value;
            } else {
                this.buckets[hash] = this._createLinkedList([firstNode, { key, value }]);
            }
        }

        if (this.buckets[hash] instanceof LinkedList) {
            this.buckets[hash].append(key, value);
        }
    }
}

type User = {
    name: string;
    age: number;
};

const map = new HashMap<User>();

function userFactory() {
    return { name: faker.person.fullName(), age: faker.number.int({ min: 18, max: 40 }) };
}

map.set('key', userFactory());
map.set('key', userFactory());
map.set('key2', userFactory());
map.set('key2', userFactory());
map.set('key3', userFactory());

console.log(map.buckets);

console.log(map.get('key'));
