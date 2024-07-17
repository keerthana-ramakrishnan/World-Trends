import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Tables from './Pages/Tables';
import Categories from './Pages/Categories';
import Dashboard from './Pages/Dashboard';

function App() {
  const [worldTrends, setWorldTrends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectorcount, setsectorcount] = useState(null);

  const getWorldTrends = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/trends");
      // setWorldTrends(JSON.stringify(response.data, null, 2));
      setWorldTrends(response.data);
      getItems(response.data)
	  console.log(response.data)
    } catch (err) {
      setError(err.message || "Error fetching trends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorldTrends();
  }, []);

  function getItems(input) {
    var arr = input, obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].sector]) {
        obj[arr[i].sector] = 1;
      } else if (obj[arr[i].sector]) {
        obj[arr[i].sector] += 1;
      }
    }
    setsectorcount(obj);
  }

//   const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

// allSideMenu.forEach(item=> {
// 	const li = item.parentElement;

// 	item.addEventListener('click', function () {
// 		allSideMenu.forEach(i=> {
// 			i.parentElement.classList.remove('active');
// 		})
// 		li.classList.add('active');
// 	})
// });




// // TOGGLE SIDEBAR
// const menuBar = document.querySelector('#content nav .bx.bx-menu');
// const sidebar = document.getElementById('sidebar');

// menuBar.addEventListener('click', function () {
// 	sidebar.classList.toggle('hide');
// })







// const searchButton = document.querySelector('#content nav form .form-input button');
// const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
// const searchForm = document.querySelector('#content nav form');

// searchButton.addEventListener('click', function (e) {
// 	if(window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		if(searchForm.classList.contains('show')) {
// 			searchButtonIcon.classList.replace('bx-search', 'bx-x');
// 		} else {
// 			searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		}
// 	}
// })





// if(window.innerWidth < 768) {
// 	sidebar.classList.add('hide');
// } else if(window.innerWidth > 576) {
// 	searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 	searchForm.classList.remove('show');
// }


// window.addEventListener('resize', function () {
// 	if(this.innerWidth > 576) {
// 		searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		searchForm.classList.remove('show');
// 	}
// })



// const switchMode = document.getElementById('switch-mode');

// switchMode.addEventListener('change', function () {
// 	if(this.checked) {
// 		document.body.classList.add('dark');
// 	} else {
// 		document.body.classList.remove('dark');
// 	}
// })

  return (
    <div className="App">
      {/* {sectorcount && Object.keys(sectorcount).map((key)=>{
        return (<p>{key}: {sectorcount[key]}</p>)
      })} */}
      <section id="sidebar">
		<a href="#" class="brand">
			<i class='bx bxs-smile'></i>
			<span class="text">Dashboard</span>
		</a>
		<ul class="side-menu top">
			<li class="active">
				<Link to={"/"}>
					<i class='bx bxs-dashboard' ></i>
					<span class="text">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to={"/table"}>
					<i class='bx bxs-shopping-bag-alt' ></i>
					<span class="text">Table</span>
				</Link>
			</li>
			<li>
				<Link to={"/categories"}>
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">Categories</span>
				</Link>
			</li>
			{/* <li>
				<a href="#">
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Message</span>
				</a>
			</li>
			<li>
				<a href="#">
					<i class='bx bxs-group' ></i>
					<span class="text">Team</span>
				</a>
			</li> */}
		</ul>
		{/* <ul class="side-menu">
			<li>
				<a href="#">
					<i class='bx bxs-cog' ></i>
					<span class="text">Settings</span>
				</a>
			</li>
			<li>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul> */}
	</section>



	<section id="content">
		<Routes>
			<Route path='/' element={<Dashboard worldTrends={worldTrends} sectorcount={sectorcount}></Dashboard>}></Route>
			<Route path='/table' element={<Tables worldTrends={worldTrends}></Tables>}></Route>
			<Route path='/categories' element={<Categories sectorcount={sectorcount}></Categories>}></Route>
		</Routes>
	</section>
    </div>
  );
}

export default App;
