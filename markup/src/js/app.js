import ready, { HTML } from './utils';

ready(() => {
	HTML.classList.add('is-loaded');
});

const datepicker = require('js-datepicker')

const startDatePicker = datepicker('#start-date', {
	formatter: (input, date, instance) => {
		input.value = date.toLocaleDateString('ru-RU');
		filterPosts();
	}
});

const endDatePicker = datepicker('#end-date', {
	formatter: (input, date, instance) => {
		input.value = date.toLocaleDateString('ru-RU');
		filterPosts();
	}
});

const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');
const loadMoreButton = document.getElementById('loadmore');
const postsContainer = document.getElementById('posts');
const clearButtons = document.querySelectorAll('.clear-button');
let currentPage = 0;
const noPostsMessage = document.getElementById('no-posts-message');

const posts = [
	{
		image: "./images//img/post-img1.jpg",
		date: "1-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 1,
		oldLikes: 12,
		iconComments: "./images/icon-comments.svg",
		newComments: 11,
		oldComments: 22,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img2.jpg",
		date: "2-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 3,
		oldLikes: 14,
		iconComments: "./images/icon-comments.svg",
		newComments: 13,
		oldComments: 24,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img3.jpg",
		date: "3-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 5,
		oldLikes: 16,
		iconComments: "./images/icon-comments.svg",
		newComments: 15,
		oldComments: 26,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img4.jpg",
		date: "4-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 7,
		oldLikes: 18,
		iconComments: "./images/icon-comments.svg",
		newComments: 17,
		oldComments: 28,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img5.jpg",
		date: "5-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 9,
		oldLikes: 110,
		iconComments: "./images/icon-comments.svg",
		newComments: 19,
		oldComments: 210,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img6.jpg",
		date: "6-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 10,
		oldLikes: 120,
		iconComments: "./images/icon-comments.svg",
		newComments: 20,
		oldComments: 220,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img7.jpg",
		date: "7-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 11,
		oldLikes: 130,
		iconComments: "./images/icon-comments.svg",
		newComments: 30,
		oldComments: 230,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img1.jpg",
		date: "8-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 12,
		oldLikes: 140,
		iconComments: "./images/icon-comments.svg",
		newComments: 40,
		oldComments: 250,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img2.jpg",
		date: "9-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 13,
		oldLikes: 150,
		iconComments: "./images/icon-comments.svg",
		newComments: 50,
		oldComments: 240,
		uploadDate: "11-04-2016"
	},
	{
		image: "./images//img/post-img3.jpg",
		date: "9-06-2024",
		iconLike: "./images/icon-like.svg",
		newLikes: 13,
		oldLikes: 150,
		iconComments: "./images/icon-comments.svg",
		newComments: 50,
		oldComments: 240,
		uploadDate: "11-04-2016"
	},

];


function getPostsPerPage() {
	return postsContainer.classList.contains('list-view') ? 9 : 8;
}

function loadPosts(filteredPosts, append = false) {
	if (!append) {
		postsContainer.innerHTML = '';
	}

	const postsPerPage = getPostsPerPage();
	const startIndex = currentPage * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const postsToLoad = filteredPosts.slice(startIndex, endIndex);

	if (postsToLoad.length === 0) {
		noPostsMessage.classList.add('active');
		loadMoreButton.style.display = 'none';
		return;
	} else {
		noPostsMessage.classList.remove('active');
	}

	postsToLoad.forEach(post => {
		const postElement = document.createElement('div');
		postElement.className = 'post-item';
		postElement.innerHTML = `
						<img src="${post.image}" alt="Post Image">
						<div class="post-body">
								<div class="block">
										<p>Today</p> 
										<div class="block-icons">
												<p class="icon-like"><img src="${post.iconLike}" alt="Post Icon"><span>${post.newLikes}</span></p> 
												<p class="icon-comments"><img src="${post.iconComments}" alt="Post Icon"><span>${post.newComments}</span></p> 
										</div>
								</div>
								<div class="block">
										<p>${post.date}</p> 
										<div class="block-icons">
												<p class="icon-like"><img src="${post.iconLike}" alt="Post Icon"><span>${post.oldLikes}</span></p> 
												<p class="icon-comments"><img src="${post.iconComments}" alt="Post Icon"><span>${post.oldComments}</span></p> 
										</div>
								</div>
								<div class="post-body_upload">
										<p>Image upload:</p> <span>${post.uploadDate}</span>
								</div>
						</div>
				`;
		postsContainer.appendChild(postElement);
	});

	if (endIndex >= filteredPosts.length) {
		loadMoreButton.style.display = 'none';
	} else {
		loadMoreButton.style.display = 'inline-block';
	}
}

function filterPosts() {
	const startDateValue = document.getElementById('start-date').value;
	const endDateValue = document.getElementById('end-date').value;

	const startDate = startDateValue ? new Date(startDateValue.split('.').reverse().join('-')) : null;
	const endDate = endDateValue ? new Date(endDateValue.split('.').reverse().join('-')) : null;

	const filteredPosts = posts.filter(post => {
		const postDate = new Date(post.date.split('-').reverse().join('-'));
		return (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
	});

	currentPage = 0;
	loadPosts(filteredPosts);
}

gridViewButton.addEventListener('click', function () {
	gridViewButton.classList.add('active');
	listViewButton.classList.remove('active');
	postsContainer.classList.add('grid-view');
	postsContainer.classList.remove('list-view');
	filterPosts(); // Обновить отображаемые посты
});

listViewButton.addEventListener('click', function () {
	gridViewButton.classList.remove('active');
	listViewButton.classList.add('active');
	postsContainer.classList.add('list-view');
	postsContainer.classList.remove('grid-view');
	filterPosts(); // Обновить отображаемые посты
});

loadMoreButton.addEventListener('click', function () {
	currentPage++;
	const startDateValue = document.getElementById('start-date').value;
	const endDateValue = document.getElementById('end-date').value;

	const startDate = startDateValue ? new Date(startDateValue.split('.').reverse().join('-')) : null;
	const endDate = endDateValue ? new Date(endDateValue.split('.').reverse().join('-')) : null;

	const filteredPosts = posts.filter(post => {
		const postDate = new Date(post.date.split('-').reverse().join('-'));
		return (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
	});

	loadPosts(filteredPosts, true);
});

clearButtons.forEach(button => {
	button.addEventListener('click', function () {
		document.getElementById('start-date').value = '';
		document.getElementById('end-date').value = '';
		filterPosts();
	});
});

loadPosts(posts);