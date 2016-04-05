module.exports = function(io) {
    var supportedEvents = ['url'];
    var clients = [];
	var monitors = [];

	function initialiseMonitor(socket) {
		monitors.push(socket);
		console.log(`Monitor connected: ${socket.request._query.monitorId}`);

		socket.on('disconnect', () => {
			monitors.splice(monitors.indexOf(socket), 1);
			console.log(`Monitor disconnected: ${socket.request._query.monitorId}`);
		});
	}

	function initialiseClient(socket) {
		clients.push(socket);
		console.log(`client connected`);

		socket.on('url', data => {
			var targetMonitor = monitors.find(m => m.request._query.monitorId == data.monitorId);
			console.log(monitors[0].request._query.monitorId);
			if (targetMonitor){
				console.log(`sending ${data.url} to ${data.monitorId}`)
				targetMonitor.emit('url', data);
			}
			// monitors.forEach(mon => {
			// 	mon.emit('url', data);
			// })
		});
		
		socket.on('get-monitors', () =>{
			socket.emit('monitor-list', monitors.map(m => m.request._query.monitorId));
			return monitors.map(m => m.request._query.monitorId)
		})

		// ['url'].forEach(eventName => {
		// 	socket.on(eventName, data => {
		// 		console.log('event: ' + eventName);
		// 		clients.forEach((s) => {
		// 			//if (s.request._query.memberId == data.memberId) {
		// 			s.emit(eventName, data);
		// 			//}
		// 		})
		// 	});
		// });

		socket.on('disconnect', () => {
			clients.splice(clients.indexOf(socket), 1);
			console.log(`client disconnected`);
		});
	}

    io.on('connection', function(socket) {
		if (socket.request._query.monitorId) {
			initialiseMonitor(socket);
		} else {
			initialiseClient(socket);
		}
    });
};
