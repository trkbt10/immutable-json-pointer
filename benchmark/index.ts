import { performance } from 'perf_hooks';
import * as jsonPointer from '../src/index';

// Test data structures
const smallObject = {
  foo: 'bar',
  baz: { qux: 42 }
};

const mediumObject = {
  users: [
    { id: 1, name: 'Alice', profile: { age: 30, city: 'Tokyo' } },
    { id: 2, name: 'Bob', profile: { age: 25, city: 'Osaka' } },
    { id: 3, name: 'Charlie', profile: { age: 35, city: 'Kyoto' } }
  ],
  settings: {
    theme: 'dark',
    language: 'ja',
    notifications: { email: true, push: false }
  }
};

const largeObject = {
  data: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: `item-${i}`,
    nested: {
      deep: {
        deeper: {
          value: i * 2
        }
      }
    }
  }))
};

// Benchmark function
function benchmark(name: string, fn: () => void, iterations = 10000): number {
  // Warmup
  for (let i = 0; i < 100; i++) {
    fn();
  }
  
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  
  console.log(`${name}: ${totalTime.toFixed(2)}ms total, ${avgTime.toFixed(4)}ms/op`);
  return avgTime;
}

// Benchmark tests
function runBenchmarks() {
  console.log('JSON Pointer Performance Benchmarks\n');
  
  console.log('=== GET Operations ===');
  benchmark('get() - small object', () => {
    jsonPointer.get(smallObject, '/foo');
    jsonPointer.get(smallObject, '/baz/qux');
  });
  
  benchmark('get() - medium object', () => {
    jsonPointer.get(mediumObject, '/users/0/name');
    jsonPointer.get(mediumObject, '/settings/notifications/email');
  });
  
  benchmark('get() - large object', () => {
    jsonPointer.get(largeObject, '/data/500/nested/deep/deeper/value');
  });
  
  console.log('\n=== SET Operations ===');
  benchmark('set() - small object', () => {
    jsonPointer.set(smallObject, '/foo', 'new-value');
    jsonPointer.set(smallObject, '/baz/qux', 999);
  });
  
  benchmark('set() - medium object', () => {
    jsonPointer.set(mediumObject, '/users/0/name', 'NewName');
    jsonPointer.set(mediumObject, '/settings/theme', 'light');
  });
  
  benchmark('set() - large object', () => {
    jsonPointer.set(largeObject, '/data/500/value', 'updated');
  });
  
  console.log('\n=== HAS Operations ===');
  benchmark('has() - small object', () => {
    jsonPointer.has(smallObject, '/foo');
    jsonPointer.has(smallObject, '/nonexistent');
  });
  
  benchmark('has() - medium object', () => {
    jsonPointer.has(mediumObject, '/users/0/name');
    jsonPointer.has(mediumObject, '/nonexistent/path');
  });
  
  console.log('\n=== REMOVE Operations ===');
  benchmark('remove() - small object', () => {
    jsonPointer.remove(smallObject, '/foo');
  });
  
  benchmark('remove() - medium object', () => {
    jsonPointer.remove(mediumObject, '/users/0');
  });
  
  console.log('\n=== PARSE Operations ===');
  benchmark('parse() - simple paths', () => {
    jsonPointer.parse('/foo/bar');
    jsonPointer.parse('/users/0/name');
  });
  
  benchmark('parse() - complex paths with escaping', () => {
    jsonPointer.parse('/foo~1bar/baz~0qux');
    jsonPointer.parse('/path/with/many/segments/and/nested/values');
  });
  
  console.log('\n=== COMPILE Operations ===');
  benchmark('compile() - simple paths', () => {
    jsonPointer.compile(['foo', 'bar']);
    jsonPointer.compile(['users', 0, 'name']);
  });
  
  benchmark('compile() - complex paths', () => {
    jsonPointer.compile(['path', 'with', 'many', 'segments']);
  });
  
  console.log('\n=== DICT Operations ===');
  benchmark('dict() - small object', () => {
    jsonPointer.dict(smallObject);
  }, 1000);
  
  benchmark('dict() - medium object', () => {
    jsonPointer.dict(mediumObject);
  }, 100);
  
  console.log('\n=== TRANSFORM Operations ===');
  benchmark('transform() - simple transformation', () => {
    jsonPointer.transform(smallObject, '/baz/qux', (val: any) => val * 2);
  });
  
  console.log('\n=== CHAIN Operations ===');
  benchmark('chain() - multiple operations', () => {
    const operation = jsonPointer.chain(
      (doc: any) => jsonPointer.set(doc, '/foo', 'step1'),
      (doc: any) => jsonPointer.set(doc, '/baz/qux', 100),
      (doc: any) => jsonPointer.set(doc, '/new', 'added')
    );
    operation(smallObject);
  });
  
  console.log('\nBenchmarks completed!');
}

if (require.main === module) {
  runBenchmarks();
}

export { runBenchmarks, benchmark };