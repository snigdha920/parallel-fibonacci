import { fib } from "./fib";
function main() {
	const nums = [40, 41, 42];
	console.time("concurrent-fib");
	const results = Promise.all(
		nums.map((num) => {
			return new Promise((resolve, reject) => {
				console.time(`fib ${num}`);
				const workerURL = new URL("./fib-worker.ts", import.meta.url).href;
				const worker = new Worker(workerURL);

				worker.onmessage = (event) => {
					const result = event.data;
					resolve(result);
					worker.terminate();
					console.timeEnd(`fib ${num}`);
				};

				worker.onerror = (event) => {
					reject(event);
					worker.terminate();
					console.timeEnd(`fib ${num}`);
				};

				worker.postMessage(num);
			});
		}),
	);
	console.timeEnd("concurrent-fib"); // 0.49 ms
	results.then((results) => {
		console.log(results);
	});
	console.log("I can do other stuff while I wait for the results!");
}

main();
