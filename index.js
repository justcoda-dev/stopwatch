;(() => {
	timer(document.querySelector('[data-element="container"]'))
	function timer($container) {
		const elements = {
			$minutes: createElement('div', {
				parent: $container,
				attrs: {
					class: 'minutes',
					'data-element': 'wrapper',
				},
				value: '0',
			}),
			$seconds: createElement('div', {
				parent: $container,
				attrs: {
					class: 'seconds',
					'data-element': 'wrapper',
				},
				value: '0',
			}),
			$ms: createElement('div', {
				parent: $container,
				attrs: {
					class: 'miliseconds',
					'data-element': 'wrapper',
				},
				value: '0',
			}),
			$start: createElement('button', {
				parent: $container,
				attrs: {
					class: 'start',
					'data-element': 'wrapper',
				},
				value: 'start',
			}),
			$stop: createElement('button', {
				parent: $container,
				attrs: {
					class: 'stop',
					'data-element': 'wrapper',
				},
				value: 'stop',
			}),
			$circle: createElement('button', {
				parent: $container,
				attrs: {
					class: 'circle',
					'data-element': 'wrapper',
				},
				value: 'circle',
			}),
			$time: createElement('ol', {
				parent: $container,
				attrs: {
					class: 'time',
					'data-element': 'wrapper',
				},
				value: '',
			}),
		}

		const state = {
			time: 0,
			intervalId: 0,
		}

		elements.$circle.addEventListener('click', () => {
			createElement('li', {
				parent: elements.$time,
				attrs: {
					class: 'li',
					'data-element': 'wrapper',
				},
				value: rules(state.time),
			})
		})

		function timerMs() {
			state.intervalId = setInterval(() => {
				state.time += 10
				rules(state.time)
			}, 10)
		}

		const rules = (ms = 0) => {
			const miliseconds = ms % 1000
			const seconds = Math.floor(ms / 1000) % 60
			const minutes = Math.floor(Math.floor(ms / 1000) / 60) % 60
			elements.$ms.textContent = miliseconds
			elements.$seconds.textContent = seconds
			elements.$minutes.textContent = minutes
			return `${minutes} min ${seconds} sec ${miliseconds} ms`
		}

		elements.$start.addEventListener('click', () => {
			if (!state.intervalId) {
				elements.$start.textContent = 'pause'
				return timerMs()
			}
			if (state.intervalId) {
				elements.$start.textContent = 'start'
				clearInterval(state.intervalId)
				state.intervalId = 0
			}
		})

		elements.$stop.addEventListener('click', () => {
			clearInterval(state.intervalId)
			state.intervalId = 0
			elements.$minutes.textContent = 0
			elements.$seconds.textContent = 0
			elements.$ms.textContent = 0
			state.time = 0
			elements.$start.textContent = 'start'
			elements.$time.textContent = ''
		})

		function createElement(tag, obj) {
			const $el = document.createElement(tag)
			if (obj.attrs) {
				Object.entries(obj.attrs).forEach(([name, value]) => {
					$el.setAttribute(name, value)
				})
			}
			obj.parent.appendChild($el)
			$el.textContent = obj.value
			return $el
		}
	}
})()
