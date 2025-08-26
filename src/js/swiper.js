( swiperContainer => {

	if(!swiperContainer.length) {

		return;

	}

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	const isPlaying = audio => !audio.paused && audio.currentTime > 0 && !audio.ended;

	const setDuration = (player,audio) => player.querySelector('.audio-player__time-total').textContent = formatTime(audio.duration);

	[...swiperContainer].forEach( swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  canUse = swipe.classList.contains('swiper--can-use'),
			  example = swipe.classList.contains('swiper--example');

		swipeNav.className = 'swiper-pagination';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="m14.469 19.53 1.06-1.06L9.06 12l6.47-6.47-1.06-1.06L6.939 12l7.53 7.53Z" clip-rule="evenodd"/></svg>';
		swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="m9.531 19.53-1.06-1.06L14.94 12 8.47 5.53l1.06-1.06L17.06 12l-7.53 7.53Z" clip-rule="evenodd"/></svg>';

		swipeBtns.append(swipePrev);
		swipeBtns.append(swipeNext);

		swipe.append(swipeBtns);
		swipe.append(swipeNav);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');
			swipeBtns.classList.add('hide');

			if ( swipe.closest('.swiper-style') ) {

				swipe.closest('.swiper-style').classList.remove('swiper-style');

			}

		}

		if (example) {

			const audioTemplate = document.querySelector('#audio-player-template').innerHTML;

			const initialSlide = parseInt(swipe.getAttribute('data-start-slide')) - 1;
			let bagRecursion = count / 2;

			window.addEventListener("load", () => {

				[...swipe.querySelectorAll('.audio-player')].forEach( player => setDuration(player,player.querySelector('audio')));

			});

			[...swipe.querySelectorAll('.audio-player')].forEach( player => {

				player.insertAdjacentHTML('beforeend', audioTemplate);

				const audio = player.querySelector('audio'),
					  btn = player.querySelector('.audio-player__btn'),
					  buffered = player.querySelector('.audio-player__buffered'),
					  progress = player.querySelector('.audio-player__progress');


				audio.addEventListener("loadedmetadata", () => setDuration(player,audio) );
				audio.preload = 'metadata';

				audio.addEventListener("timeupdate", () => {

					setDuration(player,audio);

					btn.classList.toggle('is-pause',!isPlaying(audio));

					const total = audio.duration;
					const currentTime = audio.currentTime;

					progress.style.width = (currentTime / total * 100) + '%';

					if (audio.buffered.length > 0) {

						const loaded = audio.buffered.end(audio.buffered.length - 1);

						if (!isNaN(total)) {
							buffered.style.width = (loaded / total * 100) + '%';
						}

					}

					player.querySelector('.audio-player__time-current').textContent = formatTime(currentTime);

				});

				btn.addEventListener("click", () => {

					[...swipe.querySelectorAll('audio')].forEach( _audio => {

						if ( audio === _audio ) {

							audio.paused ? audio.play() : audio.pause();

						}
						else {

							_audio.pause();

						}

						const _player = _audio.closest('.audio-player');
						_player.querySelector('.audio-player__btn').classList.toggle('is-pause',!isPlaying(_audio));

					});

				});

				player.querySelector('.audio-player__time-current').textContent = formatTime(audio.currentTime);

			});

			swipeNav.classList.add('hide');

			toggleSwipe = () => {

				new Swiper(swipe, {
					loop: true,
					initialSlide,
					slidesPerView: 'auto',
					centeredSlides: true,
					slideToClickedSlide: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					on: {
						slideChangeTransitionEnd: () => {
							[...swipe.querySelectorAll('audio')].forEach( audio => {
								const slide = audio.closest('.swiper-slide');
								if ( slide.classList.contains('swiper-slide-active') === false ) {
									audio.pause();
									slide.querySelector('.audio-player__btn').classList.add('is-pause');
								}
							});
							if ( swipe.swiper ){
								swipe.swiper.loopFix();
								bagRecursion = count / 2;
							}
						},
						loopFix: () => {
							if ( swipe.swiper ){
								if( swipe.swiper.progress !== 0.5 && bagRecursion > 0 ) {
									bagRecursion--;
									swipe.swiper.loopFix();
								}
							}
						}
					}
				});

			}

		}

		if (canUse) {

			let initialSlide = 0;

			toggleSwipe = () => {

				resetSwipe();

				if ( window.innerWidth < 1200 ) {

					swipe.parentNode.classList.add('swiper-style');
					swipeBtns.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						autoHeight: true,
						initialSlide: initialSlide,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {
							slideChange() {
								if ( mySwipe ) {
									initialSlide = mySwipe.realIndex;
								}
							}
						}
					});

				}

			}

			swipe.addEventListener('swiperResize', toggleSwipe);

		}

		swipe.addEventListener('swiperJsLoad', toggleSwipe);

	});

	let resizeTimeout = null,
		windowWidthOLd = window.innerWidth;

	window.addEventListener("resize", () => {

		window.requestAnimationFrame( () => {

			if (resizeTimeout === null) {

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;

						if (window.Swiper) {

							[...swiperContainer].forEach( swipe => swipe.dispatchEvent(new Event("swiperResize")) );

						}

					}

				}, 1000);

			}

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper-bundle.min.js';

	script.onload = () => [...swiperContainer].forEach( swipe => swipe.dispatchEvent(new Event("swiperJsLoad")) );

	document.head.append(script);

})(document.querySelectorAll('.swiper'));