import { fib } from "./fib";
function main() {
	const nums = [40, 41, 42];
	console.time("concurrent-fib");
	const results = Promise.all(
		nums.map((num) => {
			return new Promise((resolve, reject) => {
				console.time(`fib ${num}`);
				try {
					const result = fib(num);
					resolve(result);
					console.timeEnd(`fib ${num}`);
				} catch (e) {
					reject(e);
					console.timeEnd(`fib ${num}`);
				}
			});
		}),
	);
	console.timeEnd("concurrent-fib"); // 2.7s
	results.then((results) => {
		console.log(results);
	});
}

main();
