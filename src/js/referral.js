( referral => {

	window.addEventListener('scroll', () => {

		referral.querySelectorAll('img').forEach(img => img.loading = 'eager');

	}, { once: true });

})(document.querySelector('.referral'));