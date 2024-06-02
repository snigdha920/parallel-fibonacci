const workerURL = new URL("worker.ts", import.meta.url).href;
const worker = new Worker(workerURL);

worker.postMessage("hello");
worker.onmessage = (event) => {
	console.log("worker.onmessage", event.data);
};
