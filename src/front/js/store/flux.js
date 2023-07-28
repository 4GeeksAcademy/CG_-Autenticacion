const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			
			users: [],
			token: ""













		},
		actions: {
			// Use getActions to call a function within a fuction


			signUp: (email, password) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Cookie", "codespaces_correlation_id=8f5c2410b14a6d7a38469781360ede39");

				let raw = JSON.stringify({
				"email": email,
				"password": password
				});

				let requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};
				
				fetch(process.env.BACKEND_URL+"api/signup", requestOptions)
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(error => console.log('error', error));


			},


			bestLogin: async (email, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "Application/json",
						Authorization: `Bearer ${store.token}`
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}
				const resp = await fetch(process.env.BACKEND_URL+"/api/login", opts)
				const data = await resp.json()
				localStorage.setItem("token", data.token)
				setStore({"token": data.token})
				console.log(data)

			},

			logOut: async () => {
				setStore({token: ""})
				localStorage.removeItem("token")

			},




		

			private: async () => {
				const store = getStore()
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "Application/json",
						Authorization: `Bearer ${store.token}`
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				}
				const resp = await fetch(process.env.BACKEND_URL+"/api/private", options)
				const data = await resp.json()
				console.log(data)

			},




			getUsers: () => {
				fetch(process.env.BACKEND_URL + "api/users", { method: "GET" })
				  .then((response) => response.json())
				  .then((response) => {
					console.log(response);
					setStore({ users: response }); 
				  })
				  .catch((error) => console.log("error", error));
			  },
			  












			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;