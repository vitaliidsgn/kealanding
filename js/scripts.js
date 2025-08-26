/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

	window.addEventListener("load", () => {

		document.documentElement.style.setProperty('--transitionDefault', '.3s');

	});

})();
( items => {

	if(!items.length) {

		return;

	}

	[...items].forEach( accordion => {

		let animateOn = false,
			activeItem = null;

		const items = accordion.querySelectorAll('.accordion__item');

		[...items].forEach( item => {

			const btn = item.querySelector('.accordion__btn'),
				  head = item.querySelector('.accordion__head'),
				  body = item.querySelector('.accordion__body'),
				  arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

			arrow.setAttributeNS(null, "viewBox", "0 0 32 32");
			arrow.setAttributeNS(null, "width", 32);
			arrow.setAttributeNS(null, "height", 32);
			arrow.innerHTML = `<line x1="6" y1="16" x2="25" y2="16" stroke-width="1.5"/><line x1="16" y1="6" x2="16" y2="25" stroke-width="1.5"/>`;

			head.append(arrow);

			btn.addEventListener('click', () => {

				animateOn = true;

				if( item === activeItem ){

					item.classList.remove('is-open');
					activeItem = null;

				} else {

					activeItem = item;

					activeItem.querySelector('.accordion__body').style.height = activeItem.querySelector('.accordion__body-inner').offsetHeight + 'px';

					[...items].forEach( el => el.classList.toggle('is-open', el === item));

				}

			});

			body.addEventListener('transitionend', () => {

				const rect = head.getBoundingClientRect();
				const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

				if( animateOn && activeItem && isInViewport === false ){

					head.scrollIntoView({ behavior: 'smooth' });

				}

				animateOn = false;

			});

		});

	});

})(document.querySelectorAll('.accordion'));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLmpzIiwiYWNjb3JkaW9uLmpzIiwic3dpcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG5cclxuwqkga292cmlnaW5cclxu0JLRgdC1INC/0YDQsNCy0LAg0YDQsNC30YDQtdGI0LXQvdGLXHJcbtC60YDQsNGB0LjQstGL0Lkg0LTQuNC30LDQudC9INC00L7Qu9C20LXQvSDQuNC80LXRgtGMINC60YDQsNGB0LjQstGL0Lkg0LrQvtC0wq5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9odG1scGx1c2Nzcy9cclxuXHJcbiovXHJcblxyXG4oICgpID0+IHtcclxuXHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuXHJcblx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdHJhbnNpdGlvbkRlZmF1bHQnLCAnLjNzJyk7XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoIGl0ZW1zID0+IHtcclxuXHJcblx0aWYoIWl0ZW1zLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRbLi4uaXRlbXNdLmZvckVhY2goIGFjY29yZGlvbiA9PiB7XHJcblxyXG5cdFx0bGV0IGFuaW1hdGVPbiA9IGZhbHNlLFxyXG5cdFx0XHRhY3RpdmVJdGVtID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBpdGVtcyA9IGFjY29yZGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19pdGVtJyk7XHJcblxyXG5cdFx0Wy4uLml0ZW1zXS5mb3JFYWNoKCBpdGVtID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IGJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fYnRuJyksXHJcblx0XHRcdFx0ICBoZWFkID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19oZWFkJyksXHJcblx0XHRcdFx0ICBib2R5ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5JyksXHJcblx0XHRcdFx0ICBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xyXG5cclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2aWV3Qm94XCIsIFwiMCAwIDMyIDMyXCIpO1xyXG5cdFx0XHRhcnJvdy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcIndpZHRoXCIsIDMyKTtcclxuXHRcdFx0YXJyb3cuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJoZWlnaHRcIiwgMzIpO1xyXG5cdFx0XHRhcnJvdy5pbm5lckhUTUwgPSBgPGxpbmUgeDE9XCI2XCIgeTE9XCIxNlwiIHgyPVwiMjVcIiB5Mj1cIjE2XCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIvPjxsaW5lIHgxPVwiMTZcIiB5MT1cIjZcIiB4Mj1cIjE2XCIgeTI9XCIyNVwiIHN0cm9rZS13aWR0aD1cIjEuNVwiLz5gO1xyXG5cclxuXHRcdFx0aGVhZC5hcHBlbmQoYXJyb3cpO1xyXG5cclxuXHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiggaXRlbSA9PT0gYWN0aXZlSXRlbSApe1xyXG5cclxuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbSA9IG51bGw7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbSA9IGl0ZW07XHJcblxyXG5cdFx0XHRcdFx0YWN0aXZlSXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5Jykuc3R5bGUuaGVpZ2h0ID0gYWN0aXZlSXRlbS5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19ib2R5LWlubmVyJykub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdFx0XHRbLi4uaXRlbXNdLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nLCBlbCA9PT0gaXRlbSkpO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcclxuXHJcblx0XHRcdFx0Y29uc3QgcmVjdCA9IGhlYWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0Y29uc3QgaXNJblZpZXdwb3J0ID0gcmVjdC50b3AgPj0gMCAmJiByZWN0LmJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdGlmKCBhbmltYXRlT24gJiYgYWN0aXZlSXRlbSAmJiBpc0luVmlld3BvcnQgPT09IGZhbHNlICl7XHJcblxyXG5cdFx0XHRcdFx0aGVhZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhbmltYXRlT24gPSBmYWxzZTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcbn0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24nKSk7IiwiKCBzd2lwZXJDb250YWluZXIgPT4ge1xyXG5cclxuXHRpZighc3dpcGVyQ29udGFpbmVyLmxlbmd0aCkge1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG5cclxuXHRjb25zdCBmb3JtYXRUaW1lID0gc2Vjb25kcyA9PiB7XHJcblx0XHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG5cdFx0Y29uc3Qgc2VjcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcclxuXHRcdHJldHVybiBgJHttaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgaXNQbGF5aW5nID0gYXVkaW8gPT4gIWF1ZGlvLnBhdXNlZCAmJiBhdWRpby5jdXJyZW50VGltZSA+IDAgJiYgIWF1ZGlvLmVuZGVkO1xyXG5cclxuXHRjb25zdCBzZXREdXJhdGlvbiA9IChwbGF5ZXIsYXVkaW8pID0+IHBsYXllci5xdWVyeVNlbGVjdG9yKCcuYXVkaW8tcGxheWVyX190aW1lLXRvdGFsJykudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKGF1ZGlvLmR1cmF0aW9uKTtcclxuXHJcblx0Wy4uLnN3aXBlckNvbnRhaW5lcl0uZm9yRWFjaCggc3dpcGUgPT4ge1xyXG5cclxuXHRcdGxldCBteVN3aXBlID0gbnVsbCxcclxuXHRcdFx0dG9nZ2xlU3dpcGUgPSBudWxsLFxyXG5cdFx0XHRyZXNldFN3aXBlID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBzd2lwZU5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHQgIHN3aXBlQnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHQgIHN3aXBlTmV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG5cdFx0XHQgIHN3aXBlUHJldiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG5cdFx0XHQgIGl0ZW1zID0gc3dpcGUucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZScpLFxyXG5cdFx0XHQgIGNvdW50ID0gaXRlbXMubGVuZ3RoLFxyXG5cdFx0XHQgIGNhblVzZSA9IHN3aXBlLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLS1jYW4tdXNlJyksXHJcblx0XHRcdCAgZXhhbXBsZSA9IHN3aXBlLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLS1leGFtcGxlJyk7XHJcblxyXG5cdFx0c3dpcGVOYXYuY2xhc3NOYW1lID0gJ3N3aXBlci1wYWdpbmF0aW9uJztcclxuXHJcblx0XHRzd2lwZUJ0bnMuY2xhc3NOYW1lID0gJ3N3aXBlci1uYXZpZ2F0aW9uJztcclxuXHRcdHN3aXBlUHJldi5jbGFzc05hbWUgPSAnc3dpcGVyLWJ1dHRvbi1wcmV2IGJ1dHRvbic7XHJcblx0XHRzd2lwZU5leHQuY2xhc3NOYW1lID0gJ3N3aXBlci1idXR0b24tbmV4dCBidXR0b24nO1xyXG5cclxuXHRcdHN3aXBlUHJldi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdQcmV2aW91cyBzbGlkZScpO1xyXG5cdFx0c3dpcGVOZXh0LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsJ05leHQgc2xpZGUnKTtcclxuXHJcblx0XHRzd2lwZVByZXYuaW5uZXJIVE1MID0gJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwibTE0LjQ2OSAxOS41MyAxLjA2LTEuMDZMOS4wNiAxMmw2LjQ3LTYuNDctMS4wNi0xLjA2TDYuOTM5IDEybDcuNTMgNy41M1pcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPic7XHJcblx0XHRzd2lwZU5leHQuaW5uZXJIVE1MID0gJzxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwibTkuNTMxIDE5LjUzLTEuMDYtMS4wNkwxNC45NCAxMiA4LjQ3IDUuNTNsMS4wNi0xLjA2TDE3LjA2IDEybC03LjUzIDcuNTNaXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiLz48L3N2Zz4nO1xyXG5cclxuXHRcdHN3aXBlQnRucy5hcHBlbmQoc3dpcGVQcmV2KTtcclxuXHRcdHN3aXBlQnRucy5hcHBlbmQoc3dpcGVOZXh0KTtcclxuXHJcblx0XHRzd2lwZS5hcHBlbmQoc3dpcGVCdG5zKTtcclxuXHRcdHN3aXBlLmFwcGVuZChzd2lwZU5hdik7XHJcblxyXG5cdFx0cmVzZXRTd2lwZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdGlmKG15U3dpcGUpIHtcclxuXHJcblx0XHRcdFx0bXlTd2lwZS5kZXN0cm95KGZhbHNlLHRydWUpO1xyXG5cdFx0XHRcdG15U3dpcGUgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzd2lwZU5hdi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcblx0XHRcdHN3aXBlQnRucy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcblxyXG5cdFx0XHRpZiAoIHN3aXBlLmNsb3Nlc3QoJy5zd2lwZXItc3R5bGUnKSApIHtcclxuXHJcblx0XHRcdFx0c3dpcGUuY2xvc2VzdCgnLnN3aXBlci1zdHlsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci1zdHlsZScpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZXhhbXBsZSkge1xyXG5cclxuXHRcdFx0Y29uc3QgYXVkaW9UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdWRpby1wbGF5ZXItdGVtcGxhdGUnKS5pbm5lckhUTUw7XHJcblxyXG5cdFx0XHRjb25zdCBpbml0aWFsU2xpZGUgPSBwYXJzZUludChzd2lwZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQtc2xpZGUnKSkgLSAxO1xyXG5cdFx0XHRsZXQgYmFnUmVjdXJzaW9uID0gY291bnQgLyAyO1xyXG5cclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuXHJcblx0XHRcdFx0Wy4uLnN3aXBlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hdWRpby1wbGF5ZXInKV0uZm9yRWFjaCggcGxheWVyID0+IHNldER1cmF0aW9uKHBsYXllcixwbGF5ZXIucXVlcnlTZWxlY3RvcignYXVkaW8nKSkpO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRbLi4uc3dpcGUucXVlcnlTZWxlY3RvckFsbCgnLmF1ZGlvLXBsYXllcicpXS5mb3JFYWNoKCBwbGF5ZXIgPT4ge1xyXG5cclxuXHRcdFx0XHRwbGF5ZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBhdWRpb1RlbXBsYXRlKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgYXVkaW8gPSBwbGF5ZXIucXVlcnlTZWxlY3RvcignYXVkaW8nKSxcclxuXHRcdFx0XHRcdCAgYnRuID0gcGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5hdWRpby1wbGF5ZXJfX2J0bicpLFxyXG5cdFx0XHRcdFx0ICBidWZmZXJlZCA9IHBsYXllci5xdWVyeVNlbGVjdG9yKCcuYXVkaW8tcGxheWVyX19idWZmZXJlZCcpLFxyXG5cdFx0XHRcdFx0ICBwcm9ncmVzcyA9IHBsYXllci5xdWVyeVNlbGVjdG9yKCcuYXVkaW8tcGxheWVyX19wcm9ncmVzcycpO1xyXG5cclxuXHJcblx0XHRcdFx0YXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsICgpID0+IHNldER1cmF0aW9uKHBsYXllcixhdWRpbykgKTtcclxuXHRcdFx0XHRhdWRpby5wcmVsb2FkID0gJ21ldGFkYXRhJztcclxuXHJcblx0XHRcdFx0YXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRcdHNldER1cmF0aW9uKHBsYXllcixhdWRpbyk7XHJcblxyXG5cdFx0XHRcdFx0YnRuLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXBhdXNlJywhaXNQbGF5aW5nKGF1ZGlvKSk7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgdG90YWwgPSBhdWRpby5kdXJhdGlvbjtcclxuXHRcdFx0XHRcdGNvbnN0IGN1cnJlbnRUaW1lID0gYXVkaW8uY3VycmVudFRpbWU7XHJcblxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3Muc3R5bGUud2lkdGggPSAoY3VycmVudFRpbWUgLyB0b3RhbCAqIDEwMCkgKyAnJSc7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGF1ZGlvLmJ1ZmZlcmVkLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IGxvYWRlZCA9IGF1ZGlvLmJ1ZmZlcmVkLmVuZChhdWRpby5idWZmZXJlZC5sZW5ndGggLSAxKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghaXNOYU4odG90YWwpKSB7XHJcblx0XHRcdFx0XHRcdFx0YnVmZmVyZWQuc3R5bGUud2lkdGggPSAobG9hZGVkIC8gdG90YWwgKiAxMDApICsgJyUnO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHBsYXllci5xdWVyeVNlbGVjdG9yKCcuYXVkaW8tcGxheWVyX190aW1lLWN1cnJlbnQnKS50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUoY3VycmVudFRpbWUpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0Wy4uLnN3aXBlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2F1ZGlvJyldLmZvckVhY2goIF9hdWRpbyA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIGF1ZGlvID09PSBfYXVkaW8gKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGF1ZGlvLnBhdXNlZCA/IGF1ZGlvLnBsYXkoKSA6IGF1ZGlvLnBhdXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRfYXVkaW8ucGF1c2UoKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IF9wbGF5ZXIgPSBfYXVkaW8uY2xvc2VzdCgnLmF1ZGlvLXBsYXllcicpO1xyXG5cdFx0XHRcdFx0XHRfcGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5hdWRpby1wbGF5ZXJfX2J0bicpLmNsYXNzTGlzdC50b2dnbGUoJ2lzLXBhdXNlJywhaXNQbGF5aW5nKF9hdWRpbykpO1xyXG5cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cGxheWVyLnF1ZXJ5U2VsZWN0b3IoJy5hdWRpby1wbGF5ZXJfX3RpbWUtY3VycmVudCcpLnRleHRDb250ZW50ID0gZm9ybWF0VGltZShhdWRpby5jdXJyZW50VGltZSk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHN3aXBlTmF2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuXHJcblx0XHRcdHRvZ2dsZVN3aXBlID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRuZXcgU3dpcGVyKHN3aXBlLCB7XHJcblx0XHRcdFx0XHRsb29wOiB0cnVlLFxyXG5cdFx0XHRcdFx0aW5pdGlhbFNsaWRlLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0XHRzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG5cdFx0XHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRuZXh0RWw6IHN3aXBlTmV4dCxcclxuXHRcdFx0XHRcdFx0cHJldkVsOiBzd2lwZVByZXZcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRvbjoge1xyXG5cdFx0XHRcdFx0XHRzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRbLi4uc3dpcGUucXVlcnlTZWxlY3RvckFsbCgnYXVkaW8nKV0uZm9yRWFjaCggYXVkaW8gPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2xpZGUgPSBhdWRpby5jbG9zZXN0KCcuc3dpcGVyLXNsaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHNsaWRlLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpID09PSBmYWxzZSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXVkaW8ucGF1c2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2xpZGUucXVlcnlTZWxlY3RvcignLmF1ZGlvLXBsYXllcl9fYnRuJykuY2xhc3NMaXN0LmFkZCgnaXMtcGF1c2UnKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIHN3aXBlLnN3aXBlciApe1xyXG5cdFx0XHRcdFx0XHRcdFx0c3dpcGUuc3dpcGVyLmxvb3BGaXgoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGJhZ1JlY3Vyc2lvbiA9IGNvdW50IC8gMjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGxvb3BGaXg6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIHN3aXBlLnN3aXBlciApe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoIHN3aXBlLnN3aXBlci5wcm9ncmVzcyAhPT0gMC41ICYmIGJhZ1JlY3Vyc2lvbiA+IDAgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJhZ1JlY3Vyc2lvbi0tO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzd2lwZS5zd2lwZXIubG9vcEZpeCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2FuVXNlKSB7XHJcblxyXG5cdFx0XHRsZXQgaW5pdGlhbFNsaWRlID0gMDtcclxuXHJcblx0XHRcdHRvZ2dsZVN3aXBlID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRyZXNldFN3aXBlKCk7XHJcblxyXG5cdFx0XHRcdGlmICggd2luZG93LmlubmVyV2lkdGggPCAxMjAwICkge1xyXG5cclxuXHRcdFx0XHRcdHN3aXBlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXN0eWxlJyk7XHJcblx0XHRcdFx0XHRzd2lwZUJ0bnMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cclxuXHRcdFx0XHRcdG15U3dpcGUgPSBuZXcgU3dpcGVyKHN3aXBlLCB7XHJcblx0XHRcdFx0XHRcdGxvb3A6IHRydWUsXHJcblx0XHRcdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdGluaXRpYWxTbGlkZTogaW5pdGlhbFNsaWRlLFxyXG5cdFx0XHRcdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0bmV4dEVsOiBzd2lwZU5leHQsXHJcblx0XHRcdFx0XHRcdFx0cHJldkVsOiBzd2lwZVByZXZcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0b246IHtcclxuXHRcdFx0XHRcdFx0XHRzbGlkZUNoYW5nZSgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICggbXlTd2lwZSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5pdGlhbFNsaWRlID0gbXlTd2lwZS5yZWFsSW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3dpcGUuYWRkRXZlbnRMaXN0ZW5lcignc3dpcGVyUmVzaXplJywgdG9nZ2xlU3dpcGUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRzd2lwZS5hZGRFdmVudExpc3RlbmVyKCdzd2lwZXJKc0xvYWQnLCB0b2dnbGVTd2lwZSk7XHJcblxyXG5cdH0pO1xyXG5cclxuXHRsZXQgcmVzaXplVGltZW91dCA9IG51bGwsXHJcblx0XHR3aW5kb3dXaWR0aE9MZCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcblxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKHJlc2l6ZVRpbWVvdXQgPT09IG51bGwpIHtcclxuXHJcblx0XHRcdFx0cmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHJcblx0XHRcdFx0XHRyZXNpemVUaW1lb3V0ID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHRpZih3aW5kb3dXaWR0aE9MZCAhPT0gd2luZG93LmlubmVyV2lkdGgpIHtcclxuXHJcblx0XHRcdFx0XHRcdHdpbmRvd1dpZHRoT0xkID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAod2luZG93LlN3aXBlcikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRbLi4uc3dpcGVyQ29udGFpbmVyXS5mb3JFYWNoKCBzd2lwZSA9PiBzd2lwZS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInN3aXBlclJlc2l6ZVwiKSkgKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9KTtcclxuXHJcblx0Y29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG5cdHNjcmlwdC5zcmMgPSAnL2pzL3N3aXBlci1idW5kbGUubWluLmpzJztcclxuXHJcblx0c2NyaXB0Lm9ubG9hZCA9ICgpID0+IFsuLi5zd2lwZXJDb250YWluZXJdLmZvckVhY2goIHN3aXBlID0+IHN3aXBlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwic3dpcGVySnNMb2FkXCIpKSApO1xyXG5cclxuXHRkb2N1bWVudC5oZWFkLmFwcGVuZChzY3JpcHQpO1xyXG5cclxufSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlcicpKTsiXX0=
