import { fib } from "./fib";

self.onmessage = (event) => {
	const num = event.data;
	const result = fib(num);
	self.postMessage(result);
};
