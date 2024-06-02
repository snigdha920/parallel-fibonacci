declare const self: Worker;

self.onmessage = (event: MessageEvent) => {
	console.log("self.onmessage", event.data);
	postMessage("world");
};
