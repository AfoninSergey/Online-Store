export const setNoScroll = (trigger) => {
	trigger
		? document.body.classList.add('noScroll')
		: document.body.classList.remove('noScroll');
};
